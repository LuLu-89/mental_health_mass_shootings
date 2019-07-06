
var massShooting = d3.csv("/js/Stanford_MSA_Database.csv", function (err, data) {

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
    + '<Caption text="General Possible Motive"/>'
    + '<Legend useVisibleCheck="true"/>'
    + '</Options>'
    + '<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
    + '<Pie2DChart showDataTips="true" itemClickJsFunction="chartClickHanlder" showRotateEffect="true">'
    + '<series>'
    + '<Pie2DSeries nameField="motive" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
    + '<showDataEffect>'
    + '<SeriesSlide duration="1000"/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    + '</Pie2DChart>'
    + '</KoolChart>';

  var layoutStr2 = '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" >'
    + '<Options>'
    + '<Caption text="General Targeted Victim(s)"/>'
    + '<Legend useVisibleCheck="true"/>'
    + '</Options>'
    + '<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
    + '<Pie2DChart showDataTips="true">'
    + '<series>'
    + '<Pie2DSeries nameField="victim" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
    + '<showDataEffect>'
    + '<SeriesSlide duration="1000"/>'
    + '</showDataEffect>'
    + '</Pie2DSeries>'
    + '</series>'
    + '</Pie2DChart>'
    + '</KoolChart>';

  // Use an array variable for Dataset.
  var motivesListPie = [];
  console.log(data);
  console.log(data.length);

  for (var i = 0; i < data.length; i++) {
    motivesListPie.push(data[i]['Possible Motive - General']);
  }

  var motiveHash = []
  for (var j = 0; j < data.length; j++) {
    if (motiveHash[data[j]['Possible Motive - General']] >= 1) {
      motiveHash[data[j]['Possible Motive - General']] += 1
    } else {
      motiveHash[data[j]['Possible Motive - General']] = 1
    }
  }
  console.log(motiveHash);

  pieData = []
  for (var i in motiveHash) {
    pieData.push({ "motive": i, "share": motiveHash[i] })
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

  // -------------------------------- from table data --------------------------------------
  function chartClickHanlder(seriesId, index, data, values) {
    window.setTimeout(function () {
      KoolChart.call("pie2", "setLayout", layoutStr2);
      KoolChart.call("pie2", "setData", victims);
    }, 1000);
  }

  // Use an array variable for pie2.

  var victimsListPie = [];
  // console.log(data);
  console.log(data.length);

  for (var k = 0; k < data.length; k++) {
    victimsListPie.push(data[k]['Targeted Victim/s - General']);
  }

  var victimsHash = []
  for (var l = 0; l < data.length; l++) {
    if (victimsHash[data[l]['Targeted Victim/s - General']] >= 1) {
      victimsHash[data[l]['Targeted Victim/s - General']] += 1
    } else {
      victimsHash[data[l]['Targeted Victim/s - General']] = 1
    }
  }
  console.log(victimsHash);

  pieData2 = []
  for (var i in victimsHash) {
    pieData2.push({ "victim": i, "share": victimsHash[i] })
  }
  console.log(pieData2);



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

  //console.log(motiveListWords);

  // var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
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

  Highcharts.chart('container', {
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