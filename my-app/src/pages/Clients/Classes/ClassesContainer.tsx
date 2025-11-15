import { Tab, Tabs, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

// import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import ClassCard from "./ClassCard";
import { Class } from "./API/classes";
import CalendarView from "./CalenderView";
import { useEffect, useState } from "react";
import TableComponent from "../../../components/MaterialUI/Table/Table";
import callApi from "../../../API/callApi";
import { useAuthedContext } from "../../../context/AuthContext";
import { Response } from "../../../Global/Types/commonTypes";
import { getClasses } from "./API/getQueries";
import RightMenu from "../../../components/MaterialUI/Table/RightMenu";
import { useOutletContext } from "react-router-dom";
import { AppRouterProps } from "../../../Layout/layoutVariables";
// import { dataForTable } from "./mockData";

interface ClassesProps {
  // classes: Class[];
}

const ClassesContainer: React.FC<ClassesProps> = () => {
  const { t } = useLanguageContext();
  const [tab, setTab] = useState<"Card View" | "Calender View" | "Table View">(
    "Card View"
  );
  const [refreshtable, setRefreshTable] = useState<any>();
  const [classesTable, setClassestable] = useState<any>();
  const { setExtraRightNavMenu } = useOutletContext<AppRouterProps>();
  const { setAuthedUser } = useAuthedContext();
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await callApi<Response<any>>({
          query: getClasses(),
          auth: { setAuthedUser },
        });

        setClassestable(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, [refreshtable]);

  useEffect(() => {
    // if (smMediaQuery) {
    //   setExtraRightNavMenu(null);
    // } else {
    setExtraRightNavMenu(
      <RightMenu
        title={t("Classes")}
        setRefreshTable={setRefreshTable}
        columns={classesTable?.columns ?? []}
        configurations={classesTable?.config}
        addNew={true}
        createUrl="trainings"
      />
    );
    // }

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [classesTable]);

  return (
    <Box>
      {/* Tabs */}
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
          {classesTable?.rows?.length === 0 ? (
            <Grid size={12}>
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
              >
                {t("No upcoming classes.")}
              </Typography>
            </Grid>
          ) : (
            classesTable?.rows.map((cls: Class, index: number) => {
              const originalIndex = classesTable?.rows.indexOf(cls);
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
      {tab === "Calender View" && (
        <CalendarView classes={classesTable?.rows || []} />
      )}
      {tab === "Table View" && (
        <TableComponent
          configurations={classesTable?.config || {}}
          columns={classesTable?.columns || []}
          rows={classesTable?.rows || []}
          // setRefreshTable={setRefreshTable}
          title={t("Subscription Plans")}
        />
      )}
    </Box>
  );
};

export default ClassesContainer;
