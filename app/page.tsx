'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import CardGrid from '../components/CardGrid';
import TagFilterList from '../components/TagFilterList';
import { filterGames } from '../lib/filterGames';
import games from '../data/games.json';
import tags from '../data/tags.json';

export default function Home() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [players, setPlayers] = useState(0);
  const [playtimeMax, setPlaytimeMax] = useState(0);
  const [playtimeMode, setPlaytimeMode] = useState<'min' | 'max'>('min');
  const [expansionFilter, setExpansionFilter] = useState<'all' | 'base' | 'expansion'>('all');

  function toggleTag(id: string) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen">
      {/* 상단바 */}
      <header className="flex items-center gap-3 p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold shrink-0">판놀음</h1>

        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="게임 이름으로 검색"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm shrink-0"
        >
          필터
        </button>
      </header>

      {/* 카드 그리드 영역 */}
      <main className="p-4">
        <CardGrid
          games={filterGames(games, searchQuery, selectedTagIds, players, playtimeMax, playtimeMode, expansionFilter)}
          tags={tags}
        />
      </main>

      {/* 배경 어둡게 */}
      {filterOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setFilterOpen(false)}
        />
      )}

      {/* 슬라이드 필터 패널 */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white border-l border-gray-200 p-4 z-50 transition-transform duration-300 overflow-y-auto ${
          filterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-sm text-gray-500">필터</h2>
          <button onClick={() => setFilterOpen(false)} className="text-gray-400">
            ✕
          </button>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm text-gray-600 mb-1.5">
            <span>인원수</span>
            <span className="font-medium text-gray-900">
              {players === 0 ? '전체' : players >= 9 ? '9명 이상' : `${players}명`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={9}
            value={players}
            onChange={(e) => setPlayers(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm text-gray-600 mb-1.5">
            <span>플레이타임</span>
            <span className="font-medium text-gray-900">
              {playtimeMax === 0 ? '전체' : playtimeMax > 180 ? '180분 이상' : `${playtimeMax}분 이내`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={195}
            step={15}
            value={playtimeMax}
            onChange={(e) => setPlaytimeMax(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex gap-1.5 mt-2">
            <button
              onClick={() => setPlaytimeMode('min')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                playtimeMode === 'min'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-500'
              }`}
            >
              최소 기준
            </button>
            <button
              onClick={() => setPlaytimeMode('max')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                playtimeMode === 'max'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-500'
              }`}
            >
              최대 기준
            </button>
          </div>
        </div>

        <div className="mb-2">
  <span className="text-sm text-gray-600">태그</span>
</div>
<TagFilterList tags={tags} selectedTagIds={selectedTagIds} onToggle={toggleTag} />

<div className="mt-5">
  <div className="mb-2">
    <span className="text-sm text-gray-600">확장</span>
  </div>
  <div className="flex gap-1.5">
    {[
      { value: 'all', label: '전체' },
      { value: 'base', label: '본편만' },
      { value: 'expansion', label: '확장만' },
    ].map((opt) => (
      <button
        key={opt.value}
        onClick={() => setExpansionFilter(opt.value as 'all' | 'base' | 'expansion')}
        className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
          expansionFilter === opt.value
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'bg-white border-gray-300 text-gray-500'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
</div>
      </aside>
    </div>
  );
}