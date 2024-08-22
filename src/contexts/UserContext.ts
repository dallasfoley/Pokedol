import { createContext } from "react";
import { UserType } from "../lib/types";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayLocale = yesterday.toLocaleDateString();

export interface UserContextType {
  user: UserType;
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}

export const UserContext = createContext<UserContextType>({
  user: {
    email: "",
    password: "",
    darkTheme: true,
    blurryStreak: 0,
    classicStreak: 0,
    zoomedStreak: 0,
    blurryMax: 0,
    classicMax: 0,
    zoomedMax: 0,
    blurryDate: yesterdayLocale,
    classicDate: yesterdayLocale,
    zoomedDate: yesterdayLocale,
    classicGuesses: 0,
    classicWins: 0,
    blurryGuesses: 0,
    blurryWins: 0,
    zoomedGuesses: 0,
    zoomedWins: 0,
  },
  setUser: () => {},
});
