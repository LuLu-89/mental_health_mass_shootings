

var massShooting = d3.csv("/js/Stanford_MSA_Database.csv", function (err, data) {
    //console.log(massShooting);

    var distinctMotives = [];
    var chartData = data.forEach(row => {
     var motive = row ['Possible Motive - General'];
     if(distinctMotives.indexOf(motive)===-1){
         distinctMotives.push(motive);
     }
 });
    anychart.onDocumentReady(function () {
        var data = distinctMotives;
        var testData = [];

        var wordMap = {};
        var wordArray = data.join().split(" ").forEach(function(word) {
            word = word.toLowerCase();
    
            if(!wordMap[word]) {
                wordMap[word] = 1
            }
            else {
                wordMap[word]++;
            }
        })
        
        console.log(wordMap)
        

        var template = {
            "x": "",
            "value": [],
            "category": "testCategory"
        }

        // var value = data.forEach(reason => {
        //     if ()
        // });

        data.forEach(function(value) {
            
            template.x = value;
            testData.push(template)
            template = {
                "x": "",
                "value": 0,
                "category": "testCategory"
            }
        })
        //console.log("=====   ", testData)

        // create a tag (word) cloud chart
        var chart = anychart.tagCloud(testData);

        // set a chart title
        chart.title('Motives')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        // enable a color range
        chart.colorRange(true);
        // set the color range length
        chart.colorRange().length('80%');

        // display the word cloud chart
        chart.container("container");
        chart.draw();
    });
});