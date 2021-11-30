import React from "react";
import TopicCard from "./TopicCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {TopicModel} from "../data/TopicModel";


const useStyles = makeStyles(theme => ({
        toolbarTopOffset: theme.mixins.toolbar,

    })
);

interface TopicsContainerInterface {
    topics: TopicModel[]

}

export default function TopicsContainer(props: TopicsContainerInterface) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbarTopOffset}/>
            <Grid container direction="row" alignItems="center" justify="space-evenly">
                {
                    props.topics.map(topic =>
                        <TopicCard key={topic.topicId} topic={topic}/>)
                }
            </Grid>
        </div>
    );
}