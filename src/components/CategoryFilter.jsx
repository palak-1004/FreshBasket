import { CATEGORIES, CATEGORY_ICONS } from '../data/products';
import './CategoryFilter.css';

export default function CategoryFilter({ selected, onSelect }) {
  const categories = ['All', ...Object.values(CATEGORIES)];

  return (
    <div className="category-filter" id="category-filter">
      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selected === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
            id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <span className="cat-icon">
              {cat === 'All' ? '🛒' : CATEGORY_ICONS[cat] || '🥬'}
            </span>
            <span className="cat-label">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
