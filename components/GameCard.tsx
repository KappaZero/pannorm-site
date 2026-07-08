import { Game, Tag } from '../lib/types';
import Link from 'next/link';
import { ImageOff } from 'lucide-react';

export default function GameCard({
  game,
  tags,
  index,
}: {
  game: Game;
  tags: Tag[];
  index: number;
}) {
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

  const isLastColumn = (index + 1) % 3 === 0;

  return (
    <div className="relative group">
      <Link
        href={`/games/${game.id}`}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex gap-3 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
      >
        <div className="w-[88px] h-[110px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
          ) : (
            <ImageOff size={22} className="text-gray-300 dark:text-gray-600" />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex justify-between items-baseline gap-2">
            <p className="font-medium text-[15px]">{game.title}</p>
            <span className="text-xs text-gray-400 whitespace-nowrap">{game.location}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tagNames.map((name) => (
              <span key={name} className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                {name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-gray-500 dark:text-gray-400">
            <span>{players}</span>
            <span>{playtime}</span>
            <span>난이도 {game.weight}</span>
          </div>

          <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2">{game.description}</p>

          {game.expansionIds.length > 0 && (
            <span className="text-xs text-gray-400">확장판 있음</span>
          )}
        </div>
      </Link>

      {/* 호버 미리보기 패널 */}
      <div
        className={`hidden lg:block absolute top-0 w-72 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none ${
          isLastColumn ? 'right-full mr-3' : 'left-full ml-3'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-lg flex flex-col gap-2">
          <div className="flex justify-between items-baseline gap-2">
            <p className="font-medium text-[15px]">{game.title}</p>
            <span className="text-xs text-gray-400 whitespace-nowrap">{game.location}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tagNames.map((name) => (
              <span key={name} className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                {name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-gray-500 dark:text-gray-400">
            <span>{players}</span>
            <span>{playtime}</span>
            <span>난이도 {game.weight}</span>
          </div>

          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{game.description}</p>

          {game.expansionIds.length > 0 && (
            <span className="text-xs text-gray-400">확장판 {game.expansionIds.length}개</span>
          )}
        </div>
      </div>
    </div>
  );
}