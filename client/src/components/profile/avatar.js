import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 60,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  profileName:{
    textAlign:'center'
  },
  Body:{

  }
};

function ImageAvatars(props) {
    
  const { classes } = props;
 
  return (
    
    <div>
        <div className={classes.row}>
        <Avatar
            alt="Broken"
            src="default_avatar.png"
            className={classNames(classes.avatar, classes.bigAvatar)}
        />
        </div>
        
    
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);