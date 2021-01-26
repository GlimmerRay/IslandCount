import React from 'react';
import { Square } from './Square.js';

// Takes a 2d array of 1s and 0s
// Each row must be of equal length
// Constructs an html grid of squares with
// 1s a certain className and 0s another className
export class BaseGrid extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
		turnedOn: this.props.turnedOn
	  }
	}
  
	makeGrid(turnedOn) {
	  	var rows = []
	  	for (var i=0; i<turnedOn[0].length; i++) {
			var row = []
			for (var j=0; j<turnedOn.length; j++) {
				if (turnedOn[j][i] == "1") {
					row.push(<Square className={"squareOn"}/>)
				} else if (turnedOn[j][i] == "0") {
					row.push(<Square className={"squareOff"}/>)
				} else if (turnedOn[j][i] == "2") {
					row.push(<Square className={"squareHighlight"}/>)
				} else {

				}
			}
	  		rows.push(<tr>{row}</tr>)
	  	}
		return <table><tbody>{rows}</tbody></table>
	}
  
	render() {
		var turnedOn = this.props.turnedOn
		return this.makeGrid(turnedOn)
	}
}