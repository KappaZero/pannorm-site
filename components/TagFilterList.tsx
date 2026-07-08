import { Tag } from '../lib/types';

export default function TagFilterList({
  tags,
  selectedTagIds,
  onToggle,
}: {
  tags: Tag[];
  selectedTagIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const selected = selectedTagIds.includes(tag.id);
        return (
          <button
            key={tag.id}
            onClick={() => onToggle(tag.id)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              selected
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}