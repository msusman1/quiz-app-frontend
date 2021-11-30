import React, {useEffect, useState} from "react";
import {Resource, ResourceState} from "../utils/Resource";
import HttpClient from "../utils/HttpClient";
import {TopicModel} from "../data/TopicModel";
import TopicsContainer from "./TopicsContainer";
import FailedLayout from "./FailedLayout";
import ProgressLayout from "./ProgressLayout";


export default function Home() {
    const [result, setResult] = useState(Resource.progress<TopicModel[]>("Please Wait..."));

    const retryClickHandler = () => {
        fetchTopics()
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    if (result.state == ResourceState.SUCCEEDED)
        return <TopicsContainer topics={result.data!!}/>;
    else if (result.state == ResourceState.FAILED)
        return <FailedLayout msg={result.message} retryListener={retryClickHandler}/>;
    else
        return <ProgressLayout msg={result.message}/>;


    function fetchTopics() {
        setResult(Resource.progress("Please Wait..."));
        HttpClient.get<TopicModel[]>("/cnc/topics/all.json")
            .then(topics =>
                setResult(Resource.success(topics))
            ).catch(error =>
            setResult(Resource.failure(error.message))
        );
    }
}