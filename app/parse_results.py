
def parse_results(df):
    json_data = []
    for index, row in df.iterrows():
        row_type = 'hadith' if row['Surah Name'] == 'None' else 'verse'
        data = parse_hadith(row) if row_type == 'hadith' else parse_verse(row)
        json_data.append(data)
    return json_data


def parse_hadith(row):
    return {
        'type': 'hadith',
        'chapterNo': row['chapter_no'],
        'hadithNo': row['hadith_no'],
        'chapter': row['chapter'],
        'textAr': row['text_ar'],
        'textEn': row['text_en']
    }


def parse_verse(row):
    return {
        'type': 'verse',
        'surahName': row['Surah Name'],
        'surahNo': row['Surah Number'],
        'verseNo': row['Verse Number'],
        'textAr': row['Verse Text'],
        'textEn': row['Verse Translation']
    }
