import { useEffect, useState } from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { useAuthedContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import callApi, { Query } from "../../API/callApi";
import Alert from "../MaterialUI/Alert";
import TextField from "../MaterialUI/FormFields/TextField";
import Button from "../MaterialUI/Button";
import DatePickerComponent from "../MaterialUI/FormFields/DatePicker";

interface CreateFormProps {
  columns?: any;
  actionUrl: string;
  setRefreshTable: any;
  setModalTitle?: any;
  selectedRow?: any;
  disabled?: boolean;
  setAnchorEl?: any;
  configurations?: any;
}

const CreateForm: React.FC<CreateFormProps> = ({
  columns,
  actionUrl,
  setRefreshTable,
  setModalTitle,
  selectedRow,
  disabled,
  setAnchorEl,
  configurations,
}) => {
  const { id, ...rest } = selectedRow ?? {};
  const [formValues, setFormValues] = useState<Record<string, any>>(rest);

  const [loading, setLoading] = useState<boolean>(false);
  const excludedKeys = ["id", "actions", "createdAt", "updatedAt"];
  const [options, setOptions] = useState<any>([]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { setAuthedUser } = useAuthedContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguageContext();

  const createFieldsColumns =
    columns.filter((col: any) => configurations.createFields[col.field]) || [];

  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!columns) return;

      const optionsMap: Record<string, any[]> = {};

      for (const col of columns) {
        const isDropdown = col.dropDownConfig?.url;
        const isEnum = col.enumConfig?.url;

        if (isDropdown || isEnum) {
          const rawUrl = col.dropDownConfig?.url || col.enumConfig?.url;
          const url = rawUrl.startsWith("/v1/") ? rawUrl.slice(4) : rawUrl;

          try {
            const options = await callApi<any>({
              query: getQueryOptions(url),
              auth: { setAuthedUser },
            });
            options.success && (optionsMap[col.field] = options.data);
            !options.success &&
              console.error("Error fetching options for: ", col.field);
          } catch (error) {
            console.error("Error fetching options for", col.field, error);
          }
        }
      }

      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, [columns, setAuthedUser]);

  const handleClose = (): void => {
    if (!loading) {
      setRefreshTable?.((prev: any) => !prev);
      setFormValues({});
      setModalTitle(null);
    }
  };

  const getQueryOptions = (url: string): Query => ({
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
    try {
      const query: Query = {
        endpoint: actionUrl,
        method: selectedRow ? "PUT" : "POST",
        variables: { ...formValues },
      };

      const responce = await callApi<any>({
        query,
        auth: { setAuthedUser },
      });

      responce.success ? setStatus("success") : setStatus("error");

      responce.validationErrors !== null &&
        setErrors(responce.validationErrors);
      console.log(responce.validationErrors);

      setLoading(false);
      responce.success &&
        setTimeout(() => {
          handleClose();
        }, 1000);
    } catch (error) {
      console.error("Error creating item:", error);
      setStatus("error");
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="div" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {createFieldsColumns
            .filter(
              (col: any) => !excludedKeys.includes(col.header?.toLowerCase())
            )
            .map((col: any) => {
              const value = formValues[col.field] || "";
              return (
                <Grid key={col.field} size={6}>
                  {(() => {
                    switch (col.type) {
                      case "text":
                      case "string":
                      case "email":
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                          />
                        );

                      case "number":
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={col.header}
                            type="number"
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                          />
                        );

                      case "enum":
                        return (
                          <TextField
                            fullWidth
                            select
                            sx={{ width: "100%" }}
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                          >
                            {options[col.field]?.map(
                              (option: { title: string; value: string }) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.title}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        );
                      case "dropdown":
                        return (
                          <TextField
                            fullWidth
                            select
                            sx={{ width: "100%" }}
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                          >
                            {options[col.field]?.map(
                              (option: { title: string; value: string }) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.title}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        );

                      case "date":
                        return (
                          <DatePickerComponent
                            sx={{ width: "100%", margin: 0 }}
                            label={col.header}
                            value={value}
                            onChange={(newValue: any) =>
                              handleChange(col.field, newValue)
                            }
                          />
                        );

                      default:
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={col.header}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                          />
                        );
                    }
                  })()}
                </Grid>
              );
            })}
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Grid>
            <Button
              color="error"
              onClick={() => {
                handleClose();
                setAnchorEl && setAnchorEl(null);
              }}
            >
              {disabled ? t("Close") : t("Cancel")}
            </Button>
          </Grid>
          <Grid sx={disabled ? { display: "none" } : {}}>
            <Button onClick={handleSave}>Submit</Button>
          </Grid>
          {status === "success" && (
            <Grid size={12}>
              <Alert
                message={
                  selectedRow
                    ? t("Item successfully edited!")
                    : t("Item successfully created!")
                }
                showAlert={true}
                severity="success"
                autoClose
              />
            </Grid>
          )}

          {status === "error" && (
            <Grid size={12}>
              <Alert
                message={
                  selectedRow
                    ? t("Error editing item!")
                    : t("Error creating item!")
                }
                showAlert={true}
                severity="error"
                autoClose
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default CreateForm;
