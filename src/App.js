import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import YachtScoreBoard from './YachtScoreBoard.js'
import YachtDice from './YachtDice.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function App() {
	const classes = useStyles();

	return (

	<div className="App">
		<Grid container className={classes.root} style={{height : window.innerHeight-50 }} >
			<Grid item xs={4} style={{backgroundColor: "#282c34"}}>
				<YachtScoreBoard></YachtScoreBoard>
			</Grid>

			<Grid item xs={8}>
				<YachtDice></YachtDice>
			</Grid>
		</Grid>
	</div>
	);
}

export default App;