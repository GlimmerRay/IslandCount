import './App.css';
import React from 'react';
import { BaseGrid } from './components/BaseGrid.js';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class RandomGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      turnedOn: this.fillRandomGrid(this.props.height, this.props.width),
      count: 0,
      message: ''
    }
  }

  fillRandomGrid(height, width) {
    var grid = []
    for (var i=0; i<height; i++) {
      grid.push([])
      for (var j=0; j<width; j++) {
        grid[i].push(this.getRandVal())
      }
    }
    return grid
  }

  async countIslands() {
    var grid = this.state.turnedOn
    console.log(grid)
    var count = 0
    for (var i=0; i<grid.length; i++) {
      for (var j=0; j<grid[i].length; j++) {
        if (grid[i][j] == '0') {
          this.setMessage('Searching for Island')
          await this.flashCell(i, j, 100)
        }
        if (grid[i][j] == '1') {
          count += 1
          this.setMessage('Island found!')
          this.incrementCount()
          await this.flashCell(i,j, 1000)
          this.setMessage('Clearing island')
          await this.dfsearch(grid, i, j)
        }
      }
    }
  }
  
  async dfsearch(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) {
      return
    }
    if (grid[i][j] == '0') {
      return
    }
    await this.flashCell(i, j, 100)
    grid[i][j] = '0'
    await this.dfsearch(grid, i+1, j)
    await this.dfsearch(grid, i-1, j)
    await this.dfsearch(grid, i, j+1)
    await this.dfsearch(grid, i, j-1)
  }

  async oneToZero(i, j) {
    this.setState((state, props) => {
      var turnedOn = state.turnedOn
      turnedOn[i][j] = '0'
      return {
        turnedOn: turnedOn,
      };
    });
    await sleep(200)
  }

  async flashCell(i, j, ms) {
    var cellValue = this.state.turnedOn[i][j]
    this.setState((state, props) => {
      var turnedOn = state.turnedOn
      turnedOn[i][j] = '2'
      return {
        turnedOn: turnedOn,
      };
    });
    await sleep(ms)
    this.setState((state, props) => {
      var turnedOn = state.turnedOn
      turnedOn[i][j] = cellValue
      return {
        turnedOn: turnedOn,
      };
    });
  }

  setMessage(message) {
    this.setState((state, props) => {
      return {
        message: message,
      };
    });
  }

  incrementCount() {
    this.setState((state, props) => {
      return {
        count: state.count+1,
      };
    });
  }

  // Randomly returns a 0 or 1
  getRandVal() {
    var val = Math.random() < .5 ? '0': '1'
    return val
  }

  render() {
    return <div>
      <div>{this.state.message}</div>
      <div>Count: {this.state.count}</div>
      <BaseGrid turnedOn={this.state.turnedOn}/>
      <button onClick={this.countIslands.bind(this)}>Click Me</button>
    </div>
  }
}

function App() {
  return (
      <RandomGrid height={15} width={15}/>
  );
}

export default App;
