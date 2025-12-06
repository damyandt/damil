import { Grid } from "@mui/system";
import TextField from "../../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DatePickerComponent from "../../../components/MaterialUI/FormFields/DatePicker";
import { FormControlLabel, MenuItem } from "@mui/material";
import Checkbox from "../../../components/MaterialUI/FormFields/Checkbox";
import Collapse from "../../../components/MaterialUI/Collapse";
import Button from "../../../components/MaterialUI/Button";
import { Role } from "../../usersPages/api/userTypes";
import { Enum, Response } from "../../../Global/Types/commonTypes";
import callApi from "../../../API/callApi";
import { editNewsItem, postNewsItem } from "./API/postQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import { NewsItem } from "./API/news";
import dayjs from "dayjs";
import { getMembersEnums, getStaffEnums } from "./API/getQueries";

interface NewsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: NewsItem;
  triggerRefetch?: () => void;
}

const roles: Enum[] = [
  { title: "Member", value: "Member" },
  { title: "Staff", value: "Staff" },
];

const NewsForm = ({ setOpen, data, triggerRefetch }: NewsFormProps) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [members, setMembers] = useState<Enum[]>();
  const [staffs, setStaffs] = useState<Enum[]>();
  const [formData, setFormData] = useState<NewsItem>(
    data ?? {
      title: "",
      content: "",
      importance: "LOW",
      expiresOn: null,
      publicationType: "ALL",
      targetRoles: ["Member", "Staff"],
      targetSpecific: false,
      recipientsIds: [],
    }
  );
  const firstRender = useRef<boolean>(true);
  const handleSave = async () => {
    if (!formData.title.trim()) return;

    await callApi<Response<any>>({
      query: data ? editNewsItem(formData) : postNewsItem(formData),
      auth: { setAuthedUser },
    });
    triggerRefetch?.();
    setOpen(false);
  };

  const handleFetchMembers = async () => {
    try {
      const membersRes = await callApi<Response<any>>({
        query: getMembersEnums(),
        auth: { setAuthedUser },
      });
      setMembers(membersRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchStaff = async () => {
    try {
      const staffRes = await callApi<Response<any>>({
        query: getStaffEnums(),
        auth: { setAuthedUser },
      });
      setStaffs(staffRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPeople = async () => {
      const { targetRoles } = formData;

      if (!members) await handleFetchMembers();
      if (!staffs) await handleFetchStaff();

      if (firstRender.current) {
        // Skip resetting recipientsIds on first render
        firstRender.current = false;
        return;
      }

      if (targetRoles.length === 0) {
        setFormData((prev) => ({ ...prev, recipientsIds: [] }));
        return;
      }

      if (targetRoles.length <= 1) {
        setFormData((prev) => ({
          ...prev,
          recipientsIds: [],
        }));
        return;
      }
    };

    fetchPeople();
  }, [formData.targetRoles]);

  const availableUsers: Enum[] = (
    (formData.targetRoles as Role[] | undefined)?.includes("Member")
      ? members ?? []
      : []
  ).concat(
    (formData.targetRoles as Role[] | undefined)?.includes("Staff")
      ? staffs ?? []
      : []
  );

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
          minDate={dayjs()}
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
                      roles.find((r) => r.value === role)?.title || role
                  )
                  .map((title) => t(title))
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
            {roles.map((item: Enum) => (
              <MenuItem key={item.value} value={item.value}>
                {t(item.title)}
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
            value={formData.recipientsIds || []}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => {
                const selectedRoles = selected as number[];
                const labels = selectedRoles
                  .map(
                    (person: number) =>
                      availableUsers.find((r) => r.value == person)?.title ||
                      person
                  )
                  .join(", ");
                return labels;
              },
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                recipientsIds: e.target.value as unknown as number[],
              });
            }}
            fullWidth
          >
            {availableUsers.length === 0 ? (
              <MenuItem key={"No Users"} value={"no"} disabled>
                {t("No Users")}
              </MenuItem>
            ) : (
              availableUsers.map((person) => (
                <MenuItem key={person.value} value={person.value}>
                  {person.title}
                </MenuItem>
              ))
            )}
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
