import React, {useState} from "react";
import {QuestionModel} from "../data/TopicModel";
import Card from "@material-ui/core/Card/Card";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Button from "@material-ui/core/Button/Button";

interface QuestionCardInterface {
    question: QuestionModel
    onAnswer: (answer: QuestionModel) => void;

}


export default function QuestionCard(props: QuestionCardInterface) {
    var [answer, setAnswer] = useState(-1);
    var handleChange = (e: any) => {
        var indes = e.target.value;
        setAnswer(indes)
    };
    var nextClick = () => {
        if (answer != -1) {
            var tempQuestion = props.question;
            tempQuestion.userAnsweredPosition = answer;
            setAnswer(-1);
            props.onAnswer(tempQuestion)
        }
    };
     const preUi = () => {
        if (props.question.questionPreBody != undefined) {
            if (props.question.questionPreBody.startsWith("https://")) {
              return  <img src={props.question.questionPreBody}/>
            } else {
                return   <h4>{props.question.questionPreBody}</h4>
            }
        }

    };

    return (
        <div style={{"width": "60%", margin: "auto"}}>
            <Card style={{paddingLeft: "30px", paddingRight: "30px", paddingBottom: "30px", marginTop: "30px"}}>
                <h2>{props.question.questionTitle}</h2>
                {preUi()}
                <RadioGroup id="radio-group-question" aria-label="gender" name="gender1"
                            value={answer}
                            onChange={handleChange}>
                    {props.question.questionOption1.startsWith("https://") ?
                        <FormControlLabel value="1" control={<RadioWithImage str={props.question.questionOption1}/>} label=""/> :
                        <FormControlLabel value="1" control={<Radio/>} label={props.question.questionOption1}/>}
                    {props.question.questionOption2.startsWith("https://") ?
                        <FormControlLabel value="2" control={<RadioWithImage str={props.question.questionOption1}/>} label=""/> :
                        <FormControlLabel value="2" control={<Radio/>} label={props.question.questionOption2}/>}
                    {props.question.questionOption3.startsWith("https://") ?
                        <FormControlLabel value="3" control={<RadioWithImage str={props.question.questionOption1}/>} label=""/> :
                        <FormControlLabel value="3" control={<Radio/>} label={props.question.questionOption3}/>}
                    {props.question.questionOption4.startsWith("https://") ?
                        <FormControlLabel value="4" control={<RadioWithImage str={props.question.questionOption1}/>} label=""/> :
                        <FormControlLabel value="4" control={<Radio/>} label={props.question.questionOption4}/>}


                </RadioGroup>
                <Button disabled={answer == -1} style={{float: "right"}} id="next-btn" variant="contained"
                        color="primary" size="large"
                        onClick={nextClick}>Next</Button>
            </Card>
        </div>

    )


}
interface RadioWithImageInterface {
    str:string
}
function RadioWithImage(props:RadioWithImageInterface){
    return(
        <div>
            <Radio  {...props}/>
            <img src={props.str}/>
        </div>
    )

}

