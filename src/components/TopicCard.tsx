import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";


import {Link} from "react-router-dom";
import {TopicModel} from "../data/TopicModel";

interface TopicCardInterface {
    topic: TopicModel
}

const useStyles = makeStyles(theme => (
    {
        root: {
            padding: theme.spacing(2),
            textAlign: "center",

        },
        cardClass: {
            height: 60,
            textAlign: "center",
            verticalAlign: "middle"
        }
    }
));
const TopicCard: React.FC<TopicCardInterface> = (props: TopicCardInterface) => {
    const classes = useStyles();
    return (
        <Grid item xs={6} sm={4} md={3} xl={2} className={classes.root}>
            <Link to={`/topic/${props.topic.topicId}`} style={{textDecoration: "none"}}>
                <Card>
                    <CardActionArea>
                        <CardContent className={classes.cardClass}>
                            <Typography variant="body2" style={{verticalAlign: "center"}}>{props.topic.topicTitle}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>

    );
};
export default TopicCard
