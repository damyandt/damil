import { CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import { useLanguageContext } from "../../../context/LanguageContext";
import ClassCard from "./ClassCard";
// import { Class } from "./API/classes";
import CalendarView from "./CalenderView";
import { useEffect, useState } from "react";
import TableComponent from "../../../components/MaterialUI/Table/Table";
import callApi from "../../../API/callApi";
import { useAuthedContext } from "../../../context/AuthContext";
import { Response, Row } from "../../../Global/Types/commonTypes";
import { getClasses } from "./API/getQueries";
import RightMenu from "../../../components/MaterialUI/Table/RightMenu";
import { useOutletContext } from "react-router-dom";
import { AppRouterProps } from "../../../Layout/layoutVariables";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const ClassesContainer = () => {
  const { t } = useLanguageContext();
  const [tab, setTab] = useState<"Card View" | "Calender View" | "Table View">(
    "Card View"
  );
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [classesTable, setClassestable] = useState<any>();
  const { setExtraRightNavMenu } = useOutletContext<AppRouterProps>();
  const { setAuthedUser, authedUser } = useAuthedContext();
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await callApi<Response<any>>({
          query: getClasses(),
          auth: { setAuthedUser },
        });
        setRows(response.data.rows);
        setClassestable(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    (authedUser.roles?.includes("Admin") ||
      authedUser.roles?.includes("Staff")) &&
      setExtraRightNavMenu(
        <RightMenu
          title={t("Classes")}
          setRows={setRows}
          columns={classesTable?.columns ?? []}
          configurations={classesTable?.config}
          addNew={true}
          createUrl="trainings"
        />
      );

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [classesTable]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "-webkit-fill-available",
          alignItems: "center",
          minHeight: `calc(100dvh - 140px)`,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: `calc(100dvh - 140px)` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab value={"Card View"} label={t("Card View")} />
          <Tab value={"Calender View"} label={t("Calender View")} />
          <Tab value={"Table View"} label={t("Table View")} />
        </Tabs>
      </Box>

      {/* Class cards */}
      {tab === "Card View" && (
        <Grid container spacing={2}>
          {rows.length === 0 ? (
            <Grid size={12}>
              <Box
                textAlign="center"
                mt={10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                color="text.secondary"
              >
                <CalendarMonthOutlinedIcon
                  sx={{ fontSize: 60, opacity: 0.5 }}
                />
                <Typography variant="h6">
                  {t("No classes available")}
                </Typography>
                <Typography variant="body2">
                  {t("Classes will appear here once added.")}
                </Typography>
              </Box>
            </Grid>
          ) : (
            rows.map((cls: Row, index: number) => {
              const originalIndex = rows.indexOf(cls);
              return (
                <ClassCard
                  key={index}
                  isJoined={cls.joined}
                  cls={cls}
                  setJoinedClasses={false}
                  originalIndex={originalIndex}
                />
              );
            })
          )}
        </Grid>
      )}
      {tab === "Calender View" && <CalendarView classes={rows || []} />}
      {tab === "Table View" && (
        <TableComponent
          configurations={classesTable?.config || {}}
          columns={classesTable?.columns || []}
          rows={rows || []}
          // setRefreshTable={setRefreshTable}
          title={t("Subscription Plans")}
        />
      )}
    </Box>
  );
};

export default ClassesContainer;
