

var massShooting = d3.csv("/js/Stanford_MSA_Database.csv", function (err, data) {
    //console.log(massShooting);

    var distinctMotives = [];
    var chartData = data.forEach(row => {
        var motive = row['Possible Motive - General'];
        if (distinctMotives.indexOf(motive) === -1) {
            distinctMotives.push(motive);
        }
    });
    anychart.onDocumentReady(function () {
        var data = distinctMotives;
        var testData = [];

        // A bunch of empty arrays to plug motives into
        var mentalIllness = [];
        var race = [];
        var expulsionSuspension = [];
        var socialDispute = [];
        var unknown = [];
        var multipleMotives = [];
        var robbery = [];
        var harrassment = [];
        var failure = [];
        var rejection = [];
        var terminatedDeniedReprimanded = [];
        var financialDispute = [];
        var politicalReligiousIdeals = [];
        var legalDispute = [];
        var domesticDispute = [];
        var drugUse = [];
        var drugUseFinancialDifficulties = [];
        var gender = [];
        var drugUseRobbery = [];
        var terminated = [];

        var wordMap = {};
        var wordArray = data.join().split(" ").forEach(function (word) {
            word = word.toLowerCase();

            if (!wordMap[word]) {
                wordMap[word] = 1
            }
            else {
                wordMap[word]++;
            }
            if (word == "mental illness") {
                word.push(mentalIllness);
            } else (word == "race"); {
                word.push(race);
            } else (word == "Expulsion/Suspension"); {
                word.push(expulsionSuspension);
            } else (word == "Social dispute"); {
                word.push(socialDispute);
            } else (word == "unknown"); {
                word.push(unknown);
            } else (word == "Multiple motives"); {
                word.push(multipleMotives);
            } else (word == "robbery"); {
                word.push(robbery);
            } else (word == "harrassment"); {
                word.push(harrassment);
            } else (word == "failure"); {
                word.push(failure);
            } else (word == "rejection"); {
                word.push(rejection);
            } else (word == "Terminated/Denied/Reprimanded"); {
                word.push(terminatedDeniedReprimanded);
            } else (word == "Financial dispute"); {
                word.push(financialDispute);
            } else (word == "Political/Religious ideals"); {
                word.push(politicalReligiousIdeals);
            } else (word == "legal dispute"); {
                word.push(legalDispute);
            } else (word == "domestic dispute"); {
                word.push(domesticDispute);
            } else (word == "drug use"); {
                word.push(drugUse);
            } else (word == "Drug use/Financial difficulties"); {
                word.push(drugUseFinancialDifficulties);
            } else (word == "gender"); {
                word.push(gender);
            } else (word == "Drug use, Robbery"); {
                word.push(drugUseRobbery);
            } else (word == "terminated"); {
                word.push(terminated)
            }
        });

        console.log(wordMap)


        var template = {
            "x": "",
            "value": [],
            "category": "testCategory"
        }

        // var value = data.forEach(reason => {
        //     if ()
        // });

        data.forEach(function (value) {

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