import { Tab, Tabs, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

// import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import ClassCard from "./ClassCard";
import { Class } from "./API/classes";
import CalendarView from "./CalenderView";
import { useState } from "react";
import TableComponent from "../../../components/MaterialUI/Table/Table";
import { dataForTable } from "./mockData";

interface ClassesProps {
  classes: Class[];
}

const ClassesContainer: React.FC<ClassesProps> = ({ classes }) => {
  const { t } = useLanguageContext();
  const [tab, setTab] = useState<"Card View" | "Calender View" | "Table View">(
    "Card View"
  );
  // const [joinedClasses, setJoinedClasses] = useState<number[]>([4, 5, 6]);

  // const displayedClasses =
  //   tab === 0
  //     ? classes.filter((_, i) => !joinedClasses.includes(i)) // Upcoming
  //     : classes.filter((_, i) => joinedClasses.includes(i)); // Booked

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
          {classes.length === 0 ? (
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
            classes.map((cls, index) => {
              const originalIndex = classes.indexOf(cls);

              return (
                <ClassCard
                  key={index}
                  isJoined={false}
                  cls={cls}
                  setJoinedClasses={false}
                  originalIndex={originalIndex}
                />
              );
            })
          )}
        </Grid>
      )}
      {tab === "Calender View" && <CalendarView classes={classes} />}
      {tab === "Table View" && (
        <TableComponent
          configurations={dataForTable?.config}
          columns={dataForTable?.columns || []}
          rows={classes || []}
          // setRefreshTable={setRefreshTable}
          title={t("Subscription Plans")}
        />
      )}
    </Box>
  );
};

export default ClassesContainer;
