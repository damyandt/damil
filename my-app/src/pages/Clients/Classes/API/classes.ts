export interface Class {
  title: string;
  date: string;
  duration: string;
  trainer: string;
  trainerInfo: {
    name: string;
    avatar: string;
    specialty: string;
  };
  location: string;
  address: string;
  spots: number;
  capacity: number;
  level: string;
  rating: number;
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
}
