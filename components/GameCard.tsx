import { Game, Tag } from '../lib/types';
import Link from 'next/link';

export default function GameCard({ game, tags }: { game: Game; tags: Tag[] }) {
  const tagNames = game.tagIds
    .map((id) => tags.find((t) => t.id === id)?.name)
    .filter(Boolean);

  const players =
    game.minPlayers === game.maxPlayers
      ? `${game.minPlayers}인`
      : `${game.minPlayers}~${game.maxPlayers}인`;

  const playtime =
    game.playtimeMin === game.playtimeMax
      ? `${game.playtimeMin}분`
      : `${game.playtimeMin}~${game.playtimeMax}분`;

  return (
    <Link
      href={`/games/${game.id}`}
      className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 hover:border-gray-400 transition-colors"
    >
      <div className="w-[88px] h-[110px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline gap-2">
          <p className="font-medium text-[15px]">{game.title}</p>
          <span className="text-xs text-gray-400 whitespace-nowrap">{game.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tagNames.map((name) => (
            <span key={name} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-gray-500">
          <span>{players}</span>
          <span>{playtime}</span>
          <span>난이도 {game.weight}</span>
        </div>

        <p className="text-[13px] text-gray-500 line-clamp-2">{game.description}</p>

        {game.expansionIds.length > 0 && (
  <span className="text-xs text-gray-400">확장판 있음</span>
)}
      </div>
    </Link>
  );
}