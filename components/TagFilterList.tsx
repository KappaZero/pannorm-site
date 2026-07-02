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
                : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}