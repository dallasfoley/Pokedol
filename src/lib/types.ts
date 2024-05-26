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

export type UserDataType = {
  blurryStreak: number;
  classicStreak: number;
  zoomedStreak: number;
  blurryMax: number;
  classicMax: number;
  zoomedMax: number;
  blurryDate: string;
  classicDate: string;
  zoomedDate: string;
  userID: string;
  classicTotalGuesses: number;
  classicTotalWins: number;
  blurryTotalGuesses: number;
  blurryTotalWins: number;
  zoomedTotalGuesses: number;
  zoomedTotalWins: number;
};
