from flask import Flask, json, jsonify
import random
from datetime import datetime
import csv
from numpy.core.numeric import moveaxis
import pandas as pd
import numpy as np
from flask_cors import CORS

# declare constants
HOST = 'localhost'
PORT = 5000

# initialize flask application
app = Flask(__name__)
CORS(app)

test_data = []

crimes_df = pd.read_csv("./Crimes.csv")
crimes_df['Month'] = pd.DatetimeIndex(crimes_df['Date']).month
crimes_sel = crimes_df[(crimes_df["X Coordinate"].notnull())
                       & (crimes_df["Y Coordinate"].notnull())]


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


@app.route('/get/crime_recount/type')
def get_crime_recount():
    return crimes_sel.groupby(['Primary Type']).count()['ID'].to_json()


@app.route('/get/crime_recount/type/month')
def get_crime_recount_type_month():
    recount = crimes_df.groupby(['Primary Type', 'Month']).count()['ID']
    recount_month = crimes_df.groupby(['Month']).count()['ID']

    obj = {}
    obj['ALL'] = {}

    for i, v in recount.items():
        crime_type = i[0]
        month = i[1]
        if crime_type in obj:
            obj[crime_type][month] = v
        else:
            obj[crime_type] = {}
            for i in range(1, 13):
                obj[crime_type][i] = 0
                obj[crime_type][month] = v

    for i, v in recount_month.items():
        obj['ALL'][i] = v    

    return jsonify(obj)

@app.route('/coords/crime_type')
def get_coords_by_crime_type():
    grouped = crimes_sel.groupby("Primary Type")
    # print(np.array(grouped))
    class_labels = crimes_df['Primary Type'].unique()
    data = []
    for i in class_labels:
        data.append(grouped.get_group(i))

    separado = []
    for i in range(len(data)):
        separado.append(data[i].loc[:, ['Longitude', 'Latitude']])

    # JSon1 = []
    JSon1 = {}
    for i in range(len(separado)):
        # eachData = {}
        # eachData['category'] = class_labels[i]
        # eachData['data'] = separado[i].values.tolist()
        # JSon1.append(eachData)
        if class_labels[i] not in JSon1:
            JSon1[class_labels[i]] = separado[i].values.tolist()
    return jsonify(JSon1)

if __name__ == '__main__':
    app.run(host=HOST, debug=True, port=PORT)
