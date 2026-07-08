import GameCard from './GameCard';
import { Game, Tag } from '../lib/types';

export default function CardGrid({ games, tags }: { games: Game[]; tags: Tag[] }) {
  if (games.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-12">조건에 맞는 게임이 없어요</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} tags={tags} index={index} />
      ))}
    </div>
  );
}