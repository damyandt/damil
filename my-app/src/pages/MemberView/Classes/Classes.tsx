import { Tab, Tabs, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import ClassCard from "./ClassCard";

const Classes = () => {
  const { t } = useLanguageContext();
  const [tab, setTab] = useState(0);
  const [joinedClasses, setJoinedClasses] = useState<number[]>([4, 5, 6]);

  const classes = [
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
    {
      title: "Cardio Class",
      date: "Sat, Apr 11 at 8:00 PM",
      duration: "60 min",
      trainer: "Velko Botev",
      trainerInfo: {
        name: "Velko Botev",
        avatar: "/trainers/velko.jpg",
        specialty: "High-Intensity Cardio",
      },
      location: "Home Location",
      address: "Gym Studio 2, Home Location",
      spots: 10,
      capacity: 20,
      level: "Intermediate",
      rating: 4.7,
      reviews: [
        { user: "Maria", comment: "Sweat and fun!", rating: 5 },
        {
          user: "Nikolay",
          comment: "Great session with clear instructions.",
          rating: 4.5,
        },
      ],
    },
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
    {
      title: "Cardio Class",
      date: "Sat, Apr 11 at 8:00 PM",
      duration: "60 min",
      trainer: "Velko Botev",
      trainerInfo: {
        name: "Velko Botev",
        avatar: "/trainers/velko.jpg",
        specialty: "High-Intensity Cardio",
      },
      location: "Home Location",
      address: "Gym Studio 2, Home Location",
      spots: 10,
      capacity: 20,
      level: "Intermediate",
      rating: 4.7,
      reviews: [
        { user: "Maria", comment: "Sweat and fun!", rating: 5 },
        {
          user: "Nikolay",
          comment: "Great session with clear instructions.",
          rating: 4.5,
        },
      ],
    },
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
    {
      title: "Cardio Class",
      date: "Sat, Apr 11 at 8:00 PM",
      duration: "60 min",
      trainer: "Velko Botev",
      trainerInfo: {
        name: "Velko Botev",
        avatar: "/trainers/velko.jpg",
        specialty: "High-Intensity Cardio",
      },
      location: "Home Location",
      address: "Gym Studio 2, Home Location",
      spots: 10,
      capacity: 20,
      level: "Intermediate",
      rating: 4.7,
      reviews: [
        { user: "Maria", comment: "Sweat and fun!", rating: 5 },
        {
          user: "Nikolay",
          comment: "Great session with clear instructions.",
          rating: 4.5,
        },
      ],
    },
  ];

  const displayedClasses =
    tab === 0
      ? classes.filter((_, i) => !joinedClasses.includes(i)) // Upcoming
      : classes.filter((_, i) => joinedClasses.includes(i)); // Booked

  return (
    <Box sx={{ p: 2 }}>
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
          <Tab label={t("Upcoming")} />
          <Tab label={t("Booked")} />
        </Tabs>
      </Box>

      {/* Class cards */}
      <Grid container spacing={2}>
        {displayedClasses.length === 0 ? (
          <Grid size={12}>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              {tab === 0
                ? t("No upcoming classes.")
                : t("You haven't joined any classes yet.")}
            </Typography>
          </Grid>
        ) : (
          displayedClasses.map((cls, index) => {
            const originalIndex = classes.indexOf(cls);
            const isJoined = joinedClasses.includes(originalIndex);

            return (
              <ClassCard
                key={index}
                isJoined={isJoined}
                cls={cls}
                setJoinedClasses={setJoinedClasses}
                originalIndex={originalIndex}
              />
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default Classes;
