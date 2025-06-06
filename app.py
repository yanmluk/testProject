from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route('/get_data',methods=['POST'])
def get_data():
    post_data = request.get_json(force=True)
    data = post_data['data']
    serialized_data = {"data":data}

    return jsonify(serialized_data)


@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)