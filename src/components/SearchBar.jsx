import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');

    const handleSearch = () => {
        onSearch({ searchTerm, category });
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="veg">Vegetarian</option>
                <option value="dessert">Desserts</option>
                <option value="quick">Quick Meals</option>
            </select>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
