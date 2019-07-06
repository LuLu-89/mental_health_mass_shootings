from flask import Flask, jsonify, render_template, redirect
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
Base = automap_base()
engine = create_engine('sqlite:///resources/tstwp.sqlite')


csv_file_path = 'resources/Stanford_MSA_Database.csv'
with open(csv_file_path, 'r') as file:
    data_df = pd.read_csv(file)

data_df.set_index('CaseID',inplace=True)
data_df.to_sql(con=engine, index=True, name='msa', if_exists='replace')

Base.prepare(engine, reflect=True)
session = Session(engine)

metadata = db.MetaData()
msa = db.Table('msa', metadata,autoload=True, autoload_with=engine)

@app.route('/')
def index():
    return render_template("dashboard.html")

@app.route('/api/data')
def data(): 
    columns = msa.columns.keys()
    rows = engine.execute("SELECT * FROM msa").fetchall()
    items = []
    for row in rows:
        item = {}
        for i in range(len(columns) - 1):
            item[columns[i]] = row[i]
        items.append(item)
    return jsonify(items)

@app.route('/map')
def map():
    return render_template("map.html")


if __name__ == '__main__':
    app.run(debug=True)