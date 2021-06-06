import React from 'react';
import Shimmer from './Shimmer';
import './Skeleton.css';
import { makeStyles } from "@material-ui/core";

import SkeletonElement from './SkeletonElement';

const useStyles = makeStyles((theme) => ({
    todoListItem: {        
        marginBottom: theme.spacing(2),
        borderRadius: theme.spacing(1),
        paddingRight: "48px",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        },
    },
}));

function SkeletonTodo({ theme }) {
    const classes = useStyles();

    return (
        <div className={`skeletonTodo ${classes.todoListItem}`}>
            <div className="checkbox-container">
                <SkeletonElement type="checkbox" />
            </div>
            <div className="text-container">
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
            </div>
            <div />
            <Shimmer />
        </div>
    )
}

export default SkeletonTodo
