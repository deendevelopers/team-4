import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.scss'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:  ''
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.value)
    }
  }

  render() {
    console.log('this.state: ', this.state)

    return (
      <div className="search">
        <div className="search-container">
          <input
            type="text"
            value={this.state.value}
            onKeyDown={(e) => this.handleKeyDown(e)}
            onChange={(e) => this.setState({value: e.target.value})} />
        </div>
        <button onClick={() => this.props.onSearch(this.state.value)}>Search</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func,
}
