import React from "react";
import Button from "@material-ui/core/Button/Button";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import {Link, useParams} from "react-router-dom";

export default function ApplicationBar() {
    let {topicId} = useParams();

    return (
        <AppBar color="primary">
            <Toolbar>
                <Typography component={Link} to="/" variant="h5"
                            style={{flexGrow: 1, color: "white", textDecoration: "none"}}>Cloud Computing Quiz
                    App</Typography>
                <Button component={Link} to="/topic/0" variant="contained" color="secondary"
                        style={{visibility: topicId ? "hidden" : "visible"}}
                >Start Random Test</Button>
            </Toolbar>
        </AppBar>
    );
}
