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

  onSearch = (value, type) => {
    console.log(`Search triggered with value ${value}`)
    fetch(`http://0.0.0.0:5000/api?search=${value}&type=${type}`)
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
        <Search onSearch={(value, type) => this.onSearch(value, type)} />
        <CardList data={this.state.data} />
      </div>
    )
  }
}
