import { Timestamp } from "firebase/firestore";
export interface Comment {
  id?: string;
  author: string;
  content: string;
  date: Timestamp;
  password: string;
}