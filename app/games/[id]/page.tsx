import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Clock, Gauge } from 'lucide-react';
import games from '../../../data/games.json';
import tags from '../../../data/tags.json';

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) return notFound();

  const baseGame = games.find((g) => g.expansionIds.includes(game.id));

  const tagNames = game.tagIds
    .map((tagId) => tags.find((t) => t.id === tagId)?.name)
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
    <div className="max-w-lg md:max-w-3xl mx-auto p-4">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 mb-1">
        <ArrowLeft size={14} />
        목록으로
      </Link>

      {baseGame && (
        <Link
          href={`/games/${baseGame.id}`}
          className="block text-sm text-gray-500 mb-3 hover:text-gray-800"
        >
          본판: {baseGame.title} →
        </Link>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden md:flex">
        <div className="h-52 md:h-auto md:w-72 md:shrink-0 bg-gray-100 flex items-center justify-center">
          <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-5 flex-1">
          <div className="flex justify-between items-baseline">
            <div>
              <h1 className="text-xl font-semibold">{game.title}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{game.titleEn}</p>
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
              <MapPin size={13} />
              {game.location}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {tagNames.map((name) => (
              <span key={name} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {name}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-lg py-2.5 text-xs text-gray-600">
              <Users size={17} className="text-gray-400" />
              {players}
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-lg py-2.5 text-xs text-gray-600">
              <Clock size={17} className="text-gray-400" />
              {playtime}
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 bg-gray-50 rounded-lg py-2.5 text-xs text-gray-600">
              <Gauge size={17} className="text-gray-400" />
              난이도 {game.weight}
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mt-4">{game.description}</p>
        </div>
      </div>

      {game.expansionIds.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">확장판 목록</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {game.expansionIds.map((expId) => {
              const expansion = games.find((g) => g.id === expId);
              if (!expansion) return null;
              return (
                <Link key={expId} href={`/games/${expansion.id}`} className="flex flex-col gap-1.5">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={expansion.imageUrl}
                      alt={expansion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 text-center">{expansion.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}