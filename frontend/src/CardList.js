import React, {Component} from 'react'
import './CardList.scss'

import Card from './Card'

export default class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        {this.props.data.map((card => {
          return <Card data={card} />
        }))}
      </div>
    )
  }
}
