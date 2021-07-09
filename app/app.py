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

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

titanic_df = pd.read_csv("static/data/train.csv")
survived = titanic_df[(titanic_df['Survived'] == 1)
                      & (titanic_df["Age"].notnull())]

crimes_df = pd.read_csv("static/data/Crimes.csv")
crimes_sel = crimes_df[(crimes_df["X Coordinate"].notnull())
                       & (crimes_df["Y Coordinate"].notnull())]


@app.route('/')
def index():
    return render_template('home.html')


data = []
class_labels = crimes_df['Primary Type'].unique()
grouped = crimes_sel.groupby("Primary Type")
for i in class_labels:
    data.append(grouped.get_group(i))

grouped = crimes_df.groupby("Primary Type")
data_nan = []
for i in class_labels:
    data_nan.append(grouped.get_group(i))


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


""""
def correjir_geocoding():
    n = 1
"""


def calculate_percentage(val, total):
    """calcula los procentajes del total"""
    percent = np.divide(val, total)
    return percent


@app.route('/api/coords/crime_type')
@cross_origin()
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


@app.route('/get_piechart_data')
@cross_origin()
def get_piechart_data():
    class_labels = crimes_df['Primary Type'].unique()

    pclass_percent = calculate_percentage(
        crimes_sel.groupby('Primary Type').size().values,
        crimes_sel['ID'].count()) * 100
    pieChartData = []
    for index, item in enumerate(pclass_percent):
        eachData = {}
        eachData['category'] = class_labels[index]
        eachData['measure'] = round(item, 1)
        pieChartData.append(eachData)

    return jsonify(pieChartData)


# @app.route('/get_barchart_data')
# def get_barchart_data():
# com_labels = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
# '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']

# com_labels   = crimes_df['Year'].unique().tolist()
# com_labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
# class_labels = crimes_df['Primary Type'].unique()

# crimes_sel["com_labels"] = pd.cut(crimes_sel.Year, 10)
# crimes_sel[['com_labels', 'Primary Type']]
# crimes = []

# for i in range(len(class_labels)):
# crimes.append(
# crimes_sel[crimes_sel['Primary Type'] == class_labels[i]])
# percentAll = []
# percentA = calculate_percentage(crimes_sel.groupby(
# 'Year').size().values, crimes_sel['ID'].count())*100
# for i in range(len(class_labels)):
# percentAll.append(calculate_percentage(crimes[i].groupby(
# 'Year').size().values, crimes[i]['ID'].count())*100)

# barChartData = []
# for index, item in enumerate(percentA):
# eachBarChart = {}
# eachBarChart['group'] = "All"
# eachBarChart['category'] = com_labels[index]
# eachBarChart['measure'] = round(item, 1)
# barChartData.append(eachBarChart)

# for i in range(len(percentAll)):
# for index, item in enumerate(percentAll[i]):
# eachBarChart = {}
# eachBarChart['group'] = class_labels[i]
# eachBarChart['category'] = com_labels[index]
# eachBarChart['measure'] = round(item, 1)
# barChartData.append(eachBarChart)

# return jsonify(barChartData)


@app.route('/api/coords/by_year')
@cross_origin()
def get_coords_by_year():
    grouped = crimes_sel.groupby("Year")
    class_labels = crimes_df['Year'].unique().tolist()
    data = []
    for i in class_labels:
        data.append(grouped.get_group(i))

    separado = []
    for i in range(len(data)):
        separado.append(data[i].loc[:, ['Latitude', 'Longitude']])

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


@app.route('/api/coords/by_month')
@cross_origin()
def get_coords_by_month():
    # by_year = crimes_sel.groupby("Year")
    class_labels = crimes_df['Year'].unique().tolist()
    years = {}
    for ix, row in crimes_df.dropna().iterrows():
        ilatitude = float(row['Latitude'])
        ilongitude = float(row['Longitude'])
        iyear = int(row['Year'])
        idate = datetime.strptime(row['Date'], '%m/%d/%Y %H:%M:%S %p')

        if iyear not in years:
            # years[iyear] = [[ilongitude, ilatitude]]
            years[iyear] = dict()
            years[iyear][idate.month] = [[ilongitude, ilatitude]]
        else:
            if idate.month not in years[iyear]:
                years[iyear][idate.month] = [[ilongitude, ilatitude]]
            else:
                years[iyear][idate.month].append([ilongitude, ilatitude])

    return jsonify(years)


@app.route('/get_barchart_data')
@cross_origin()
def get_barchart_data():
    month_labels = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    class_labels = crimes_df['Primary Type'].unique()

    month_recount = {}
    for index, row in crimes_sel.iterrows():
        idate = datetime.strptime(row['Date'], '%m/%d/%Y %H:%M:%S %p')
        month = month_labels[idate.month - 1]

        if month in month_recount:
            month_recount[month] += 1
        else:
            month_recount[month] = 1

    class_month_recount = {}
    for index, row in crimes_sel.iterrows():
        crime_type = row['Primary Type']
        idate = datetime.strptime(row['Date'], '%m/%d/%Y %H:%M:%S %p')
        month = month_labels[idate.month - 1]
        if crime_type in class_month_recount:
            if month in class_month_recount[crime_type]:
                class_month_recount[crime_type][month] += 1
            else:
                class_month_recount[crime_type][month] = 1
        else:
            class_month_recount[crime_type] = {}
            class_month_recount[crime_type][month] = 1
    """ Posible optimizacion al momento de calcular los recuentos """
    barChartData = []
    total = 0
    for v in month_recount.values():
        total += v
    for key, value in month_recount.items():
        obj = {}
        obj["category"] = key
        obj["group"] = "All"

        obj["measure"] = round((value / total) * 100, 1)
        barChartData.append(obj)

    for crime_type, value in class_month_recount.items():
        crime_total = 0
        for v in value.values():
            crime_total += v
        for month, recount in value.items():
            obj = {}
            obj["category"] = month
            obj["group"] = crime_type
            obj['measure'] = round((recount / crime_total) * 100, 1)
            barChartData.append(obj)
    """
    Falta realizar validacion de que todos los tipos de crimenes
    y meses esten completos, en caso no se hayan registrado casos
    tienen que tener el valor 0.
    """

    return jsonify(barChartData)


@app.route('/get_map_data')
@cross_origin()
def get_map_data():
    return 1


@app.route('/get_dataset_header')
@cross_origin()
def get_dataset_header():
    raw_json_data = crimes_df.head(10).to_json(orient='records')
    return raw_json_data


@app.route('/preanalisis')
@cross_origin()
def get_metadata():
    return render_template('preanalisis.html')


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


if __name__ == '__main__':
    app.run(debug=True, port=5002)
