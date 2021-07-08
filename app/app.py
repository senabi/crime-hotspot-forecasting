from flask import Flask, request, jsonify

# declare constants
HOST = 'localhost'
PORT = 5000

# initialize flask application
app = Flask(__name__)

test_data = []


# sample hello world page
@app.route('/')
def hello():
    return "<h1>python api</h1>"


# sample api endpoint
@app.route('/api/test', methods=['GET', 'POST'])
def test():
    global test_data
    if request.method == 'POST':
        # get parameters from post request
        parameters = request.get_json()
        test_data.append(parameters)
        print(test_data)
        return jsonify(test_data)
    else:
        return jsonify(test_data)


if __name__ == '__main__':
    app.run(host=HOST, debug=True, port=PORT)
