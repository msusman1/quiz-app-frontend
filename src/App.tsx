import React from 'react';
import QuestionsContainer from './components/QuestionsContainer';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import ApplicationBar from "./components/ApplicationBar";

// export const BASE_URL = "https://iquiz-app.herokuapp.com/";
export const BASE_URL = "https://cdn.jsdelivr.net/gh/msusman1/devineScript/";
// export const BASE_URL = "http://localhost:8181/";


export default function App() {
    return (
        <BrowserRouter>
            <ApplicationBar/>
            <Switch>
                <Route path="/topic/:topicId" children={<QuestionsContainer/>}/>
                <Route path="/" children={<Home/>}/>
            </Switch>
        </BrowserRouter>
    );
}





