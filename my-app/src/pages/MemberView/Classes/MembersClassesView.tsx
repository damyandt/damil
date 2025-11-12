import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useLanguageContext } from "../../../context/LanguageContext";
// import { Class } from "../../Clients/Classes/API/classes";
import ClassesContainer from "../../Clients/Classes/ClassesContainer";

const MembersClassesView = () => {
  const { t } = useLanguageContext();
  // const classes: Class[] = [
  //   {
  //     title: "Taekwondo",
  //     date: "Sat, Oct 29 at 8:00 PM",
  //     duration: "60 min",
  //     trainer: "Donika Boteva",
  //     location: "Sevlievo Taekwondo Club",
  //     spots: 10,
  //     capacity: 20,
  //     joined: false,
  //   },
  //   {
  //     title: "Kickbox",
  //     date: "Sat, Apr 11 at 9:00 PM",
  //     duration: "60 min",
  //     trainer: "Iliyan Todorov",
  //     location: "Vokil Varna",
  //     spots: 5,
  //     capacity: 15,
  //     joined: false,
  //   },
  //   {
  //     title: "Muay thai",
  //     date: "Sat, Apr 11 at 9:00 PM",
  //     duration: "60 min",
  //     trainer: "Damyan Todorov",
  //     location: "Muay Thai Anton Petrov, Sofia",
  //     spots: 5,
  //     capacity: 10,
  //     joined: false,
  //   },
  // ];
  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        mb={0}
      >
        <Typography variant="h4" fontWeight={600}>
          {t("Trainings Center")}
        </Typography>
      </Box>
      <ClassesContainer />
    </Box>
  );
};

export default MembersClassesView;
