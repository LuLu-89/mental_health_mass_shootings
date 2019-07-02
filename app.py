from flask import Flask, jsonify, render_template, redirect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

engine = create_engine(
    f'sqlite:///resources/tstwp.sqlite',
    )

csv_file_path = 'resources/Stanford_MSA_Database.csv'
with open(csv_file_path, 'r') as file:
    data_df = pd.read_csv(file)
data_df.to_sql(con=engine, index_label='id', name='msa', if_exists='replace')

Base = automap_base()
Base.prepare(engine, reflect=True)

session = Session(engine)

@app.route('/')
def index():
    #for row in session.query(Msa).all():
    rows = engine.execute("SELECT * FROM msa").fetchall()
    # for row in engine.table_names():
    #      print(row)

    # items = type(test)

    return render_template("index.html", items=rows)

@app.route('/map')
def map():
    return render_template("map.html")


if __name__ == '__main__':
    app.run(debug=True)