import { Class } from "./API/classes";

export const classes: Class[] = [
  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T08:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    location: "Sevlievo Taekwondo Club",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
    capacity: 20,
    joined: true,
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T18:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    location: "Sevlievo Taekwondo Club",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
    capacity: 20,
    joined: false,
  })),

  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T13:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    location: "Muay Thai Anton Petrov, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    joined: false,
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Taekwondo",
    date: `${date}T13:30:00.000000`,
    duration: "60",
    trainer: "Donika Boteva",
    location: "Sevlievo Taekwondo Club",
    spots: Math.floor(Math.random() * 10) + 10, // 10–20
    capacity: 20,
    joined: false,
  })),

  ...["2025-10-27", "2025-10-29", "2025-10-31"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T18:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    location: "Muay Thai Anton Petrov, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    joined: false,
  })),
  ...["2025-10-28", "2025-10-30"].map((date) => ({
    title: "Muay Thai",
    date: `${date}T08:30:00.000000`,
    duration: "60",
    trainer: "Damyan Todorov",
    location: "Muay Thai Anton Petrov, Sofia",
    spots: Math.floor(Math.random() * 6) + 4, // 4–10
    capacity: 10,
    joined: false,
  })),

  // 🥋 TAEKWONDO — Saturday: 11:00 (90 mins)
  {
    title: "Taekwondo",
    date: "2025-11-01T11:00:00.000000",
    duration: "90",
    trainer: "Donika Boteva",
    location: "Sevlievo Taekwondo Club",
    spots: 10,
    capacity: 20,
    joined: false,
  },

  // 🥊 MUAY THAI — Saturday: 09:00 (90 mins)
  {
    title: "Muay Thai",
    date: "2025-11-01T09:00:00.000000",
    duration: "90",
    trainer: "Damyan Todorov",
    location: "Muay Thai Anton Petrov, Sofia",
    spots: 5,
    capacity: 10,
    joined: false,
  },

  // 🥋 TAEKWONDO — Sunday: 10:00
  {
    title: "Taekwondo",
    date: "2025-11-02T10:00:00.000000",
    duration: "60",
    trainer: "Donika Boteva",
    location: "Sevlievo Taekwondo Club",
    spots: 11,
    capacity: 20,
    joined: false,
  },

  // 🥊 MUAY THAI — Sunday: 17:00
  {
    title: "Muay Thai",
    date: "2025-11-02T17:00:00.000000",
    duration: "60",
    trainer: "Damyan Todorov",
    location: "Muay Thai Anton Petrov, Sofia",
    spots: 6,
    capacity: 10,
    joined: false,
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
        spots: true,
        capacity: true,
      },
    },
    createFields: {
      title: true,
      date: true,
      duration: true,
      trainer: true,
      location: true,
      spots: true,
      capacity: true,
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
  ],
  rows: [
    {
      title: "Muay Thai",
      date: "2025-11-02T17:00:00.000000",
      duration: "60",
      trainer: "Damyan Todorov",
      location: "Muay Thai Anton Petrov, Sofia",
      spots: 6,
      capacity: 10,
    },
  ],
};
