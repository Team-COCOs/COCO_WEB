//구글차트 그리기
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

var arrCount = new Array(12);

for(var i=0;i<13;i++){
    arrCount[i] = new Object();
    if(i<4){arrCount[i].hour=20+i;}
    else{arrCount[i].hour=i-4;}
    arrCount[i].numAcc=0;
    arrCount[i].numSound=0;
}

$(document).ready(function(){
    //ajax로 GET해서 값 가져와서 저장하기
    $.ajax({
        url: "http://127.0.0.1:8000/network/count/",
        type: "GET",
        datatype: "json",
        success: function(response){
            var acc = response.acc;
            var curTime;
            var cutTime;
            for(var i=0; i<acc.length;i++){
                curTime = acc[i].sleeptime;
                cutTime=curTime.substring(12,14);
                switch(cutTime){
                    case 20:
                        arrCount[0].numAcc+=acc[i].count;
                        break;
                    case 21:
                        arrCount[1].numAcc+=acc[i].count;
                        break;
                    case 22:
                        arrCount[2].numAcc+=acc[i].count;;
                        break;
                    case 23:
                        arrCount[3].numAcc+=acc[i].count;
                        break;
                    case 00:
                        arrCount[4].numAcc+=acc[i].count;
                        break;
                    case 01:
                        arrCount[5].numAcc+=acc[i].count;
                        break;
                    case 02:
                        arrCount[6].numAcc+=acc[i].count;
                        break;
                    case 03:
                        arrCount[7].numAcc+=acc[i].count;
                        break;
                    case 04:
                        arrCount[8].numAcc+=acc[i].count;
                        break;
                    case 05:
                        arrCount[9].numAcc+=acc[i].count;
                        break;
                    case 06:
                        arrCount[10].numAcc+=acc[i].count;
                        break;
                    case 07:
                        arrCount[11].numAcc+=acc[i].count;
                        break;
                    case 08:
                        arrCount[12].numAcc+=acc[i].count;
                        break;
                    }
            }

            var sound = response.sound;
            for(var i=0; i<sound.length;i++){
                curTime = sound[i].sleeptime;
                cutTime=curTime.substring(12,14);
                console.log(cutTime);
//                 switch(cutTime){
//                     case 20:
//                         arrCount[0].numSound+=sound[i].count;
//                         break;
//                     case 21:
//                         arrCount[1].numSound+=sound[i].count;
//                         break;
//                     case 22:
//                         arrCount[2].numSound+=sound[i].count;
//                         break;
//                     case 23:
//                         arrCount[3].numSound+=sound[i].count;
//                         break;
//                     case 00:
//                         arrCount[4].numSound+=sound[i].count;
//                         break;
//                     case 01:
//                         arrCount[5].numSound+=sound[i].count;
//                         break;
//                     case 02:
//                         arrCount[6].numSound+=sound[i].count;
//                         break;
//                     case 03:
//                         arrCount[7].numSound+=sound[i].count;
//                         break;
//                     case 04:
//                         arrCount[8].numSound+=sound[i].count;
//                         break;
//                     case 05:
//                         arrCount[9].numSound+=sound[i].count;
//                         break;
//                     case 06:
//                         arrCount[10].numSound+=sound[i].count;
//                         break;
//                     case 07:
//                         arrCount[11].numSound+=sound[i].count;
//                         break;
//                     case 08:
//                         arrCount[12].numSound+=sound[i].count;
//                         break;
//                     }
                if(cutTime=='20'){
                    arrCount[0].numSound+=sound[i].count;
                }else if(cutTime=='21'){
                    arrCount[1].numSound+=sound[i].count;
                }else if(cutTime=='22'){
                    arrCount[2].numSound+=sound[i].count;
                }else if(cutTime=='23'){
                    arrCount[3].numSound+=sound[i].count;
                }else if(cutTime=='00'){
                    arrCount[4].numSound+=sound[i].count;
                }else if(cutTime=='01'){
                    arrCount[5].numSound+=sound[i].count;
                }else if(cutTime=='02'){
                    arrCount[6].numSound+=sound[i].count;
                }else if(cutTime=='03'){
                    arrCount[7].numSound+=sound[i].count;
                }else if(cutTime=='04'){
                    arrCount[8].numSound+=sound[i].count;
                }else if(cutTime=='05'){
                    arrCount[9].numSound+=sound[i].count;
                }else if(cutTime=='06'){
                    arrCount[10].numSound+=sound[i].count;
                }else if(cutTime=='07'){
                    arrCount[11].numSound+=sound[i].count;
                }else if(cutTime=='08'){
                    arrCount[12].numSound+=sound[i].count;
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            for(var i=0;i<13;i++){
                arrCount[i].numAcc = i;
                arrCount[i].numSound = i+1;
            }
        },
        async: false
    })
});

function drawChart(){
    var data = new google.visualization.arrayToDataTable([
        ['시간', '뒤척임', '코골이'],
        [String(arrCount[0].hour), arrCount[0].numAcc, arrCount[0].numSound],
        [String(arrCount[1].hour), arrCount[1].numAcc, arrCount[1].numSound],
        [String(arrCount[2].hour), arrCount[2].numAcc, arrCount[2].numSound],
        [String(arrCount[3].hour), arrCount[3].numAcc, arrCount[3].numSound],
        [String(arrCount[4].hour), arrCount[4].numAcc, arrCount[4].numSound],
        [String(arrCount[5].hour), arrCount[5].numAcc, arrCount[5].numSound],
        [String(arrCount[6].hour), arrCount[6].numAcc, arrCount[6].numSound],
        [String(arrCount[7].hour), arrCount[7].numAcc, arrCount[7].numSound],
        [String(arrCount[8].hour), arrCount[8].numAcc, arrCount[8].numSound],
        [String(arrCount[9].hour), arrCount[9].numAcc, arrCount[9].numSound],
        [String(arrCount[10].hour), arrCount[10].numAcc, arrCount[10].numSound],
        [String(arrCount[11].hour), arrCount[11].numAcc, arrCount[11].numSound],
        [String(arrCount[12].hour), arrCount[12].numAcc, arrCount[12].numSound],
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
