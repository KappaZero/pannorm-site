import Papa from 'papaparse';
import { Game, Tag } from './types';

const GAMES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS09Bp-v7KQUJMLTaIfNz8s6NZH0w0USlGQbg6-WxaTUn2xeYAhm5FQs-VqwNpszZiI5Rh7ZNHJ_pXc/pub?gid=0&single=true&output=csv';
const TAGS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS09Bp-v7KQUJMLTaIfNz8s6NZH0w0USlGQbg6-WxaTUn2xeYAhm5FQs-VqwNpszZiI5Rh7ZNHJ_pXc/pub?gid=676312459&single=true&output=csv';

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(TAGS_CSV_URL, { next: { revalidate: 60 } });
  const csvText = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((row) => ({
    id: row.id,
    name: row.name,
  }));
}

export async function getGames(): Promise<Game[]> {
  const res = await fetch(GAMES_CSV_URL, { next: { revalidate: 60 } });
  const csvText = await res.text();
  const { data } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    titleEn: row.titleEn,
    imageUrl: row.imageUrl,
    location: row.location,
    minPlayers: Number(row.minPlayers),
    maxPlayers: Number(row.maxPlayers),
    playtimeMin: Number(row.playtimeMin),
    playtimeMax: Number(row.playtimeMax),
    weight: Number(row.weight),
    tagIds: row.tagIds ? row.tagIds.split(',').map((s) => s.trim()).filter(Boolean) : [],
    expansionIds: row.expansionIds
      ? row.expansionIds.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    description: row.description,
  }));
}