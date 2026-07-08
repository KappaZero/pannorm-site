'use client';

import { useState } from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import CardGrid from './CardGrid';
import TagFilterList from './TagFilterList';
import ThemeToggle from './ThemeToggle';
import { filterGames, sortGames } from '../lib/filterGames';
import { Game, Tag } from '../lib/types';

export default function HomeClient({ games, tags }: { games: Game[]; tags: Tag[] }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [players, setPlayers] = useState(0);
  const [playtimeMax, setPlaytimeMax] = useState(0);
  const [playtimeMode, setPlaytimeMode] = useState<'min' | 'max'>('min');
  const [expansionFilter, setExpansionFilter] = useState<'all' | 'base' | 'expansion'>('all');
  const [sortBy, setSortBy] = useState('name');

  function toggleTag(id: string) {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function resetAllFilters() {
    setSearchQuery('');
    setSelectedTagIds([]);
    setPlayers(0);
    setPlaytimeMax(0);
    setExpansionFilter('all');
  }

  const filteredGames = filterGames(
    games,
    searchQuery,
    selectedTagIds,
    players,
    playtimeMax,
    playtimeMode,
    expansionFilter
  );
  const sortedGames = sortGames(filteredGames, sortBy);

  const activeFilters: { key: string; label: string; onRemove: () => void }[] = [];

  if (searchQuery) {
    activeFilters.push({ key: 'search', label: `검색: ${searchQuery}`, onRemove: () => setSearchQuery('') });
  }
  selectedTagIds.forEach((tagId) => {
    const tag = tags.find((t) => t.id === tagId);
    if (tag) {
      activeFilters.push({ key: `tag-${tagId}`, label: tag.name, onRemove: () => toggleTag(tagId) });
    }
  });
  if (players > 0) {
    activeFilters.push({
      key: 'players',
      label: players >= 9 ? '9명 이상' : `${players}명`,
      onRemove: () => setPlayers(0),
    });
  }
  if (playtimeMax > 0) {
    activeFilters.push({
      key: 'playtime',
      label: playtimeMax > 180 ? '180분 이상' : `${playtimeMax}분 이내`,
      onRemove: () => setPlaytimeMax(0),
    });
  }
  if (expansionFilter !== 'all') {
    activeFilters.push({
      key: 'expansion',
      label: expansionFilter === 'base' ? '본편만' : '확장만',
      onRemove: () => setExpansionFilter('all'),
    });
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-lg font-semibold shrink-0">판놀음</h1>

        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="게임 이름으로 검색"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
          />
        </div>

        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm shrink-0"
        >
          <Filter size={14} />
          필터
        </button>

        <ThemeToggle />
      </header>

      <div className="flex items-center justify-between px-4 pt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">총 {sortedGames.length}개의 게임</p>
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={14} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-700 bg-transparent rounded-lg px-2 py-1.5"
          >
            <option value="name">이름순</option>
            <option value="weight-asc">난이도 낮은순</option>
            <option value="weight-desc">난이도 높은순</option>
            <option value="playtime-asc">플레이타임 짧은순</option>
            <option value="playtime-desc">플레이타임 긴순</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-4 pt-2">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={f.onRemove}
              className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {f.label}
              <X size={12} />
            </button>
          ))}
          <button onClick={resetAllFilters} className="text-xs text-gray-400 underline ml-1">
            전체 초기화
          </button>
        </div>
      )}

      <main className="p-4">
        <CardGrid games={sortedGames} tags={tags} />
      </main>

      {filterOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setFilterOpen(false)} />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-4 z-50 transition-transform duration-300 overflow-y-auto ${
          filterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400">필터</h2>
          <button onClick={() => setFilterOpen(false)} className="text-gray-400">
            ✕
          </button>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1.5">
            <span>인원수</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
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
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1.5">
            <span>플레이타임</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
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
                  : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              최소 기준
            </button>
            <button
              onClick={() => setPlaytimeMode('max')}
              className={`px-2 py-1 rounded-md text-xs border transition-colors ${
                playtimeMode === 'max'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              최대 기준
            </button>
          </div>
        </div>

        <div className="mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">태그</span>
        </div>
        <TagFilterList tags={tags} selectedTagIds={selectedTagIds} onToggle={toggleTag} />

        <div className="mt-5">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">확장</span>
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
                    : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'
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