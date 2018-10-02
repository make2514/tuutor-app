import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../header/header';
import Papersheet from './paper';
import Avatar from './avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  container: {
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    margin: '0.2em'
  },
  dense: {
    marginTop: 16,
  },
  profileName:{
    textAlign:'center',
    fontSize:40,
    
  },
  menu: {
    width: 200,
  },
  box:{
    backgroundColor:'#FDFCEE'
  }
});

class Profile extends Component{
  state = {
    name: 'fuck u',
    age: '69',
    phone:'1233456^2',
    email:"me@homepls.com",
    multiline: "'What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little etc etc..."
,
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  
  render(){
    const { classes } = this.props; 
    return (
      
      <div>
        <div className={classes.box}>
          <Header/>
          <Avatar/>
          <div className={classes.profileName} component="p">
            Rick Harrison
          </div>
          <Grid container className={classes.root}>
            <Grid item xs={6}>
              <Papersheet text1={"Reputation"} text2={"1337"} />  
            </Grid>
            <Grid item xs={6}>
              <Papersheet text1={"20.1.2018"} text2={"Joined"} />  
            </Grid>
          </Grid>
        </div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Age"
            className={classes.textField}
            value={this.state.age}
            onChange={this.handleChange('age')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Phone"
            className={classes.textField}
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="none"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Bio"
            multiline
            value={this.state.multiline}
            onChange={this.handleChange('multiline')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    );
  
    
  
  }
}
export default withStyles(styles)(Profile);
