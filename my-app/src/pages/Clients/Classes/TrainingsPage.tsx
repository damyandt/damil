import { Box } from "@mui/system";
// import { IconButton, Typography } from "@mui/material";
// import { useLanguageContext } from "../../../context/LanguageContext";
// import Add from "@mui/icons-material/Add";
import ClassesContainer from "./ClassesContainer";
import { Class } from "./API/classes";

const TrainingsPage = () => {
  // const { t } = useLanguageContext();
  const classes: Class[] = [
    {
      title: "Taekwondo",
      date: "2025-10-29T19:30:00.000000",
      duration: "60",
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
      date: "2025-10-29T13:30:00.000000",
      duration: "60",
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
      date: "2025-10-29T09:47:00.000000",
      duration: "60",
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
    // {
    //   title: "Cardio Class",
    //   date: "Sat, Apr 11 at 8:00 PM",
    //   duration: "60 min",
    //   trainer: "Velko Botev",
    //   trainerInfo: {
    //     name: "Velko Botev",
    //     avatar: "/trainers/velko.jpg",
    //     specialty: "High-Intensity Cardio",
    //   },
    //   location: "Home Location",
    //   address: "Gym Studio 2, Home Location",
    //   spots: 10,
    //   capacity: 20,
    //   level: "Intermediate",
    //   rating: 4.7,
    //   reviews: [
    //     { user: "Maria", comment: "Sweat and fun!", rating: 5 },
    //     {
    //       user: "Nikolay",
    //       comment: "Great session with clear instructions.",
    //       rating: 4.5,
    //     },
    //   ],
    // },
    // {
    //   title: "Taekwondo",
    //   date: "Sat, Oct 29 at 8:00 PM",
    //   duration: "60 min",
    //   trainer: "Donika Boteva",
    //   trainerInfo: {
    //     name: "Donika Boteva",
    //     avatar: "/trainers/donika.png",
    //     specialty: "Martial Arts & Self-Defense",
    //   },
    //   location: "Sevlievo Taekwondo Club",
    //   address: "123 Martial Arts St, Sevlievo, Bulgaria",
    //   spots: 10,
    //   capacity: 20,
    //   level: "Intermediate",
    //   rating: 4.8,
    //   reviews: [
    //     {
    //       user: "Anna",
    //       comment: "Great energy and clear instructions!",
    //       rating: 5,
    //     },
    //     { user: "Georgi", comment: "Challenging but rewarding.", rating: 4.5 },
    //   ],
    // },
    // {
    //   title: "Kickbox",
    //   date: "Sat, Apr 11 at 9:00 PM",
    //   duration: "60 min",
    //   trainer: "Iliyan Todorov",
    //   trainerInfo: {
    //     name: "Iliyan Todorov",
    //     avatar: "/trainers/iliyan.png",
    //     specialty: "Kickboxing & Cardio Training",
    //   },
    //   location: "Vokil Varna",
    //   address: "Vokil Varna",
    //   spots: 5,
    //   capacity: 15,
    //   level: "Advanced",
    //   rating: 4.6,
    //   reviews: [
    //     { user: "Petya", comment: "Intense and fun!", rating: 5 },
    //     { user: "Ivan", comment: "Mihail is an amazing coach!", rating: 4.5 },
    //   ],
    // },
    // {
    //   title: "Muay thai",
    //   date: "Sat, Apr 11 at 9:00 PM",
    //   duration: "60 min",
    //   trainer: "Damyan Todorov",
    //   trainerInfo: {
    //     name: "Damyan Todorov",
    //     avatar: "/trainers/damyan.png",
    //     specialty: "Fighting & Problems",
    //   },
    //   location: "Muay Thai Anton Petrov, Sofia",
    //   address: "Muay Thai Anton Petrov NDK, Sofia",
    //   spots: 5,
    //   capacity: 10,
    //   level: "Advanced",
    //   rating: 4.9,
    //   reviews: [
    //     {
    //       user: "Elena",
    //       comment: "Very relaxing and well-structured.",
    //       rating: 5,
    //     },
    //     {
    //       user: "Stoyan",
    //       comment: "Perfect for unwinding after work.",
    //       rating: 4.8,
    //     },
    //   ],
    // },
    // {
    //   title: "Cardio Class",
    //   date: "Sat, Apr 11 at 8:00 PM",
    //   duration: "60 min",
    //   trainer: "Velko Botev",
    //   trainerInfo: {
    //     name: "Velko Botev",
    //     avatar: "/trainers/velko.jpg",
    //     specialty: "High-Intensity Cardio",
    //   },
    //   location: "Home Location",
    //   address: "Gym Studio 2, Home Location",
    //   spots: 10,
    //   capacity: 20,
    //   level: "Intermediate",
    //   rating: 4.7,
    //   reviews: [
    //     { user: "Maria", comment: "Sweat and fun!", rating: 5 },
    //     {
    //       user: "Nikolay",
    //       comment: "Great session with clear instructions.",
    //       rating: 4.5,
    //     },
    //   ],
    // },
    // {
    //   title: "Taekwondo",
    //   date: "Sat, Oct 29 at 8:00 PM",
    //   duration: "60 min",
    //   trainer: "Donika Boteva",
    //   trainerInfo: {
    //     name: "Donika Boteva",
    //     avatar: "/trainers/donika.png",
    //     specialty: "Martial Arts & Self-Defense",
    //   },
    //   location: "Sevlievo Taekwondo Club",
    //   address: "123 Martial Arts St, Sevlievo, Bulgaria",
    //   spots: 10,
    //   capacity: 20,
    //   level: "Intermediate",
    //   rating: 4.8,
    //   reviews: [
    //     {
    //       user: "Anna",
    //       comment: "Great energy and clear instructions!",
    //       rating: 5,
    //     },
    //     { user: "Georgi", comment: "Challenging but rewarding.", rating: 4.5 },
    //   ],
    // },
    // {
    //   title: "Kickbox",
    //   date: "Sat, Apr 11 at 9:00 PM",
    //   duration: "60 min",
    //   trainer: "Iliyan Todorov",
    //   trainerInfo: {
    //     name: "Iliyan Todorov",
    //     avatar: "/trainers/iliyan.png",
    //     specialty: "Kickboxing & Cardio Training",
    //   },
    //   location: "Vokil Varna",
    //   address: "Vokil Varna",
    //   spots: 5,
    //   capacity: 15,
    //   level: "Advanced",
    //   rating: 4.6,
    //   reviews: [
    //     { user: "Petya", comment: "Intense and fun!", rating: 5 },
    //     { user: "Ivan", comment: "Mihail is an amazing coach!", rating: 4.5 },
    //   ],
    // },
    // {
    //   title: "Muay thai",
    //   date: "Sat, Apr 11 at 9:00 PM",
    //   duration: "60 min",
    //   trainer: "Damyan Todorov",
    //   trainerInfo: {
    //     name: "Damyan Todorov",
    //     avatar: "/trainers/damyan.png",
    //     specialty: "Fighting & Problems",
    //   },
    //   location: "Muay Thai Anton Petrov, Sofia",
    //   address: "Muay Thai Anton Petrov NDK, Sofia",
    //   spots: 5,
    //   capacity: 10,
    //   level: "Advanced",
    //   rating: 4.9,
    //   reviews: [
    //     {
    //       user: "Elena",
    //       comment: "Very relaxing and well-structured.",
    //       rating: 5,
    //     },
    //     {
    //       user: "Stoyan",
    //       comment: "Perfect for unwinding after work.",
    //       rating: 4.8,
    //     },
    //   ],
    // },
    // {
    //   title: "Cardio Class",
    //   date: "Sat, Apr 11 at 8:00 PM",
    //   duration: "60 min",
    //   trainer: "Velko Botev",
    //   trainerInfo: {
    //     name: "Velko Botev",
    //     avatar: "/trainers/velko.jpg",
    //     specialty: "High-Intensity Cardio",
    //   },
    //   location: "Home Location",
    //   address: "Gym Studio 2, Home Location",
    //   spots: 10,
    //   capacity: 20,
    //   level: "Intermediate",
    //   rating: 4.7,
    //   reviews: [
    //     { user: "Maria", comment: "Sweat and fun!", rating: 5 },
    //     {
    //       user: "Nikolay",
    //       comment: "Great session with clear instructions.",
    //       rating: 4.5,
    //     },
    //   ],
    // },
  ];
  return (
    <Box
      sx={{
        p: 1,
        minHeight: `calc(100dvh - 140px)`,
      }}
    >
      <ClassesContainer classes={classes} />
    </Box>
  );
};

export default TrainingsPage;
