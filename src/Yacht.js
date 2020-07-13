import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import YachtScoreBoard from './YachtScoreBoard.js'
import YachtDice from './YachtDice.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


function Yacht(props) {
	const classes = useStyles();
	console.log(props)

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
	);}

export default Yacht;

