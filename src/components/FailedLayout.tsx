import React from "react"
import {Button} from "@material-ui/core";
import '../App.css'
import Typography from "@material-ui/core/Typography/Typography";
import '../'
import {CenterContainer} from "./CenterContainer";

interface FailedLayoutInterface {
    msg: string;
    retryListener: () => void;
}

export default function FailedLayout(props: FailedLayoutInterface) {

    return (
        <CenterContainer>
            <img height="150px" width="150px" src={"/images/no_internet_icon.png"}/>
            <Typography variant="body2" style={{"textAlign": "center", "color": "grey"}}>
                {props.msg}
            </Typography>
            <Button variant="contained" onClick={props.retryListener}
                    style={{"marginTop": "20px"}} color="secondary">
                Retry
            </Button>
        </CenterContainer>
    );

}
