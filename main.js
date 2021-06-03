var arrCount = new Array(12);

for(var i=0;i<12;i++){
    arrCount[i] = new Object();
    if(i<4){arrCount[i].hour=20+i;}
    else{arrCount[i].hour=i-4;}
    arrCount[i].numAcc=0;
    arrCount[i].numSound=0;
}

//ajax로 GET해서 값 가져와서 저장하기
$.ajax({
    url: "http://127.0.0.1:8000/network/count/",
    type: "GET",
    datatype: "json",
    success: function(response){
        var acc = response.acc;
        var cutTime;
        var curTime;
        for(var i=0; i<acc.length;i++){
            curTime=acc.sleeptime.getHours();
            cutTime=("0"+acc.cutTime).slice(-2);
            switch(cutTime){
                case 20:
                    arrCount[0].numAcc+acc.count;
                    break;
                case 21:
                    arrCount[1].numAcc+acc.count;
                    break;
                case 22:
                    arrCount[2].numAcc+acc.count;;
                    break;
                case 23:
                    arrCount[3].numAcc+acc.count;
                    break;
                case 00:
                    arrCount[4].numAcc+acc.count;
                    break;
                case 01:
                    arrCount[5].numAcc+acc.count;
                    break;
                case 02:
                    arrCount[6].numAcc+acc.count;
                    break;
                case 03:
                    arrCount[7].numAcc+acc.count;
                    break;
                case 04:
                    arrCount[8].numAcc+acc.count;
                    break;
                case 05:
                    arrCount[9].numAcc+acc.count;
                    break;
                case 06:
                    arrCount[10].numAcc+acc.count;
                    break;
                case 07:
                    arrCount[11].numAcc+acc.count;
                    break;
                case 08:
                    arrCount[12].numAcc+acc.count;
                    break;
                }
        }

        var sound = response.sound;
        for(var i=0; i<sound.length;i++){
            cutTime=("0"+sound.sleeptime.getHours()).slice(-2);
            switch(cutTime){
                case 20:
                    arrCount[0].numSound+sound.count;
                    break;
                case 21:
                    arrCount[1].numSound+sound.count;
                    break;
                case 22:
                    arrCount[2].numSound+sound.count;
                    break;
                case 23:
                    arrCount[3].numSound+sound.count;
                    break;
                case 00:
                    arrCount[4].numSound+sound.count;
                    break;
                case 01:
                    arrCount[5].numSound+sound.count;
                    break;
                case 02:
                    arrCount[6].numSound+sound.count;
                    break;
                case 03:
                    arrCount[7].numSound+sound.count;
                    break;
                case 04:
                    arrCount[8].numSound+sound.count;
                    break;
                case 05:
                    arrCount[9].numSound+sound.count;
                    break;
                case 06:
                    arrCount[10].numSound+sound.count;
                    break;
                case 07:
                    arrCount[11].numSound+sound.count;
                    break;
                case 08:
                    arrCount[12].numSound+sound.count;
                    break;
                }
        }
    },
    error: function(jqXHR, textStatus, errorThrown){
        for(var i=0;i<13;i++){
            arrCount[i].numAcc = i;
            arrCount[i].numSound = i+1;
        }

        $(document).ready(function() {
            $('.name').html('안신영');
            $('.birth').html('1998.06.05');
        });
    },
    async: false
});




