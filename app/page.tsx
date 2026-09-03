import { Suspense } from 'react';
import HomeClient from '../components/HomeClient';
import { getGames, getTags } from '../lib/sheetData';

export default async function Home() {
  const [games, tags] = await Promise.all([getGames(), getTags()]);

  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-400">불러오는 중...</div>}>
      <HomeClient games={games} tags={tags} />
    </Suspense>
  );
}