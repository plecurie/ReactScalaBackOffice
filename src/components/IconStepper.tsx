import {StepConnector, StepIconProps, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import PostAddIcon  from '@material-ui/icons/PostAdd';
import React from "react";
import {Announcement, Assignment} from "@material-ui/icons";

export const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage: 'linear-gradient(to right bottom, #25be96, #4abe90, #61be8b, #73be88, #83be86)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage: 'linear-gradient(to right bottom, #25be96, #4abe90, #61be8b, #73be88, #83be86)',
    }
});

export const ColorlibStepIcon = (props: StepIconProps) =>  {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <Announcement />,
        2: <PostAddIcon />,
        3: <PostAddIcon />,
        4: <PostAddIcon />,
        5: <Assignment/>
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
};
