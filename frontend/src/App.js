import React, {Component} from 'react'
import './App.scss'

import Search from './Search'
import CardList from './CardList'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      type: 'both',
    }
  }

  onSearch = (value) => {
    console.log(`Search triggered with value ${value}`)
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

  onFilterChange(type) {
    this.setState({type: type})
  }

  render() {
    console.log('App.js - this.state: ', this.state)

    let data = this.state.data

    if (this.state.type === 'verse') {
      data = data.filter(card => {
        return card.type === 'verse'
      })
    }
    else if (this.state.type === 'hadith') {
      data = data.filter(card => {
        return card.type === 'hadith'
      })
    }

    console.log('filtered data: ', data)

    return (
      <div className="main">
        <Search onSearch={(value, type) => this.onSearch(value, type)} />
        {data.length > 0 && <CardList data={data}
        onFilterChange={(value) => this.onFilterChange(value)}/>}
      </div>
    )
  }
}
