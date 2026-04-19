import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search vegetables & fruits...' }) {
  return (
    <div className="search-bar" id="search-bar">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        id="search-input"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} id="search-clear">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
