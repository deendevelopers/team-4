import React, {Component} from 'react'
import './CardList.scss'

import Card from './Card'

export default class CardList extends Component {
  render() {
    console.log('CardList.js - this.props: ', this.props)

    return (
      <div className="card-list">
        <div className="check-boxes">
          <span className="quran">
            <label htmlFor="quran">Qur'an</label>
            <input
              id="quran"
              name="check"
              type="radio"
              onChange={() => this.props.onFilterChange('verse')}/>
          </span>
          <span className="hadith">
            <label htmlFor="hadith">Hadith</label>
            <input
              id="hadith"
              name="check"
              type="radio"
              onChange={() => this.props.onFilterChange('hadith')}/>
          </span>
          <span className="both">
            <label htmlFor="both">Both</label>
            <input
              id="both"
              name="check"
              type="radio"
              onChange={() => this.props.onFilterChange('both')}/>
          </span>
        </div>
        {this.props.data.map(((card, index) => {
          return <Card key={index} data={card} />
        }))}
      </div>
    )
  }
}
