import { Class } from "./API/classes";

export const classes: Class[] = [
  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T08:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    trainerInfo: {
      name: "Donika Boteva",
      avatar: "/trainers/donika.png",
      specialty: "Martial Arts & Self-Defense",
    },
    location: "Sevlievo Taekwondo Club",
    address: "123 Martial Arts St, Sevlievo, Bulgaria",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
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
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T18:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    trainerInfo: {
      name: "Donika Boteva",
      avatar: "/trainers/donika.png",
      specialty: "Martial Arts & Self-Defense",
    },
    location: "Sevlievo Taekwondo Club",
    address: "123 Martial Arts St, Sevlievo, Bulgaria",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
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
  })),

  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T13:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    trainerInfo: {
      name: "Damyan Todorov",
      avatar: "/trainers/damyan.png",
      specialty: "Fighting & Conditioning",
    },
    location: "Muay Thai Anton Petrov, Sofia",
    address: "Muay Thai Anton Petrov NDK, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: [
      {
        user: "Elena",
        comment: "Explosive and powerful session!",
        rating: 5,
      },
      {
        user: "Stoyan",
        comment: "Hard training, great results.",
        rating: 4.8,
      },
    ],
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T13:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    trainerInfo: {
      name: "Donika Boteva",
      avatar: "/trainers/donika.png",
      specialty: "Martial Arts & Self-Defense",
    },
    location: "Sevlievo Taekwondo Club",
    address: "123 Martial Arts St, Sevlievo, Bulgaria",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
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
  })),

  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T18:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    trainerInfo: {
      name: "Damyan Todorov",
      avatar: "/trainers/damyan.png",
      specialty: "Fighting & Conditioning",
    },
    location: "Muay Thai Anton Petrov, Sofia",
    address: "Muay Thai Anton Petrov NDK, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: [
      {
        user: "Elena",
        comment: "Explosive and powerful session!",
        rating: 5,
      },
      {
        user: "Stoyan",
        comment: "Hard training, great results.",
        rating: 4.8,
      },
    ],
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T08:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    trainerInfo: {
      name: "Damyan Todorov",
      avatar: "/trainers/damyan.png",
      specialty: "Fighting & Conditioning",
    },
    location: "Muay Thai Anton Petrov, Sofia",
    address: "Muay Thai Anton Petrov NDK, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: [
      {
        user: "Elena",
        comment: "Explosive and powerful session!",
        rating: 5,
      },
      {
        user: "Stoyan",
        comment: "Hard training, great results.",
        rating: 4.8,
      },
    ],
  })),

  // 🥋 TAEKWONDO — Saturday: 11:00 (90 mins)
  {
    title: "Taekwondo",
    date: "2025-11-01T11:00:00.000000",
    duration: "90",
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
    level: "All Levels",
    rating: 4.9,
    reviews: [
      { user: "Dimitar", comment: "Weekend class was awesome!", rating: 5 },
      { user: "Violeta", comment: "Loved the stretching part.", rating: 4.8 },
    ],
  },

  // 🥊 MUAY THAI — Saturday: 09:00 (90 mins)
  {
    title: "Muay Thai",
    date: "2025-11-01T09:00:00.000000",
    duration: "90",
    trainer: "Damyan Todorov",
    trainerInfo: {
      name: "Damyan Todorov",
      avatar: "/trainers/damyan.png",
      specialty: "Fighting & Conditioning",
    },
    location: "Muay Thai Anton Petrov, Sofia",
    address: "Muay Thai Anton Petrov NDK, Sofia",
    spots: 5,
    capacity: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: [
      { user: "Nikol", comment: "Hardcore weekend sweat!", rating: 5 },
      { user: "Borislav", comment: "Loved the elbow drills.", rating: 4.8 },
    ],
  },

  // 🥋 TAEKWONDO — Sunday: 10:00
  {
    title: "Taekwondo",
    date: "2025-11-02T10:00:00.000000",
    duration: "60",
    trainer: "Donika Boteva",
    trainerInfo: {
      name: "Donika Boteva",
      avatar: "/trainers/donika.png",
      specialty: "Martial Arts & Self-Defense",
    },
    location: "Sevlievo Taekwondo Club",
    address: "123 Martial Arts St, Sevlievo, Bulgaria",
    spots: 11,
    capacity: 20,
    level: "Intermediate",
    rating: 4.8,
    reviews: [
      { user: "Mariya", comment: "Nice weekend flow class!", rating: 5 },
      {
        user: "Simeon",
        comment: "Good focus on kicks and forms.",
        rating: 4.9,
      },
    ],
  },

  // 🥊 MUAY THAI — Sunday: 17:00
  {
    title: "Muay Thai",
    date: "2025-11-02T17:00:00.000000",
    duration: "60",
    trainer: "Damyan Todorov",
    trainerInfo: {
      name: "Damyan Todorov",
      avatar: "/trainers/damyan.png",
      specialty: "Fighting & Conditioning",
    },
    location: "Muay Thai Anton Petrov, Sofia",
    address: "Muay Thai Anton Petrov NDK, Sofia",
    spots: 6,
    capacity: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: [
      { user: "Stefan", comment: "Perfect end to the week!", rating: 5 },
      { user: "Diana", comment: "Loved the clinch drills.", rating: 4.8 },
    ],
  },
];

