import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuthedContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import callApi, { Query } from "../../API/callApi";
import Alert from "../MaterialUI/Alert";
import TextField from "../MaterialUI/FormFields/TextField";
import Button from "../MaterialUI/Button";
import DatePickerComponent from "../MaterialUI/FormFields/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers";

import {
  Column,
  Configuration,
  Response,
  Row,
} from "../../Global/Types/commonTypes";
import { useSnackbarContext } from "../../context/SnackbarContext";

interface CreateFormProps {
  columns?: Column[];
  actionUrl?: string;
  setRefreshTable?: Dispatch<SetStateAction<boolean>>;
  setModalTitle?: Dispatch<SetStateAction<string | null>>;
  setAnchorEl?: Dispatch<
    SetStateAction<null | HTMLElement | "closeOnlyAnchor">
  >;
  setActiveStep?: Dispatch<SetStateAction<number>>;
  selectedRow?: Row;
  disabled?: boolean;
  configurations?: Configuration;
  removeButtons?: boolean;
  setFinalRows: any;
}

const CreateForm: React.FC<CreateFormProps> = ({
  columns,
  actionUrl = "",
  setRefreshTable,
  setFinalRows,
  setModalTitle,
  selectedRow,
  disabled,
  setAnchorEl,
  configurations,
  removeButtons = false,
  setActiveStep,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { _, ...rest } = (selectedRow ?? {}) as {
    id?: string | number;
    [key: string]: any;
  };
  const { addMessage } = useSnackbarContext();
  const [formValues, setFormValues] = useState<Record<string, any>>(rest);
  const [loading, setLoading] = useState<boolean>(false);
  const excludedKeys = ["id", "actions", "createdAt", "updatedAt"];
  const [options, setOptions] = useState<any>([]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { setAuthedUser } = useAuthedContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguageContext();
  const createFieldsColumns =
    columns?.filter(
      (col: Column) => (configurations?.createFields ?? {})[col.field]
    ) || [];

  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!columns) return;

      const optionsMap: Record<string, any[]> = {};

      for (const col of columns) {
        const isDropdown = col.dropDownConfig?.url;
        const isEnum = col.enumConfig?.url;

        if (isDropdown || isEnum) {
          const rawUrl = col.dropDownConfig?.url || col.enumConfig?.url;
          const url = rawUrl?.startsWith("/v1/") ? rawUrl.slice(4) : rawUrl;

          try {
            const response = await callApi<Response<any>>({
              query: getQueryOptions(url ?? ""),
              auth: { setAuthedUser },
            });
            optionsMap[col.field] = response.data;
          } catch (error) {
            addMessage(`${t("Error fetching options for")} ${t(col.field)}`);
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
      setRefreshTable?.((prev: boolean) => !prev);
      setFormValues({});
      setModalTitle?.(null);
    }
  };
  const handleUpdateRow = (updatedRow: any) => {
    setFinalRows((prev: Row[]) =>
      prev.map((row: Row) =>
        row.id === updatedRow.id ? { ...row, ...updatedRow } : row
      )
    );
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
      let payload = { ...formValues };
      if (selectedRow) {
        const originalValues = { ...rest };
        type OriginalKeys = keyof typeof originalValues;

        payload = Object.entries(formValues).reduce((acc, [key, value]) => {
          const typedKey = key as OriginalKeys;
          if (value !== originalValues[typedKey]) {
            acc[typedKey] = value;
          }
          return acc;
        }, {} as Partial<typeof originalValues>);
      }

      const query: Query = {
        endpoint: actionUrl,
        method: selectedRow ? "PATCH" : "POST",
        variables: { ...payload },
      };

      const response = await callApi<Response<any>>({
        query,
        auth: { setAuthedUser },
      });

      setStatus("success");
      handleUpdateRow?.(response.data);

      setActiveStep
        ? setActiveStep((prev: number) => prev + 1)
        : setTimeout(() => {
            handleClose();
            addMessage("User updated successfully", "success");
          }, 1000);
    } catch (error) {
      console.error("Error creating item:", error);
      setStatus("error");
      addMessage(error.message, "error");
      setErrors(error.validationErrors || {});
    } finally {
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
            .map((col: any, index: number) => {
              const value = formValues[col.field] || "";
              return (
                <Grid key={col.field} size={{ xs: 12, md: 6 }}>
                  {(() => {
                    const handleKeyDown = () => {
                      if (index < createFieldsColumns.length - 1) {
                        inputRefs.current[index + 1]?.focus();
                      } else {
                        handleSave();
                      }
                    };
                    switch (col.type) {
                      case "text":
                      case "string":
                      case "email":
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={t(col.header)}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                            inputRef={(el: HTMLInputElement) => {
                              inputRefs.current[index] = el;
                            }}
                            onEnterFunc={() => {
                              handleKeyDown();
                            }}
                          />
                        );

                      case "number":
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={t(col.header)}
                            type="number"
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                            inputRef={(el: HTMLInputElement) => {
                              inputRefs.current[index] = el;
                            }}
                            onEnterFunc={() => {
                              handleKeyDown();
                            }}
                          />
                        );

                      case "enum":
                      case "dropdown": {
                        const fieldOptions = options[col.field];
                        console.log(options);
                        console.log(col.field);
                        const isLoading =
                          !fieldOptions || fieldOptions.length === 0;
                        const hasValue =
                          value !== null && value !== undefined && value !== "";

                        const menuItems =
                          isLoading && hasValue
                            ? [
                                <MenuItem
                                  key="loading"
                                  value="loading"
                                  disabled
                                  sx={{
                                    display: "flex",
                                    alignItems: "center", // vertical centering
                                    justifyContent: "center", // horizontal centering
                                    gap: 1, // space between spinner and text
                                  }}
                                >
                                  <CircularProgress size={16} />{" "}
                                  {t("Loading...")}
                                </MenuItem>,
                              ]
                            : fieldOptions?.map(
                                (option: {
                                  title: string;
                                  value: string | number;
                                }) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {t(option.title)}
                                  </MenuItem>
                                )
                              );

                        return (
                          <TextField
                            fullWidth
                            select
                            sx={{ width: "100%" }}
                            label={t(col.header)}
                            value={
                              isLoading && hasValue ? "loading" : value ?? ""
                            }
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                            inputRef={(el: HTMLInputElement) => {
                              inputRefs.current[index] = el;
                            }}
                            onEnterFunc={() => {
                              handleKeyDown();
                            }}
                          >
                            {menuItems}
                          </TextField>
                        );
                      }

                      case "date":
                        return (
                          <DatePickerComponent
                            label={t(col.header)}
                            value={value}
                            onChange={(newValue: any) =>
                              handleChange(col.field, newValue)
                            }
                          />
                        );
                      case "datetime":
                        return (
                          <DateTimePicker
                            label={t(col.header)}
                            value={value}
                            onChange={(newValue: any) =>
                              handleChange(col.field, newValue)
                            }
                            slots={{ textField: TextField }}
                            slotProps={{
                              textField: { size: "small", fullWidth: true },
                            }}
                          />
                        );

                      default:
                        return (
                          <TextField
                            fullWidth
                            sx={{ width: "100%" }}
                            label={t(col.header)}
                            value={value}
                            onChange={(e: any) =>
                              handleChange(col.field, e.target.value)
                            }
                            error={!!errors[col.field]}
                            helperText={errors[col.field] || ""}
                            disabled={disabled || false}
                            inputRef={(el: HTMLInputElement) => {
                              inputRefs.current[index] = el;
                            }}
                            onEnterFunc={() => {
                              handleKeyDown();
                            }}
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
          {!removeButtons && (
            <>
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
                <Button onClick={handleSave}>{t("Submit")}</Button>
              </Grid>
            </>
          )}

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
