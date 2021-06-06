import React from 'react';
import Shimmer from './Shimmer';
import './Skeleton.css';
import SkeletonElement from './SkeletonElement';

function SkeletonTodo({ theme }) {
    const themeClass = theme || "light";

    return (
        <div className={`skeletonTodo ${themeClass}`}>
            <div className="checkbox-container">
                <SkeletonElement type="checkbox" />
            </div>
            <div className="text-container">
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
            </div>
            <div style={{ width: "10%", }}>

            </div>
            <Shimmer />
        </div>
    )
}

export default SkeletonTodo
