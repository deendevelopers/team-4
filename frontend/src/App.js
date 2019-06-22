import React, {Component} from 'react'
import './App.css'

import Search from './Search'

export default class App extends Component {
  onSearch = (value) => {
    console.log(`Search triggered with value ${value}`)
    // make API call
  }

  render() {
    return (
      <div className="main">
        <Search onSearch={(value) => this.onSearch(value)} />
      </div>
    )
  }
}
