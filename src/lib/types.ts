export type PokemonApi = {
  name: string;
  type1: string;
  type2: string;
  habitat: string;
  color: string;
  evolutionStage: string;
  height: string;
  weight: string;
  isCorrect: boolean[];
  picUrl: string;
};

export type UserType = {
  id?: number;
  email: string;
  password: string;
  darkTheme: boolean;
  blurryStreak: number;
  classicStreak: number;
  zoomedStreak: number;
  blurryMax: number;
  classicMax: number;
  zoomedMax: number;
  blurryDate: string;
  classicDate: string;
  zoomedDate: string;
  classicGuesses: number;
  classicWins: number;
  blurryGuesses: number;
  blurryWins: number;
  zoomedGuesses: number;
  zoomedWins: number;
};
