import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.scss'

export default class Card extends Component {
  render() {
    const cardData = this.props.data

    let url 

    if (cardData.type === 'hadith') {
      switch (cardData.source) {
        case 'Sahih Bukhari':
          url = `https://sunnah.com/bukhari/${cardData.chapterNo}/${cardData.hadithNo}`
          break
        case 'Sahih Muslim':
          url = `https://sunnah.com/muslim/${cardData.chapterNo}/${cardData.hadithNo}`
          break
        case 'Sunan Abi Da\'ud':
          url = `https://sunnah.com/abudawud/${cardData.chapterNo}/${cardData.hadithNo}`
          break
        case 'Jami\' al-Tirmidhi':
          url = `https://sunnah.com/tirmidhi/${cardData.chapterNo}/${cardData.hadithNo}`
          break
        case 'Sunan an-Nasa\'i':
            url = `https://sunnah.com/nasai/${cardData.chapterNo}/${cardData.hadithNo}`
            break
        case 'Sunan Ibn Majah':
          url = `https://sunnah.com/ibnmajah/${cardData.chapterNo}/${cardData.hadithNo}`
          break
        default:
          url = '#'
      }
    }
    else if (cardData.type === 'verse') {
      url = `https://quran.com/${cardData.surahNo}/${cardData.verseNo}`
    }

    return (
      <a href={url} target="__blank" className="card-container">
        <div className="card-meta">
          {cardData && cardData.type === 'hadith' ? <span>Chapter #: {cardData.chapterNo}</span> : <span>Surah #: {cardData.surahNo}</span>}
          {cardData && cardData.type === 'hadith' ? <span>Hadith #: {cardData.hadithNo}</span> : <span>Verse: # {cardData.verseNo}</span>}
        </div>
        <div className="card-text">
          <div className="card-arabic">{cardData.textAr}</div>
          <div className="card-english">{cardData.textEn}</div>
        </div>
      </a>
    );
  }
}

Card.propTypes = {
  type: PropTypes.oneOf(['hadith', 'verse'])
}
