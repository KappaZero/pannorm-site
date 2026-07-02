import { Game } from './types';

export function filterGames(
  games: Game[],
  search: string,
  selectedTagIds: string[],
  players: number,
  playtimeMax: number,
  playtimeMode: 'min' | 'max',
  expansionFilter: 'all' | 'base' | 'expansion'
) {
  const expansionIdSet = new Set(games.flatMap((g) => g.expansionIds));

  return games.filter((g) => {
    if (search) {
      const query = search.toLowerCase();
      const matchesKor = g.title.toLowerCase().includes(query);
      const matchesEng = g.titleEn.toLowerCase().includes(query);
      if (!matchesKor && !matchesEng) return false;
    }

    if (
      selectedTagIds.length > 0 &&
      !selectedTagIds.every((tagId) => g.tagIds.includes(tagId))
    ) {
      return false;
    }

    if (players > 0) {
      if (players >= 9) {
        if (g.maxPlayers < 9) return false;
      } else if (players < g.minPlayers || players > g.maxPlayers) {
        return false;
      }
    }

    if (playtimeMax > 0) {
      if (playtimeMax > 180) {
        if (playtimeMode === 'min') {
          if (g.playtimeMax < 180) return false;
        } else {
          if (g.playtimeMin < 180) return false;
        }
      } else {
        if (playtimeMode === 'min') {
          if (g.playtimeMin > playtimeMax) return false;
        } else {
          if (g.playtimeMax > playtimeMax) return false;
        }
      }
    }

    if (expansionFilter !== 'all') {
      const isExpansion = expansionIdSet.has(g.id);
      if (expansionFilter === 'base' && isExpansion) return false;
      if (expansionFilter === 'expansion' && !isExpansion) return false;
    }

    return true;
  });
}