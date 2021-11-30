import React, {Component} from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from '@material-ui/styles';
import {Resource, ResourceState} from "../utils/Resource";
import {QuestionModel} from "../data/TopicModel";
import QuestionCard from "./QuestionCard";
import ResultLayout from "./ResultLayout";
import FailedLayout from "./FailedLayout";
import ProgressLayout from "./ProgressLayout";
import ApplicationBar from "./ApplicationBar";
import HttpClient from "../utils/HttpClient";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    toolbarTopOffset: theme.mixins.toolbar
});

interface IProps {
    classes?: any;
}

type MyState = { result: Resource<QuestionModel[]> };

class QuestionsContainer extends Component<IProps, MyState> {

    static getTopicId() {
        var pathname = window.location.pathname;
        var index = pathname.lastIndexOf("/");
        var topicId = parseInt(pathname.substr(index + 1, pathname.length));
        return topicId

    }

    constructor(props: any) {
        super(props);
        this.state = {result: Resource.progress<QuestionModel[]>("Loading " + QuestionsContainer.getTopicId())};
        this.onUserAnswer = this.onUserAnswer.bind(this);
        this.retryClicker = this.retryClicker.bind(this)
    }

    componentDidMount() {
        this.fetchTopicQuestions()
    }

    retryClicker() {
        this.fetchTopicQuestions()
    }

    onRetake() {
        window.location.href = `/topic/${QuestionsContainer.getTopicId()}`;
        var questions = this.state.result.data!!;
        questions.forEach(question =>
            question.userAnsweredPosition = 0
        );
        this.setState({result: Resource.success(questions)})
    }

    onUserAnswer(questionAnswered: QuestionModel) {
        var questions = this.state.result.data!!;
        var answerIndex = questions.indexOf(questionAnswered);
        if (answerIndex != questions.length - 1) {
            questions[answerIndex].userAnsweredPosition = questionAnswered.userAnsweredPosition;
        }
        this.setState({result: Resource.success(questions)})
    }

    private getNextQuestion() {
        var questions = this.state.result.data!!;
        var question = questions.find(o => o.userAnsweredPosition == undefined || o.userAnsweredPosition == 0);
        return question!!;
    }

    private getQuestionIndex() {
        var questions = this.state.result.data!!;
        return questions.findIndex(o => o.userAnsweredPosition == undefined);
    }

    templateUi = () => {
        var questions = this.state.result.data!!;
        if (this.state.result.state == ResourceState.SUCCEEDED) {

            if (questions.some(o => o.userAnsweredPosition == undefined)) {
                return (<div>
                    <h1 style={{textAlign: "center"}}>  {this.getQuestionIndex() + 1 + "/" + questions.length}</h1>
                    <QuestionCard question={this.getNextQuestion()} onAnswer={this.onUserAnswer}/>;
                </div>)


            } else {
                return <ResultLayout questions={this.state.result.data!!} onRetakeClick={this.onRetake}/>
            }
        }


        else if (this.state.result.state == ResourceState.FAILED)
            return <FailedLayout msg={this.state.result.message} retryListener={this.retryClicker}/>;
        else
            return <ProgressLayout msg={this.state.result.message}/>;
    };


    //
    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.toolbarTopOffset}/>
                <ApplicationBar/>
                {this.templateUi()}
            </div>
        );

    }

    fetchTopicQuestions() {
        var topicId = QuestionsContainer.getTopicId();
        var urlTopicWise = `/cnc/questions/${topicId}.json`;
        var ranId = Math.floor(Math.random() * 10) + 1;
        var urlRandom = `/cnc/random/${ranId}.json`;
        let urlToload = topicId > 0 ? urlTopicWise : urlRandom;
        this.setState({result: Resource.progress("Please Wait...")});
        HttpClient.get2<QuestionModel[]>(urlToload)
            .then(questions =>
                this.setState({
                    result: Resource.success(questions),
                })
            ).catch(error =>
            this.setState({result: Resource.failure(error.message)})
        );

    }

}

export default withStyles(useStyles)(QuestionsContainer);