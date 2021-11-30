import {QuestionModel} from "../data/TopicModel";
import * as React from "react";
import {CenterContainer80} from "./CenterContainer";
import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import ReplayIcon from '@mui/icons-material/Replay';

interface ResultLayoutInterface {
    questions: QuestionModel[]
    onRetakeClick: () => void;
}

export default function ResultLayout(props: ResultLayoutInterface) {
    const rightQuestions = () => {
        var filtered = props.questions.filter(question => question.userAnsweredPosition == question.questionAnswer);
        return filtered.length
    };
    const percentage = () => {
        var right = rightQuestions();
        return (right * 100) / props.questions.length
    };
    return (
        <CenterContainer80>
            <Card raised={true}>


                <h1 style={{textAlign: "center"}}> {"Result : " + percentage() + "%"}</h1>
                <h2 style={{textAlign: "center"}}> {"Write questions: " + rightQuestions() + " , Wrong questions: " + (props.questions.length - rightQuestions())}</h2>

                <div style={{textAlign: "center"}}  >
                    <Link to={`/`} style={{textDecoration: "none"}}>
                        <Button variant="contained" startIcon={<HomeIcon/>}>Home</Button>
                    </Link>
                    <Button variant="outlined" style={{marginLeft: "20px"}} onClick={props.onRetakeClick}
                            startIcon={<ReplayIcon/>}>Retry</Button>
                </div>

                {props.questions.map((question, index) =>
                    <div key={question.questionId}>
                        <Grid container>
                            <Grid item xs={8} style={{padding: "24px"}}>
                                <div>
                                    <Typography variant="h5"> {index + 1}.{question.questionTitle}</Typography>
                                    <Typography variant="body1">
                                        {"a)." + question.questionOption1}
                                        {question.questionAnswer == 1 &&
                                        < CheckCircleIcon fontSize="small" color="success"/>}
                                        {(question.userAnsweredPosition == 1 && question.questionAnswer != 1) &&
                                        <CancelIcon fontSize="small" color="error"/>}
                                    </Typography>

                                    <Typography variant="body1">
                                        {"b)." + question.questionOption2}
                                        {question.questionAnswer == 2 &&
                                        < CheckCircleIcon fontSize="small" color="success"/>}
                                        {(question.userAnsweredPosition == 2 && question.questionAnswer != 2) &&
                                        <CancelIcon fontSize="small" color="error"/>}
                                    </Typography>

                                    <Typography variant="body1">
                                        {"c)." + question.questionOption3}
                                        {question.questionAnswer == 3 &&
                                        < CheckCircleIcon fontSize="small" color="success"/>}
                                        {(question.userAnsweredPosition == 3 && question.questionAnswer != 3) &&
                                        <CancelIcon fontSize="small" color="error"/>}

                                    </Typography>

                                    <Typography variant="body1">
                                        {"d)." + question.questionOption4}
                                        {question.questionAnswer == 4 &&
                                        < CheckCircleIcon fontSize="small" color="success"/>}
                                        {(question.userAnsweredPosition == 4 && question.questionAnswer != 4) &&
                                        <CancelIcon fontSize="small" color="error"/>}

                                    </Typography>

                                </div>

                            </Grid>
                            <Grid item xs={4} style={{backgroundColor: "#f5f5f5", padding: "24px"}}>
                                <div>
                                    <Typography variant="h6">Explanation:</Typography>
                                    <Typography variant="subtitle2">{question.questionExplanation}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <hr/>

                    </div>
                )
                }
            </Card>

        </CenterContainer80>

    );
}