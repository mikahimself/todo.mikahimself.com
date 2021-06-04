import React from 'react';
import './Skeleton.css';
import SkeletonElement from './SkeletonElement';

function SkeletonTodo() {
    return (
        <div className="skeletonTodo">
            <div className="checkbox-container">
                <SkeletonElement type="checkbox" />
            </div>
            <div className="text-container">
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
            </div>
            <div style={{ width: "10%", }}>

            </div>
        </div>
    )
}

export default SkeletonTodo
