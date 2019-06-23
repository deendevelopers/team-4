import React, {Component} from 'react'
import './App.scss'

import Search from './Search'
import CardList from './CardList'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  onSearch = (value) => {
    console.log(`Search triggered with value ${value}`)
    // make API call
    fetch(`http://0.0.0.0:5000/api?search=${value}`)
    .then((resp) => resp.json())
    .then((data)=> {
      this.setState({data: data})
    })
    .catch((error) => {
      // handle any server errors
      console.log('error: ', error)
    })
  }

  render() {
    return (
      <div className="main">
        <Search onSearch={(value) => this.onSearch(value)} />
        <CardList data={this.state.data} />
      </div>
    )
  }
}
