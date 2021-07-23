#!/usr/bin/env python

from flask import Flask, jsonify, render_template
from flask_cors import CORS, cross_origin
from sklearn.cluster import KMeans
import random
from datetime import datetime
import csv
from numpy.core.numeric import moveaxis
import pandas as pd
import numpy as np
import json
from datetime import datetime
from flask import request
from random import randint

# declare constants
HOST = 'localhost'
PORT = 5000

# initialize flask application
app = Flask(__name__)
CORS(app)

test_data = []

crimes_df = pd.read_csv("./Crimes.csv")
crimes_sel = crimes_df[(crimes_df["X Coordinate"].notnull())
                       & (crimes_df["Y Coordinate"].notnull())].copy()


date_items = {
    'Year': [],
    'Month': [],
    'Day': [],
    'Hour': [],
    'Timestamp': [],
}

date_list = []

for d in crimes_sel.Date.to_list():
    date_item = datetime.strptime(d, '%m/%d/%Y %I:%M:%S %p')
    date_items['Year'].append(date_item.year)
    date_items['Month'].append(date_item.month)
    date_items['Day'].append(date_item.day)
    date_items['Hour'].append(date_item.hour)
    date_items['Timestamp'].append(date_item.timestamp())

crimes_sel['Month'] = date_items['Month'].copy()
crimes_sel['Day'] = date_items['Day'].copy()
crimes_sel['Hour'] = date_items['Hour'].copy()
crimes_sel['Timestamp'] = date_items['Timestamp'].copy()


data = []
class_labels = crimes_df['Primary Type'].unique()
grouped = crimes_sel.groupby("Primary Type")
for i in class_labels:
    data.append(grouped.get_group(i))

grouped = crimes_df.groupby("Primary Type")
data_nan = []
for i in class_labels:
    data_nan.append(grouped.get_group(i))


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


@app.route('/coords/crime_type2')
def get_coords_by_crime_type2():
    fromMonth = request.args.get("fromMonth")
    fromDay = request.args.get("fromDay")
    toMonth = request.args.get("toMonth")
    toDay = request.args.get("toDay")

    filtered = crimes_sel[(crimes_sel['Month'] >= int(fromMonth)) & (crimes_sel['Day'] >= int(fromDay)) & (
        crimes_sel['Month'] <= int(toMonth)) & (crimes_sel['Day'] <= int(toDay))]
    print(filtered.shape)

    grouped = filtered.groupby("Primary Type")
    class_labels = filtered['Primary Type'].unique()
    colors = {}

    for crime_type in class_labels:
        colors[crime_type] = '#%06X' % randint(0, 0xFFFFFF)

    data = {}
    for crime_type in class_labels:
        data[crime_type] = {}
        data[crime_type]["color"] = colors[crime_type]
        data[crime_type]["longs"] = grouped.get_group(
            crime_type).Longitude.to_list()
        data[crime_type]["lats"] = grouped.get_group(
            crime_type).Latitude.to_list()

    print("From date and to date:")
    print(fromMonth, fromDay, toMonth, toDay)
    return data


@app.route('/get_dataset_header')
@cross_origin()
def get_dataset_header():
    raw_json_data = crimes_df.head(10).to_json(orient='records')
    return raw_json_data


@app.route('/get_metadata')
@cross_origin()
def get_columns():
    # print(crimes_df.head())
    shapedf = crimes_df.shape
    print(shapedf[0])
    print(shapedf[1])
    # print(crimes_df.isna().sum())

    column_names = crimes_df.columns.tolist()

    columns_res = []
    # print("TYPES")

    print(crimes_df.describe())
    description = crimes_df.describe(include="all")

    for c in crimes_df:
        print(c)
        col = dict()
        col['name'] = c
        # col['dtype'] = str(crimes_df[c].dtypes)
        # print("~~~TYPE")
        # print(crimes_df[c].dtypes)
        col['type'] = type(crimes_df[c].iloc[0]).__name__
        col['rows_count'] = str(crimes_df[c].dropna().count())
        col['nan_count'] = str(crimes_df[c].isna().sum())
        col['mean'] = str(description[c]['mean'])
        # col['median'] = str(description[c]['median'])
        col['25_percentile'] = str(description[c]['25%'])
        col['50_percentile'] = str(description[c]['50%'])
        col['75_percentile'] = str(description[c]['75%'])
        col['min'] = str(description[c]['min'])
        col['max'] = str(description[c]['max'])
        # print(crimes_df[c].mean())
        # col['mean'] = str(crimes_df[c].mean())
        # if isinstance(crimes_df[c], str):
        # print("str===========")
        columns_res.append(col)

    response = {
        "metadata": {
            "rows_count": shapedf[0],
            "columns_count": shapedf[1],
            "total_nan_rows": "xd",
            "column_names": column_names
        },
        "columns": columns_res
    }
    return jsonify(response)


@app.route('/corregir')
def correjir():
    n = 3
    for i in range(len(class_labels)):
        print(i)
        separado = data[i].loc[:, ['Latitude', 'Longitude']]
        if n < len(separado):
            kmeans = KMeans(n_clusters=n).fit(separado)
            centroids = kmeans.cluster_centers_

            # llenar con los centroides calculados
            for index, row in data_nan[i].iterrows():
                if (np.isnan(row['Latitude'])):
                    row['Latitude'] = centroids[random.randint(0, n - 1)][0]
                if (np.isnan(row['Longitude'])):
                    row['Latitude'] = centroids[random.randint(0, n - 1)][1]
    return jsonify({"response": "done"})


if __name__ == '__main__':
    app.run(host=HOST, debug=True, port=PORT)
