import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.scss'

export default class Card extends Component {
  render() {
    const cardData = this.props.data

    console.log('Card - cardData: ', cardData)

    return (
      <div className="card-container">
        <div className="card-meta">
          {cardData && cardData.type === 'hadith' ? <span>Chapter #: {cardData.chapterNo}</span> : <span>Surah #: {cardData.surahNo}</span>}
          {cardData && cardData.type === 'hadith' ? <span>Hadith #: {cardData.hadithNo}</span> : <span>Verse: # {cardData.verseNo}</span>}
        </div>
        <div className="card-text">
          <div className="card-arabic">{cardData.textAr}</div>
          <div className="card-english">{cardData.textEn}</div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  type: PropTypes.oneOf(['hadith', 'verse'])
}
