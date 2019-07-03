var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Number of Mass Shootings',
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        },
        {
            label: '# with Mental Health Motive',
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [0, 20, 9, 15, 12, 15, 30]
        }]
    },

    // Configuration options go here
    options: {}
});
// var data = {
//     labels: ["January", "February", "March"],
//     datasets: [
//         {
//             label: "My First Dataset",
//             // fill: false,
//             // lineTension: 0.1,
//             // backgroundColor: "rgba(75, 192, 192, 0.4)",
//             // borderColor: "rgba(75, 192, 192, 1)",
//             // borderCapStyle: "butt",
//             // borderDash: [],
//             // borderDashOffset: 0.0,
//             // borderJoinStyle: "miter",
//             // pointBorderColor: "rgba(75, 192, 192, 1)",
//             // pointBackgroundColor: "#fff",
//             // pointBorderWidth: 1,
//             // pointHoverRadius: 5,
//             // pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
//             // pointHoverBorderColor: "rgba(75, 192, 192, 1)",
//             // pointHoverBorderWidth: 2,
//             // pointHitRadius: 10,
//             data: [65, 59, 80]
//         }
//     ]
//     }