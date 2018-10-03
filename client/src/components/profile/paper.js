import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    marginTop:10,
    
  },
  title:{
    textAlign:'center'
  }
});

function PaperSheet(props) {
  const { classes } = props;
  console.log(classes);

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.title} variant="headline" component="h3">
          {props.text1}
        </Typography>
        <Typography className={classes.title} component="p">
         {props.text2}
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
