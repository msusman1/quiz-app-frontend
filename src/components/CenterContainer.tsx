import React from "react"
import red from "@material-ui/core/colors/red";
import lightGreen from "@material-ui/core/colors/lightGreen";
import {TextAlignProperty} from "csstype";
import grey from "@mui/material/colors/grey";

const centerClass = {

    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "40vh",
    textAlign: "center" as TextAlignProperty
};
const centerClass1 = {

    marginRight: "auto",
    marginLeft: "auto",
    width:"80%",

};
export const CenterContainer: React.FC<{}> = (props) => (
    <div style={centerClass}>
        {props.children}
    </div>
);
export const CenterContainer80: React.FC<{}> = (props) => (
    <div style={centerClass1}>
        {props.children}
    </div>
);

