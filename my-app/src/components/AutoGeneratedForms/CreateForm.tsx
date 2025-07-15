import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useAuthedContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import callApi, { Query } from "../../API/callApi";
import Alert from "../MaterialUI/Alert";
import TextField from "../TextField";
import Button from "../MaterialUI/Button";

interface CreateFormProps {
  columns?: any;
  createUrl: string;
  triggerRefetch?: () => void;
  setModalTitle?: any;
}

const CreateForm: React.FC<CreateFormProps> = ({
  columns,
  createUrl,
  triggerRefetch,
  setModalTitle,
}) => {
  //   console.log(columns);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<any>(null);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { setAuthedUser } = useAuthedContext();
  const { t } = useLanguageContext();
  const handleClose = (): void => {
    if (!loading) {
      setFormValues({});
      setModalTitle(null);
    }
  };
  const getQueryOprions = (url: string): Query => ({
    endpoint: `${url}`,
    method: "GET",
  });

  const handleChange = (field: string, value: string): void => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (): Promise<void> => {
    setLoading(true);
    setStatus(null);
    console.log(formValues);
    try {
      const query: Query = {
        endpoint: createUrl,
        method: "POST",
        variables: { ...formValues },
      };

      await callApi({
        query,
        auth: { setAuthedUser },
      });

      setStatus("success");
      setLoading(false);

      setTimeout(() => {
        triggerRefetch?.();
      }, 500);
    } catch (error) {
      console.error("Error creating item:", error);
      setStatus("error");
      setLoading(false);
    }
  };

  const fetchOptions = async (url: string) => {
    const cleanedUrl = url.replace(/^\/v1\//, "");
    console.log(url);
    const options = await callApi<any>({
      query: getQueryOprions(cleanedUrl),
      auth: { setAuthedUser },
    });
    setOptions(options);
  };

  const excludedKeys = [
    "id",
    "actions",
    "createdAt",
    "updatedAt",
    "_valuesCache",
    "_uniqueValuesCache",
  ];

  return (
    <>
      <Box component="div" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {columns
            .filter(
              (col: any) => !excludedKeys.includes(col.header?.toLowerCase())
            )
            .map((col: any) => {
              const value = formValues[col.field] || "";
              return (
                <Grid key={col.id} size={6}>
                  {(() => {
                    switch (col.type) {
                      case "text":
                      case "string":
                      case "email":
                        return (
                          <TextField
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            fullWidth
                          />
                        );

                      case "number":
                        return (
                          <TextField
                            label={col.header}
                            type="number"
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            fullWidth
                          />
                        );

                      case "enum":
                        fetchOptions(col.dropDownConfig.url);
                        return (
                          <TextField
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            select
                            fullWidth
                          >
                            {options?.map((option: any) => (
                              <option key={option.value} value={option.value}>
                                {option.header}
                              </option>
                            ))}
                          </TextField>
                        );

                      case "date":
                        return (
                          <TextField
                            label={col.header}
                            type="date"
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        );

                      default:
                        return (
                          <TextField
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            fullWidth
                          />
                        );
                    }
                  })()}
                </Grid>
              );
            })}
          {status === "success" && (
            <Grid size={12}>
              <Alert
                message={t("Item successfully created")}
                showAlert={true}
                severity="success"
                autoClose
              />
            </Grid>
          )}

          {status === "error" && (
            <Grid size={12}>
              <Alert
                message={t("Error creating item")}
                showAlert={true}
                severity="error"
                autoClose
              />
            </Grid>
          )}
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        >
          <Grid>
            <Button
              color="error"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button onClick={handleSave}>Save Client</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateForm;
