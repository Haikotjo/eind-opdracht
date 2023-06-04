import React, { useState } from 'react';

const PageNavigation = ({ totalResults, limit, offset, changePage }) => {
    const [groupIndex, setGroupIndex] = useState(0); // Track which group of pages is shown
    const totalPages = Math.ceil(totalResults / limit);
    const pagesPerGroup = 9;

    const handleClick = (pageNumber) => {
        const newOffset = pageNumber * limit;
        changePage(newOffset);
    };

    const handleNextGroup = () => {
        setGroupIndex(groupIndex + 1);
    };

    const handlePreviousGroup = () => {
        setGroupIndex(groupIndex - 1);
    };

    const startPage = groupIndex * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup, totalPages);
    const pages = [];

    for (let i = startPage; i < endPage; i++) {
        const pageNumber = i + 1;
        pages.push(
            <button key={i} onClick={() => handleClick(i)}>
                {pageNumber}
            </button>
        );
    }

    return (
        <div>
            {groupIndex > 0 && <button onClick={handlePreviousGroup}>&lt;&lt;</button>}
            {pages}
            {groupIndex < Math.floor(totalPages / pagesPerGroup) && (
                <button onClick={handleNextGroup}>&gt;&gt;</button>
            )}
        </div>
    );
};

export default PageNavigation;