//구글차트 그리기
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
    var data = new google.visualization.arrayToDataTable([
        ['시간', '뒤척임', '코골이'],
        [arrCount[0].hour, arrCount[0].numAcc, arrCount[0].numSound],
        [arrCount[1].hour, arrCount[1].numAcc, arrCount[1].numSound],
        [arrCount[2].hour, arrCount[2].numAcc, arrCount[2].numSound],
        [arrCount[3].hour, arrCount[3].numAcc, arrCount[3].numSound],
        [arrCount[4].hour, arrCount[4].numAcc, arrCount[4].numSound],
        [arrCount[5].hour, arrCount[5].numAcc, arrCount[5].numSound],
        [arrCount[6].hour, arrCount[6].numAcc, arrCount[6].numSound],
        [arrCount[7].hour, arrCount[7].numAcc, arrCount[7].numSound],
        [arrCount[8].hour, arrCount[8].numAcc, arrCount[8].numSound],
        [arrCount[9].hour, arrCount[9].numAcc, arrCount[9].numSound],
        [arrCount[10].hour, arrCount[10].numAcc, arrCount[10].numSound],
        [arrCount[11].hour, arrCount[11].numAcc, arrCount[11].numSound],
        [arrCount[12].hour, arrCount[12].numAcc, arrCount[12].numSound],
    ]);

    var options = {
        title: 'tonight',
        curveType: 'function',
        colors: ['#FA9F45', '#6DB0F8'],
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


function getChart(){
    google.charts.load("current", {package: ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
}

// google.charts.load('current', {packages: ['corechart', 'line']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//     $.support.cors = true;
//     $.ajax({
//         url:"http://127.0.0.1:8000/network/count/", //차트 API
//         type: "GET",
//         datatype:"json",
//         crossOrighin: true,
//         success: function(response){
//             if(response["result"] == "success"){
//                 var history = response['history'];

//                 //차트 시작시간 20시로 설정
//                 var chartTime = 20;

//                 //오늘기록 객체 생성자 함수(time,acc,sound)
//                 function ArrDay(time, acc, sound){
//                     this.time = time;
//                     this.acc = acc;
//                     this.sound = sound;
//                 }

//                 //객체 저장할 배열 선언, 배열안에 객체 넣고 시간 넣어두기
//                 var arrDay = [];
//                 for(var i=0;i<12;i++){
//                     if(chartTime==24){ chartTime==0; }
//                     arrDay[i] = new ArrDay(chartTime, 0, 0);
//                     chartTime++;
//                 }

//                 chartTime=20; 
//                 for(var i=0;i<history.acc.length;i++){
//                     //json 배열에서 가져온 뒤척임 시간 2자리(00-23)로 표현
//                     //var curA = new Date(history.acc[i].sleeptime);
//                     var curA = history.acc[i].sleeptime;
//                     var cutA = ("0"+curA.getHours()).slice(-2);//가공된시간

//                     if(chartTime==cutA){
//                         if(cutA<24){ arrDay[cutA-20].acc++; }
//                         else{ arrDay[cutA+4].acc++; }
//                     } 
//                 }

//                 chartTime=20;
//                 for(var i=0;i<history.sound.length;i++){
//                     //json 배열에서 가져온 코골이 시간 2자리(00-23)로 표현
//                     //var curS = new Date(history.sound[i].sleeptime);
//                     var curS = history.sound[i].sleeptime;
//                     var cutS = ("0"+curS.getHours()).slice(-2);//가공된시간

//                     if(chartTime==cutS){
//                         if((cutS >= 20)&&(cutS<24)){ arrDay[cutS-20].sound++; }
//                         else{ arrDay[cutS+4].sound++; }
//                     } 
//                 }

//                 // 구글차트 데이터테이블에 넣기
//                 var data = new google.visualization.arrayToDataTable([
//                      ['시간', '뒤척임', '코골이'],
//                      [arrDay[0].time, arrDay[0].acc, arrDay[0].sound], 
//                      [arrDay[1].time, arrDay[1].acc, arrDay[1].sound], 
//                      [arrDay[2].time, arrDay[2].acc, arrDay[2].sound], 
//                      [arrDay[3].time, arrDay[3].acc, arrDay[3].sound], 
//                      [arrDay[4].time, arrDay[4].acc, arrDay[4].sound], 
//                      [arrDay[5].time, arrDay[5].acc, arrDay[5].sound], 
//                      [arrDay[6].time, arrDay[6].acc, arrDay[6].sound], 
//                      [arrDay[7].time, arrDay[7].acc, arrDay[7].sound], 
//                      [arrDay[8].time, arrDay[8].acc, arrDay[8].sound], 
//                      [arrDay[9].time, arrDay[9].acc, arrDay[9].sound], 
//                      [arrDay[10].time, arrDay[10].acc, arrDay[10].sound], 
//                      [arrDay[11].time, arrDay[11].acc, arrDay[11].sound], 
//                      [arrDay[12].time, arrDay[12].acc, arrDay[12].sound]
//                  ]);

//                  var options = {
//                     title: 'tonight',
//                     curveType: 'function',
//                     hAxis: {
//                        title: 'day',
//                    },
//                     //뒤척임, 코골이
//                     colors: ['#FA9F45', '#6DB0F8'],
                    
//                     //차트 크기 설정
//                     width: 900,
//                     height: 500
//                 };
                
//                  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//                  chart.draw(data, options);
//             }
//         },
//         error:function(request,status,error){
//             var data = new google.visualization.arrayToDataTable([
//                 ['시간', '뒤척임', '코골이'],
//                 ['8PM', 1, 3], 
//                 ['9PM', 1, 3],
//                 ['10PM', 1, 3], 
//                 ['11PM', 1, 3], 
//                 ['12AM', 1, 2], 
//                 ['1AM', 1, 2], 
//                 ['2AM', 1, 2],
//                 ['3AM', 1, 2],
//                 ['4AM', 1, 2],
//                 ['5AM', 1, 2],
//                 ['6AM', 1, 2],
//                 ['7AM', 1, 2],
//                 ['8AM', 1, 2]
//             ]);

//             var options = {
//                 title: 'tonight',
//                 curveType: 'function',
//                 //뒤척임, 코골이
//                 colors: ['#FA9F45', '#6DB0F8'],
                
//                 //차트 크기 설정
//                 width: 1600,
//                 height: 450
//             };
           
//             var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//             chart.draw(data, options);
//         }
//     });
// }

// function getChart(){
//     google.charts.load("current", {package: ["corechart"]});
//     google.charts.setOnLoadCallback(drawChart);
// }

$.ajax({
    async: false,
    url: "http://127.0.0.1:8000/account/signin/",
    type: "POST",
    datatype: "json",
    data: {
            "email": "abcd@gmail.com",
            "password": "1234"
           },
    success: function(response){
        var nickname = response.nickname;
        var birth_date = response.birth_date;
        $(document).ready(function() {
            $('.name').html(nickname);
            $('.birth').html(birth_date);
        });
    },
    error: function(jqXHR, textStatus, errorThrown){
        $(document).ready(function() {
            $('.name').html('안신영');
            $('.birth').html('1998.06.05');
        });
    }
});


$.ajax({
    async: false,
    url: "",
    type: "GET",
    datatype: "json",
    success: function(response){
        var score = response.score;
        $(document).ready(function() {
            $('.score_div').html(score+"점");
        });
    },
    error: function(jqXHR, textStatus, errorThrown){
        var score = 0;
        $(document).ready(function() {
            $('.score_div').html(score+"점");
        });
    }
});

