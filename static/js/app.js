
var massShooting = d3.json("/api/data", function (err, data) {

  console.log(massShooting);
  console.log(data);


  // -----------------------Start creating a dual pie chart-----------------------

  // Create a chart.
  // Parameters:
  // 1. Chart Identifier (You can use any name you like.)
  // 2. <div> Identifier (The <div> where the chart is created.)
  // 3. Variables used for creating the chart (chartVars)
  // 4. Chart Width (default: 100%)
  // 5. Chart Height (default: 100%)
  KoolChart.create("pie1", "chartHolder", "", "100%", "100%");
  KoolChart.create("pie2", "chartHolder2", "", "100%", "100%");

  // Use a string variable for Layout.
  var layoutStr =
    '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" >'
    + '<Options>'
    + '<Caption text="History of Mental Health"/>'
    + '<Legend useVisibleCheck="true"/>'
    + '</Options>'
    + '<CurrencyFormatter id="numFmt" currencySymbol="" alignSymbol="right"/>'
    + '<Pie2DChart showDataTips="true" itemClickJsFunction="chartClickHanlder" showRotateEffect="true">'
    + '<series>'
    + '<Pie2DSeries nameField="mental health" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
    + '<showDataEffect>'
    + '<SeriesSlide duration="1000"/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    + '</Pie2DChart>'
    + '</KoolChart>';

  var layoutStr2 = '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" >'
    + '<Options>'
    + '<Caption text="General Possible Motive"/>'
    + '<Legend useVisibleCheck="true"/>'
    + '</Options>'
    + '<CurrencyFormatter id="numFmt" currencySymbol="" alignSymbol="right"/>'
    + '<Pie2DChart showDataTips="true">'
    + '<series>'
    + '<Pie2DSeries nameField="motive" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
    + '<showDataEffect>'
    + '<SeriesSlide duration="1000"/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    + '</Pie2DChart>'
    + '</KoolChart>';

  // Use an associative array for Dataset.
  var mentalHealthPie = [];
  console.log(data);
  console.log(data.length);


  for (var i = 0; i < data.length; i++) {
    mentalHealthPie.push(data[i]['History of Mental Illness - General']);
  }

  var mentalHash = []
  for (var j = 0; j < data.length; j++) {
    if (mentalHash[data[j]['History of Mental Illness - General']] >= 1) {
      mentalHash[data[j]['History of Mental Illness - General']] += 1
    } else {
      mentalHash[data[j]['History of Mental Illness - General']] = 1
    }
  }
  console.log(mentalHash);

  pieData = []

  for (var i in mentalHash) {
    pieData.push({ "mental health": i, "share": mentalHash[i] })
  }
  console.log(pieData);


  // Use the KoolChart.calls function to register the functions to be executed when the chart is ready.
  //
  // argument 1 - Chart Identifier
  // argument 2 - The function name to be executed (key) and the argument to be passed to the function (value)
  KoolChart.calls("pie1", {
    "setLayout": layoutStr,
    "setData": pieData
  });

  // Use an associative array for pie2.

  var motivesListPie = [];
  // console.log(data);
  console.log(data.length);

  for (var k = 0; k < data.length; k++) {
    motivesListPie.push(data[k]['Possible Motive - General']);
  }

  var motiveHash = []
  for (var l = 0; l < data.length; l++) {
    if (motiveHash[data[l]['Possible Motive - General']] >= 1) {
      motiveHash[data[l]['Possible Motive - General']] += 1
    } else {
      motiveHash[data[l]['Possible Motive - General']] = 1
    }
  }
  console.log(motiveHash);

  function getdata2() {
    pieData2 = []
    for (var i in motiveHash) {
      pieData2.push({ "motive": i, "share": motiveHash[i] })
    }

    return pieData2;
  }
  pieData2 = getdata2()
  console.log(pieData2);

  window.chartClickHanlder = function (seriesId, index, data, values) {

    console.log(pieData2);

    //window.setTimeout(function () {
    console.log("LOGSOMETHING");

    KoolChart.call("pie2", "setLayout", layoutStr2);
    KoolChart.call("pie2", "setData", getdata2());
    // }, 1000);
  }

  // function getRandomData() {
  //   var arr = [{ "browser": "2016" }, { "browser": "2017" }, { "browser": "2018" }, { "browser": "2019" }];
  //   return arr.map(function (item) {
  //     item.share = Math.round(Math.random() * 50);
  //     return item;
  //   });
  // }

  // ----------------------- The end of the configuration for creating dual pie chart. -----------------------



  // -------------------------- Wordcloud via High Charts: -----------------------------------

  motiveListWords = []
  // console.log(data);
  console.log(data.length);

  for (var i = 0; i < data.length; i++) {
    //console.log(data[i]['Possible Motive - General']);
    if (data[i]['Possible Motive - General'] != "Unknown") {
      motiveListWords.push(data[i]['Possible Motive - General']);
    };
  }

  var lines = motiveListWords,//text.split(/[,\. ]+/g),
    data = Highcharts.reduce(lines, function (arr, word) {
      var obj = Highcharts.find(arr, function (obj) {
        return obj.name === word;
      });
      if (obj) {
        obj.weight += 1;
      } else {
        obj = {
          name: word,
          weight: 1
        };
        arr.push(obj);
      }
      return arr;
    }, []);

  Highcharts.chart('wordcloud', {
    series: [{
      type: 'wordcloud',
      data: data,
      name: 'Occurrences'
    }],
    title: {
      text: 'Wordcloud of General Motives'
    }
  });

});