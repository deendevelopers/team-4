from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__, static_folder="frontend/build/static", template_folder="frontend/build")

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/api')
@cross_origin()
def api():
  search_term = request.args.get('search')
  search_type = request.args.get('type')

  data = [
    {
      'type': 'hadith',
      'chapterNo': 1,
      'hadithNo': 2,
      'chapter': 'Revelation - كتاب بدء الوحى',
      'textAr': 'حدثنا عبد الله بن يوسف، قال أخبرنا مالك، عن هشام بن عروة، عن أبيه، عن عائشة أم المؤمنين  رضى الله عنها  أن الحارث بن هشام  رضى الله عنه  سأل رسول الله صلى الله عليه وسلم فقال يا رسول الله كيف يأتيك الوحى فقال رسول الله صلى الله عليه وسلم " أحيانا يأتيني مثل صلصلة الجرس  وهو أشده على  فيفصم عني وقد وعيت عنه ما قال، وأحيانا يتمثل لي الملك رجلا فيكلمني فأعي ما يقول ". قالت عائشة رضى الله عنها ولقد رأيته ينزل عليه الوحى في اليوم فيفصم عنه وإن جبينه ليتفصد عرقا.',
      'textEn': 'Narrated \'Aisha:(the mother of the faithful believers) Al-Harith bin Hisham asked Allah\'s Apostle "O Allah\'s Apostle! How is the Divine Inspiration revealed to you?" Allah\'s Apostle replied, "Sometimes it is (revealed) like the ringing of a bell, this form of Inspiration is the hardest of all and then this state passes off after I have grasped what is inspired. Sometimes the Angel comes in the form of a man and talks to me and I grasp whatever he says." \'Aisha added: Verily I saw the Prophet being inspired divinely on a very cold day and noticed the sweat dropping from his forehead (as the Inspiration was over).'
    },
    {
      'type': 'verse',
      'surahNo': 1,
      'verseNo': 7,
      'textAr': 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      'textEn': 'All praise is due to Allah, Lord of the worlds',
    }
  ]
  return jsonify(data)

print('Starting Flask!')

app.debug=True
app.run(host='0.0.0.0')