export const dataForTable: any = {
  config: {
    sortable: {
      field: "date",
      desc: false,
    },
    actions: [
      {
        id: "details",
        name: "Details",
        url: "/classes/{title}",
      },
      {
        id: "edit",
        name: "Edit",
        url: "/classes/{title}/edit",
      },
      {
        id: "delete",
        name: "Delete",
        url: "/classes/{title}/delete",
      },
    ],
    columnsLayoutConfig: {
      columnVisibility: {
        title: true,
        date: true,
        duration: true,
        trainer: true,
        location: true,
        address: false,
        spots: true,
        capacity: true,
        level: true,
        rating: true,
      },
    },
    createFields: {
      title: true,
      date: true,
      duration: true,
      trainer: true,
      location: true,
      address: true,
      spots: true,
      capacity: true,
      level: true,
      rating: false,
    },
    pagination: {
      pageSize: 10,
    },
  },
  columns: [
    {
      field: "title",
      header: "Class Title",
      type: "string",
      dropDownConfig: null,
    },
    {
      field: "date",
      header: "Date",
      type: "datetime",
      dropDownConfig: null,
    },
    {
      field: "duration",
      header: "Duration (min)",
      type: "number",
      dropDownConfig: null,
    },
    {
      field: "trainer",
      header: "Trainer",
      type: "string",
      dropDownConfig: null,
    },
    {
      field: "location",
      header: "Location",
      type: "string",
      dropDownConfig: null,
    },
    {
      field: "address",
      header: "Address",
      type: "string",
      dropDownConfig: null,
    },
    {
      field: "spots",
      header: "Available Spots",
      type: "number",
      dropDownConfig: null,
    },
    {
      field: "capacity",
      header: "Capacity",
      type: "number",
      dropDownConfig: null,
    },
    {
      field: "level",
      header: "Level",
      type: "enum",
      dropDownConfig: {
        url: "/v1/enums/ClassLevel",
        fromAnnotation: false,
      },
    },
    {
      field: "rating",
      header: "Rating",
      type: "number",
      dropDownConfig: null,
    },
  ],
  rows: [
    {
      title: "Muay Thai",
      date: "2025-11-02T17:00:00.000000",
      duration: "60",
      trainer: "Damyan Todorov",
      trainerInfo: {
        name: "Damyan Todorov",
        avatar: "/trainers/damyan.png",
        specialty: "Fighting & Conditioning",
      },
      location: "Muay Thai Anton Petrov, Sofia",
      address: "Muay Thai Anton Petrov NDK, Sofia",
      spots: 6,
      capacity: 10,
      level: "Advanced",
      rating: 4.9,
      reviews: [
        { user: "Stefan", comment: "Perfect end to the week!", rating: 5 },
        { user: "Diana", comment: "Loved the clinch drills.", rating: 4.8 },
      ],
    },
  ],
};
