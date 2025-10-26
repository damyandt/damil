import { Grid } from "@mui/system";
import TextField from "../../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Dispatch, SetStateAction, useState } from "react";
import DatePickerComponent from "../../../components/MaterialUI/FormFields/DatePicker";
import { FormControlLabel, MenuItem } from "@mui/material";
import Checkbox from "../../../components/MaterialUI/FormFields/Checkbox";
import Collapse from "../../../components/MaterialUI/Collapse";
import Button from "../../../components/MaterialUI/Button";
import { Role } from "../../usersPages/api/userTypes";
import { Response } from "../../../Global/Types/commonTypes";
import callApi from "../../../API/callApi";
import { editNewsItem, postNewsItem } from "./API/postQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import { NewsItem } from "./API/news";

interface NewsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: NewsItem;
}

const roles: { label: string; value: Role }[] = [
  { label: "Member", value: "Member" },
  { label: "Staff", value: "Staff" },
];

// export interface NewsItem {
//   id?: number | null;
//   title: string;
//   content: string;
//   importance: "Low" | "Medium" | "High";
//   expiresOn: any;
//   publicationType?: "ALL" | "TARGETED";
//   targetRoles?: Roles[] | [];
//   targetSpecific?: boolean;
//   recipientsIds?: number[];
// }

const NewsForm = ({ setOpen, data }: NewsFormProps) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [formData, setFormData] = useState<NewsItem>(
    data ?? {
      title: "",
      content: "",
      importance: "LOW",
      expiresOn: null,
      publicationType: "ALL",
      targetRoles: [],
      targetSpecific: false,
      recipientsIds: [0],
    }
  );

  const handleSave = async () => {
    if (!formData.title.trim()) return;

    await callApi<Response<any>>({
      query: data ? editNewsItem(formData) : postNewsItem(formData),
      auth: { setAuthedUser },
    });
  };

  // useEffect(() => {}, []);
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label={t("Title")}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid size={12}>
        <TextField
          multiline
          label={t("Content")}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          fullWidth
        />
      </Grid>

      <Grid size={12}>
        <TextField
          select
          label={t("Importance")}
          value={formData.importance}
          onChange={(e) =>
            setFormData({
              ...formData,
              importance: e.target.value as "LOW" | "MEDIUM" | "HIGH",
            })
          }
          fullWidth
        >
          <MenuItem value="LOW">{t("Low")}</MenuItem>
          <MenuItem value="MEDIUM">{t("Medium")}</MenuItem>
          <MenuItem value="HIGH">{t("High")}</MenuItem>
        </TextField>
      </Grid>

      <Grid size={12}>
        <DatePickerComponent
          label={t("Expires On")}
          value={formData.expiresOn}
          onChange={(date) => setFormData({ ...formData, expiresOn: date })}
        />
      </Grid>

      {/* ✅ New: Send to All Checkbox */}
      <Grid size={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.publicationType === "ALL"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publicationType: e.target.checked ? "ALL" : "TARGETED",
                  targetRoles: [],
                  recipientsIds: [],
                })
              }
            />
          }
          label={t("Send to all")}
        />
      </Grid>

      <Grid size={12}>
        <Collapse in={formData.publicationType === "TARGETED"} timeout={300}>
          <TextField
            select
            label={t("Target Roles")}
            value={formData.targetRoles || []}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => {
                const selectedRoles = selected as Role[];
                const labels = selectedRoles
                  .map(
                    (role: Role) =>
                      roles.find((r) => r.value === role)?.label || role
                  )
                  .map((label) => t(label))
                  .join(", ");
                return labels;
              },
            }}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetRoles: e.target.value as unknown as Role[],
              })
            }
            fullWidth
          >
            {roles.map((item: { label: string; value: Role }) => (
              <MenuItem key={item.value} value={item.value}>
                {t(item.label)}
              </MenuItem>
            ))}
          </TextField>
        </Collapse>
      </Grid>

      <Grid size={12}>
        <Collapse in={formData.publicationType === "TARGETED"} timeout={300}>
          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Checkbox
                checked={formData.targetSpecific}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetSpecific: e.target.checked,
                  })
                }
              />
            }
            label={t("Target specific person(s)")}
          />
        </Collapse>
      </Grid>

      <Grid size={12}>
        <Collapse in={formData.targetSpecific} timeout={300}>
          <TextField
            select
            label={t("Select Person(s)")}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => {
                const selectedRoles = selected as Role[];
                const labels = selectedRoles
                  .map(
                    (role: Role) =>
                      roles.find((r) => r.value === role)?.label || role
                  )
                  .map((label) => t(label))
                  .join(", ");
                return labels;
              },
            }}
            value={formData.recipientsIds}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                recipientsIds:
                  typeof value === "string"
                    ? value.split(",").map(Number)
                    : (value as (string | number)[]).map(Number),
              });
            }}
            fullWidth
          >
            <MenuItem value={3}>John Doe</MenuItem>
            <MenuItem value={2}>Jane Smith</MenuItem>
            <MenuItem value={1}>Alex Kim</MenuItem>
          </TextField>
        </Collapse>
      </Grid>

      <Grid size={6}>
        <Button onClick={() => setOpen(false)} color="error" fullWidth>
          {t("Cancel")}
        </Button>
      </Grid>
      <Grid size={6}>
        <Button onClick={handleSave} fullWidth>
          {t("Save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewsForm;
