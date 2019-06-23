import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.scss'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:  '',
      quran: false,
      hadith: false,
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSearch()
    }
  }

  onSearch = () => {
    let type = 'both'

    if (this.state.quran && !this.state.hadith) {
      type = 'quran'
    }
    else if (!this.state.quran && this.state.hadith) {
      type = 'hadith'
    }

    this.props.onSearch(this.state.value, type)
  }

  render() {
    return (
      <div className="main-container">
        <div className="search-container">
          <input
            type="text"
            value={this.state.value}
            onKeyDown={(e) => this.handleKeyDown(e)}
            onChange={(e) => this.setState({value: e.target.value})} />
        </div>
        <div className="check-boxes">
          <span className="quran">
            <label htmlFor="quran">Qur'an</label>
            <input
              id="quran"
              value={this.state.quran}
              type="checkbox"
              onChange={() => this.setState((prevState) => {
                return {quran: !prevState.quran}
              })}/>
          </span>
          <span className="hadith">
            <label htmlFor="hadith">Hadith</label>
            <input
              id="hadith"
              value={this.state.hadith}
              type="checkbox"
              onChange={() => this.setState((prevState) => {
                return {hadith: !prevState.hadith}
              })}/>
          </span>
        </div>
        <button onClick={() => this.onSearch()}>Search</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func,
}
