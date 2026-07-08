import HomeClient from '../components/HomeClient';
import { getGames, getTags } from '../lib/sheetData';

export default async function Home() {
  const [games, tags] = await Promise.all([getGames(), getTags()]);
  return <HomeClient games={games} tags={tags} />;
}