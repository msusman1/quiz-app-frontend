import React from "react"
import {CircularProgress} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import '../App.css'
import Typography from "@material-ui/core/Typography/Typography";
import {CenterContainer} from "./CenterContainer";

const useStyles = makeStyles({
    progressTextStyle: {
        color: "grey",
        marginBottom: "20px"
    }
});

interface ProgressLayout {
    msg: string;
}
export default function ProgressLayout({msg}: ProgressLayout) {
    const classes = useStyles();
    return (
        <CenterContainer>
            <Typography className={classes.progressTextStyle}
                        variant="body2">
                {msg}
            </Typography>
            <CircularProgress color="secondary"/>
        </CenterContainer>

    );

}