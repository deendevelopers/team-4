from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin

from app.parse_results import parse_results
from app.query import Query

app = Flask(__name__, static_folder="frontend/build/static",
            template_folder="frontend/build")


@app.route("/")
def hello():
    return render_template('index.html')


@app.route('/api')
@cross_origin()
def api():
    search_term = request.args.get('search')
    query = Query()
    results_df = query.query_similar_items(search_term)
    json_data = parse_results(results_df)
    return jsonify(json_data)


print('Starting Flask!')

app.debug = True
app.run(host='0.0.0.0')
