import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Class } from "../../Clients/Classes/API/classes";
import ClassesContainer from "../../Clients/Classes/ClassesContainer";

const MembersClassesView = () => {
  const { t } = useLanguageContext();
  const classes: Class[] = [
    {
      title: "Taekwondo",
      date: "Sat, Oct 29 at 8:00 PM",
      duration: "60 min",
      trainer: "Donika Boteva",
      trainerInfo: {
        name: "Donika Boteva",
        avatar: "/trainers/donika.png",
        specialty: "Martial Arts & Self-Defense",
      },
      location: "Sevlievo Taekwondo Club",
      address: "123 Martial Arts St, Sevlievo, Bulgaria",
      spots: 10,
      capacity: 20,
      level: "Intermediate",
      rating: 4.8,
      reviews: [
        {
          user: "Anna",
          comment: "Great energy and clear instructions!",
          rating: 5,
        },
        { user: "Georgi", comment: "Challenging but rewarding.", rating: 4.5 },
      ],
    },
    {
      title: "Kickbox",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      trainer: "Iliyan Todorov",
      trainerInfo: {
        name: "Iliyan Todorov",
        avatar: "/trainers/iliyan.png",
        specialty: "Kickboxing & Cardio Training",
      },
      location: "Vokil Varna",
      address: "Vokil Varna",
      spots: 5,
      capacity: 15,
      level: "Advanced",
      rating: 4.6,
      reviews: [
        { user: "Petya", comment: "Intense and fun!", rating: 5 },
        { user: "Ivan", comment: "Mihail is an amazing coach!", rating: 4.5 },
      ],
    },
    {
      title: "Muay thai",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      trainer: "Damyan Todorov",
      trainerInfo: {
        name: "Damyan Todorov",
        avatar: "/trainers/damyan.png",
        specialty: "Fighting & Problems",
      },
      location: "Muay Thai Anton Petrov, Sofia",
      address: "Muay Thai Anton Petrov NDK, Sofia",
      spots: 5,
      capacity: 10,
      level: "Advanced",
      rating: 4.9,
      reviews: [
        {
          user: "Elena",
          comment: "Very relaxing and well-structured.",
          rating: 5,
        },
        {
          user: "Stoyan",
          comment: "Perfect for unwinding after work.",
          rating: 4.8,
        },
      ],
    },
  ];
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
      <ClassesContainer classes={classes} />
    </Box>
  );
};

export default MembersClassesView;
