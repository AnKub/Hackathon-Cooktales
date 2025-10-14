// import React from 'react';
// import './SearchBar.scss';

// interface SearchBarProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
//   <div className="search-bar">
//     <input
//       type="text"
//       placeholder="Search recipes..."
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className="search-bar__input"
//     />
//     {value && (
//       <button className="search-bar__clear" onClick={() => onChange('')} title="Clear">
//         ×
//       </button>
//     )}
//   </div>
// );

// export default SearchBar;