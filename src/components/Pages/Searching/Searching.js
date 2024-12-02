import React, { useEffect, useState } from 'react';

const SearchingPage = ({ searchTerm }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(`/Search/Search?searchTerm=${searchTerm}`)  // Đảm bảo đường dẫn đúng với tên action và controller
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setSearchResults(data))
            .catch(error => console.error('Lỗi:', error));
    }, [searchTerm]);

    return (
        <div>
            <h1>Kết quả tìm kiếm</h1>
            <ul>
                {searchResults.map((item, index) => (
                    <li key={index}>
                        <strong>{item.Name}</strong> - {item.Region}, {item.Country}, {item.City}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchingPage;
