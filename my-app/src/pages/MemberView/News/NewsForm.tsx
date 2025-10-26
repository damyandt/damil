import { Grid } from "@mui/system";
import TextField from "../../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Dispatch, SetStateAction, useState } from "react";
import { NewsItem } from "../../Clients/News";
import dayjs from "dayjs";
import DatePickerComponent from "../../../components/MaterialUI/FormFields/DatePicker";
import { FormControlLabel, MenuItem } from "@mui/material";
import Checkbox from "../../../components/MaterialUI/FormFields/Checkbox";
import Collapse from "../../../components/MaterialUI/Collapse";
import Button from "../../../components/MaterialUI/Button";

interface NewsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: NewsItem;
}

const roles: { label: string; value: string }[] = [
  { label: "Member", value: "Member" },
  { label: "Staff", value: "Staff" },
  { label: "Trainer", value: "Trainer" },
];

const NewsForm = ({ setOpen, data }: NewsFormProps) => {
  const { t } = useLanguageContext();
  const [formData, setFormData] = useState<NewsItem>(
    data ?? {
      id: "",
      title: "",
      content: "",
      importance: "Low",
      expiresOn: dayjs().add(7, "day"),
      sendToAll: true,
      targetRole: "",
      targetSpecific: false,
      targetPersons: [],
    }
  );

  const handleSave = () => {
    if (!formData.title.trim()) return;

    // setOpenEdit(false);
  };
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
              importance: e.target.value as "Low" | "Medium" | "High",
            })
          }
          fullWidth
        >
          <MenuItem value="Low">{t("Low")}</MenuItem>
          <MenuItem value="Medium">{t("Medium")}</MenuItem>
          <MenuItem value="High">{t("High")}</MenuItem>
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
              checked={formData.sendToAll}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sendToAll: e.target.checked,
                  targetRole: "",
                  targetPersons: [],
                })
              }
            />
          }
          label={t("Send to all")}
        />
      </Grid>

      {/* ✅ Target Role and Specific Person Fields */}
      <Grid size={12}>
        <Collapse in={!formData.sendToAll} timeout={300}>
          {/* Target Role */}
          <TextField
            select
            label={t("Target Role")}
            value={formData.targetRole}
            onChange={(e) =>
              setFormData({ ...formData, targetRole: e.target.value })
            }
            fullWidth
          >
            {roles.map((item: { label: string; value: string }) => {
              return <MenuItem value={item.value}>{t(item.label)}</MenuItem>;
            })}
          </TextField>

          {/* ✅ Checkbox for targeting specific persons */}
        </Collapse>
      </Grid>

      <Grid size={12}>
        <Collapse in={!formData.sendToAll} timeout={300}>
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
              renderValue: (selected: any) => (selected as string[]).join(", "),
            }}
            value={formData.targetPersons}
            onChange={(e) =>
              setFormData({
                ...formData,
                targetPersons:
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="John Doe">John Doe</MenuItem>
            <MenuItem value="Jane Smith">Jane Smith</MenuItem>
            <MenuItem value="Alex Kim">Alex Kim</MenuItem>
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
