import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        width: 'auto%',
        marginLeft: '10%',
        marginTop: '2%',
        marginRight: '10%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing.unit,
    },
    radioContainer: {
        margin: '10px'
    }

});

function Panel(props) {
    console.log('Panel - props.questions: ',props.questions);
    const { classes } = props;
    return (
        <div className={classes.root}>
            <form name="FormPanelQuiz" onSubmit={props.submitForm}>
                {props.questions.map(question => {
                    return (
                            <ExpansionPanel key={question.name}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>{question.name}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ textAlign: 'left' }} key={question.id}>
                                        {question.alternatives.map(alternative => {
                                            return (
                                                <div key={alternative.text} className={classes.radioContainer}>
                                                    <input id={alternative.text} type="radio" name={question.name} value={alternative.text} />
                                                    <label htmlFor={alternative.text} name={alternative.text}>{alternative.text}</label>
                                                    <br />
                                                </div>
                                            )
                                        })}

                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                    )
                })}
                <br />
                <Button type="submit" raised color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

Panel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel);