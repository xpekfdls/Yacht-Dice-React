import React, {useState, useEffect} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { 
	useHistory, withRouter } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Yacht Dice '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function App(props) {
	const classes = useStyles();
	const [username, setUsername] = useState('');
	const [roomname, setRoomname] = useState('');
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState('');
	let history = useHistory();
	const socket = props.socket;

	function handleButtonClick(e){
		console.log("username : "+username+", roomname : "+roomname);
		setSubmit(true);
		socket.emit("join", {room : roomname, name: username});
	}

	function handleUserName(e){
		setUsername(e.target.value);

	}

	function handleRoomName(e){
		setRoomname(e.target.value);
	}
  
	useEffect(() => {
		socket.on('fail', data => {
			console.log(data)
			setError(data.msg);
			setSubmit(false);
		});
		socket.on('glog', data => {
			console.log(data)
			if(data.type == "join"){
				history.push("/game")		
			}
		});
		socket.on('state', data => {
			console.log(data)
		});
	}, [submit]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
				<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Yacht Dice
				</Typography>
				<form className={classes.form}>
					<TextField
				    variant="outlined"
				    margin="normal"
				    required
				    fullWidth
				    id="username"
				    label="User name"
				    name="username"
				    autoComplete="username"
				    autoFocus
				    onChange = {handleUserName}
					/>
					<TextField
				    variant="outlined"
				    margin="normal"
				    required
				    fullWidth
				    name="room"
				    label="Room name"
				    type="room"
				    id="room"
				    onChange = {handleRoomName}
					/>

					<Typography component="h6" color="error">
						{error}
					</Typography>
					<Button
				    fullWidth
				    variant="contained"
				    color="primary"
				    className={classes.submit}
				    onClick = {handleButtonClick}
					>
					Join Room
					</Button>
				</form>
				</div>
			<Box mt={8}>
				<Copyright />
			</Box>
	    </Container>

	);
}

export default withRouter(App);

