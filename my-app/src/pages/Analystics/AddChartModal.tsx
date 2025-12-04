// ...existing code...
import React, { useState } from "react";
import callApi from "../../API/callApi";
import { getClientsTable } from "../Access Control/API/getQueries";
// import { getStaffTable } from "../Staff/API/getQueries";
// import { getEarningsTable } from "../Earnings/API/getQueries";
import { MenuItem, Grid, Stepper, Step, StepLabel, Box } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import Button from "../../components/MaterialUI/Button";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useAuthedContext } from "../../context/AuthContext";
import { getStaffMembers } from "../Staff/API/getQueries";
import { useSnackbarContext } from "../../context/SnackbarContext";
import { useLanguageContext } from "../../context/LanguageContext";

export type ChartType = "bar" | "line" | "pie" | "gauge" | "scatter";

export interface AddChartModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (chartConfig: { name: string; type: ChartType; data: any }) => void;
}

const chartTypes: Array<{ label: string; value: ChartType }> = [
  { label: "Bar", value: "bar" },
  { label: "Line", value: "line" },
  { label: "Pie", value: "pie" },
  { label: "Gauge", value: "gauge" },
];

const AddChartModal: React.FC<AddChartModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useLanguageContext();
  const { addMessage } = useSnackbarContext();
  const { setAuthedUser } = useAuthedContext();
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [modalColumns, setModalColumns] = useState<any[]>([]);
  const [modalRows, setModalRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<ChartType>("bar");
  const [paramCol, setParamCol] = useState<string>("");
  const [operation, setOperation] = useState<string>("count");
  const [valueCol, setValueCol] = useState<string>("");

  const moduleQueries: Record<string, any> = {
    clients: getClientsTable,
    staff: getStaffMembers,
  };

  const handleModuleChange = async (mod: string) => {
    setSelectedModule(mod);
    setLoading(true);
    setModalColumns([]);
    setModalRows([]);
    try {
      const queryFn = moduleQueries[mod];
      if (queryFn) {
        const res = await callApi<any>({
          query: queryFn(),
          auth: { setAuthedUser },
        });
        setModalColumns(res?.data?.columns || []);
        setModalRows(res?.data?.rows || []);
      }
    } catch (error) {
      console.error(error);
      // handle error
    }
    setLoading(false);
  };

  const aggregateByGroup = (
    groupCol: string,
    op: string,
    valueCol?: string
  ) => {
    const groups: Record<string, number[]> = {};
    modalRows.forEach((row: any) => {
      const group = row[groupCol];
      const value = valueCol ? Number(row[valueCol]) : 1;
      if (
        group !== undefined &&
        group !== null &&
        (!valueCol || !isNaN(value))
      ) {
        if (!groups[group]) groups[group] = [];
        groups[group].push(value);
      }
    });
    return Object.entries(groups).map(([name, values]) => {
      let result = 0;
      if (op === "count") result = values.length;
      else if (op === "sum") result = values.reduce((a, b) => a + b, 0);
      else if (op === "min") result = Math.min(...values);
      else if (op === "max") result = Math.max(...values);
      return { name, value: result };
    });
  };

  const handleSubmit = () => {
    let chartData: any = {};
    if (paramCol && operation) {
      const agg = aggregateByGroup(
        paramCol,
        operation,
        operation === "count" ? undefined : valueCol
      );
      if (type === "pie") {
        chartData = { data: agg };
      } else if (type === "bar" || type === "line") {
        chartData = {
          x: agg.map((v) => v.name),
          y: agg.map((v) => v.value),
        };
      } else {
        chartData = {};
      }
    }
    addMessage(t("Chart added successfully"), "success");
    onSubmit({ name, type, data: chartData });
    setName("");
    setType("bar");
    setParamCol("");
    setOperation("count");
    setValueCol("");
    onClose();
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Choose Module", "Configure Chart"];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const canProceedModule =
    selectedModule && !loading && modalColumns.length > 0;

  return (
    <CustomModal open={open} onClose={onClose} title="Add New Chart">
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                select
                label="Module"
                fullWidth
                value={selectedModule}
                onChange={async (e) => await handleModuleChange(e.target.value)}
                disabled={loading}
              >
                {Object.keys(moduleQueries).map((mod) => (
                  <MenuItem key={mod} value={mod}>
                    {mod.charAt(0).toUpperCase() + mod.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, justifyContent: "flex-end" }}
          >
            <Grid>
              <Button onClick={onClose}>Cancel</Button>
            </Grid>
            <Grid>
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={!canProceedModule}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      {activeStep === 1 && (
        <Box>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Chart Title"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                label="Chart Type"
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value as ChartType)}
                disabled={loading}
              >
                {chartTypes.map((ct) => (
                  <MenuItem key={ct.value} value={ct.value}>
                    {ct.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                select
                label="Group Parameter"
                fullWidth
                value={paramCol}
                onChange={(e) => setParamCol(e.target.value)}
                disabled={loading || modalColumns.length === 0}
              >
                {modalColumns.map((col) => (
                  <MenuItem key={col.field} value={col.field}>
                    {col.header}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                select
                label="Operation"
                fullWidth
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                disabled={loading}
              >
                <MenuItem value="count">Count</MenuItem>
                <MenuItem value="sum">Sum</MenuItem>
                <MenuItem value="min">Min</MenuItem>
                <MenuItem value="max">Max</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, justifyContent: "flex-end" }}
          >
            <Grid>
              <Button onClick={handleBack}>Back</Button>
            </Grid>
            <Grid>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading || modalColumns.length === 0 || !paramCol}
              >
                Add Chart
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </CustomModal>
  );
};

export default AddChartModal;
