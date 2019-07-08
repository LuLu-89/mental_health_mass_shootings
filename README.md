# Mental Health and Mass Shootings 
by: Brian Hackett, Lucy Ly, Shannon Wills

Dataset: [MSA Dataset](https://github.com/StanfordGeospatialCenter/MSA)

## Purpose
We wanted to look at the relationship between mass shootings and mental health trends in the United States from 1966 to 2016 to see if there was a correlation.

## Method
* Python Flask Server
* SQLite database
  - [SQLite](https://www.sqlite.org/index.html)
* Leaflet for map
  - [Leaflet](https://leafletjs.com)
* KoolChart for interactive pie chart
  - [KoolChart](https://www.koolchart.com)
* High Charts for word cloud
  - [High Charts](https://www.highcharts.com)

## Visualizations
We created three ways to visualize the dataset: a map, pie chart, and word cloud

### Map
We mapped the data to get a geographic representation of our dataset, for anything it might reveal. To achieve this we used [Leaflet.js](https://leafletjs.com) to create a map with toggle layers to show/hide our data and subsets. We included a map layer for our complete dataset, as well as a subset showing where the shooter had a history of mental illness. Because school shootings are a high-profile topic in the discussion of gun control and mental illness, we added a layer to display school-related shootings and compare/contrast them with the mental illness subset.

### Pie Chart
We created an interactive pie chart created by [KoolChart](https://www.koolchart.com) where the first chart shows if the shooter had a history of mental illness, yes, no, or unknown. Once a section of the pie is clicked a second pie chart will pop up that will display all of the general possible motives that were reported in the dataset.

### Word Cloud
We created a word cloud by [High Charts](https://www.highcharts.com) to see the most common motive for the shooter. The most common one that came up was "unknown" but we decided to exclude it because it drew the attention away from all the other motives that we thought were more significant such as "Mental illness", "Multiple motives", and the variety of disputes. 

## Server/Database
We created a flask server, which parses our data from its  source into a sqlite database. The flask server then serves the data from 'api/data'
