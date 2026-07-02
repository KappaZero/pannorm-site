export type Tag = {
  id: string;
  name: string;
};

export type Game = {
  id: string;
  title: string;
  titleEn: string;
  imageUrl: string;
  location: string;
  minPlayers: number;
  maxPlayers: number;
  playtimeMin: number;
  playtimeMax: number;
  weight: number;
  tagIds: string[];
  expansionIds: string[];
  description: string;
};