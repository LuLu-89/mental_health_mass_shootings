
var massShooting = d3.csv("/js/Stanford_MSA_Database.csv", function (err, data) {
   console.log(massShooting);

   // -----------------------Start creating a dual pie chart-----------------------

   // Create a chart.
   // Parameters:
   // 1. Chart Identifier (You can use any name you like.)
   // 2. <div> Identifier (The <div> where the chart is created.)
   // 3. Variables used for creating the chart (chartVars)
   // 4. Chart Width (default: 100%)
   // 5. Chart Height (default: 100%)
   // KoolChart.create("pie1", "chartHolder", "", "100%", "100%");
   // KoolChart.create("pie2", "chartHolder2", "", "100%", "100%");

   // // Use a string variable for Layout.
   // var layoutStr =
   //    '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" >'
   //    + '<Options>'
   //    + '<Caption text="General Possible Motive"/>'
   //    + '<Legend useVisibleCheck="true"/>'
   //    + '</Options>'
   //    + '<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
   //    + '<Pie2DChart showDataTips="true" itemClickJsFunction="chartClickHanlder" showRotateEffect="true">'
   //    + '<series>'
   //    + '<Pie2DSeries nameField="browser" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
   //    + '<showDataEffect>'
   //    + '<SeriesSlide duration="1000"/>'
   //    + '</showDataEffect>'
   //    + '</Pie2DSeries>'
   //    + '</series>'
   //    + '</Pie2DChart>'
   //    + '</KoolChart>';

   // var layoutStr2 = '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" >'
   //    + '<Options>'
   //    + '<Caption text="Mental Health History"/>'
   //    + '<Legend useVisibleCheck="true"/>'
   //    + '</Options>'
   //    + '<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
   //    + '<Pie2DChart showDataTips="true">'
   //    + '<series>'
   //    + '<Pie2DSeries nameField="browser" field="share" labelPosition="inside" color="#ffffff" formatter="{numFmt}">'
   //    + '<showDataEffect>'
   //    + '<SeriesSlide duration="1000"/>'
   //    + '</showDataEffect>'
   //    + '</Pie2DSeries>'
   //    + '</series>'
   //    + '</Pie2DChart>'
   //    + '</KoolChart>';

   // // Use an array variable for Dataset.
   // var motivesList = [];
   // var pieData = data.forEach(row => {
   //    var generalMotive = row['Possible Motive - General'];
   //    if (motivesList.indexOf(generalMotive) === -1) {
   //       motivesList.push(generalMotive);
   //    }
   // });

   // // Use the KoolChart.calls function to register the functions to be executed when the chart is ready.
   // //
   // // argument 1 - Chart Identifier
   // // argument 2 - The function name to be executed (key) and the argument to be passed to the function (value)
   // KoolChart.calls("pie1", {
   //    "setLayout": layoutStr,
   //    "setData": pieData
   // });

   // function chartClickHanlder(seriesId, index, data, values) {
   //    window.setTimeout(function () {
   //       KoolChart.call("pie2", "setLayout", layoutStr2);
   //       KoolChart.call("pie2", "setData", history());
   //    }, 1000);
   // }

   // // Use an array variable for pie2.
   // var history = [];
   // var mentalIllness = data.forEach(row => {
   //    var pie2data = row['Possible Motive - General'];
   //    if (history.indexOf(mentalIllness) === -1) {
   //       history.push(mentalIllness);
   //    }
   // });

   // // ----------------------- The end of the configuration for creating dual pie chart. -----------------------

   // // -----------------------Start creating a word cloud chart-----------------------

   // // Create a chart.
   // // Parameters:
   // // 1. Chart Identifier (You can use any name you like.)
   // // 2. <div> Identifier (The <div> where the chart is created.)
   // // 3. Variables used for creating the chart (chartVars)
   // // 4. Chart Width (default: 100%)
   // // 5. Chart Height (default: 100%)
   // KoolChart.create("wordcloud", "wordcloud", "", "100%", "100%");

   // // Use a string variable for Layout.
   // var layoutStr =
   //    '<KoolChart backgroundColor="#FFFFFF" borderStyle="none" fontFamily="Noto Sans">'
   //    // The Google web fonts are used in this sample.
   //    /*
   //        Declares <WordCloudChart>
   //        showDataTips: Whether or not to show tooltips when the user mouse overs the item.
   //     */
   //    + '<WordCloudChart showDataTips="true" selectionMode="single">'
   //    + '<series>'
   //    /*
   //       Declares <WordCloudSeries>
   //     */
   //    + '<WordCloudSeries>'
   //    + '<showDataEffect>'
   //    + '<SeriesInterpolate duration="1000"/>'
   //    + '</showDataEffect>'
   //    + '<fills>'
   //    + '<SolidColor color="#5473b3"/>'
   //    + '<SolidColor color="#3fb1e7"/>'
   //    + '<SolidColor color="#27a6b5"/>'
   //    + '<SolidColor color="#86d3ed"/>'
   //    + '<SolidColor color="#404362"/>'
   //    + '</fills>'
   //    + '</WordCloudSeries>'
   //    + '</series>'
   //    + '</WordCloudChart>'
   //    + '</KoolChart>';

   // // Use an array variable for Dataset.
   // // The chart is represented based on how many times a word appears in the Dataset.
   // // The rendering speed will be decreased proportional to the number of data is increased.
   // var distinctMotives = [];
   // var chartData = data.forEach(row => {
   //    var motive = row['Possible Motive - Detailed'];
   //    if (distinctMotives.indexOf(motive) === -1) {
   //       distinctMotives.push(motive);
   //       console.log(distinctMotives);
   //    }
   // });

   // // Use the KoolChart.calls function to register the functions to be executed when the chart is ready.
   // //
   // // argument 1 - Chart Identifier
   // // argument 2 - The function name to be executed (key) and the argument to be passed to the function (value)
   // KoolChart.calls("wordcloud", {
   //    "setLayout": layoutStr,
   //    "setData": chartData
   // });

   // /**
   //  * If you want to use themes provided with KoolChart version 3.0 or later, call the following functions.
   //  * otherwise, comment out or delete the following functions.
   //  *
   //  * -- The Themes registered in KoolChart.themes --
   //  * - simple
   //  * - cyber
   //  * - modern
   //  * - lovely
   //  * - pastel
   //  * -------------------------------------------------
   //  *
   //  * The KoolChart.themes variable is defined in theme.js
   //  */
   // KoolChart.registerTheme(KoolChart.themes);

   // /**
   //  * The function called when the theme button in the sample HTML is clicked.
   //  * Parameter Values:
   //  * - simple
   //  * - cyber
   //  * - modern
   //  * - lovely
   //  * - pastel
   //  * - default
   //  *
   //  * default: Applies the default theme which is the basic design of KoolChart.
   //  */
   // function KoolChartChangeTheme(theme) {
   //    document.getElementById("wordcloud").setTheme(theme);
   // }

   //----------------------- The end of the configuration for creating world cloud chart. -----------------------

   // Wordcloud via High Charts:
   var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem.';
   var lines = text.split(/[,\. ]+/g),
   // var onlyMotives = data.map(datum => datum['Possible Motive - Detailed']);
   // var distinctMotives = Array.from(new Set(onlyMotives));
   // var lines = onlyMotives.split(/[,\. ]+/g),
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
         text: 'Wordcloud of Details'
      }
   });

});