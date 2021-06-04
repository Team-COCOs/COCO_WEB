//구글차트 그리기
google.charts.load('current', {packages: ['bar']});
google.charts.setOnLoadCallback(drawChartA);
google.charts.setOnLoadCallback(drawChartS);

var countA = new Array(13);
var countS = new Array(13);

//배열 초기화
for(var i=0;i<13;i++){
    countA[i] = new Object();
    countS[i] = new Object();

    if(i<4){
        countA[i].hour=20+i;
        countS[i].hour=20+i;
    }
    else{
        countA[i].hour=i-4;
        countS[i].hour=i-4;
    }
    countA[i].count=0;
    countS[i].count=0;
}

$(document).ready(function(){
    //뒤척임 횟수 GET
    $.ajax({
        url: "http://127.0.0.1:8000/network/acc/count/",
        type: "GET",
        datatype: "json",
        success: function(response){
            var acc = response;
            var curTime; var cutTime;
            for(var i=0; i<acc.length;i++){
                curTime = acc[i].sleeptime;
                cutTime = curTime.substring(11, 13);
                if(cutTime=='20'){
                    countA[0].count+=acc[i].count;
                }else if(cutTime=='21'){
                    countA[1].count+=acc[i].count;
                }else if(cutTime=='22'){
                    countA[2].count+=acc[i].count;
                }else if(cutTime=='23'){
                    countA[3].count+=acc[i].count;
                }else if(cutTime=='00'){
                    countA[4].count+=acc[i].count;
                }else if(cutTime=='01'){
                    countA[5].count+=acc[i].count;
                }else if(cutTime=='02'){
                    countA[6].count+=acc[i].count;
                }else if(cutTime=='03'){
                    countA[7].count+=acc[i].count;
                }else if(cutTime=='04'){
                    countA[8].count+=acc[i].count;
                }else if(cutTime=='05'){
                    countA[9].count+=acc[i].count;
                }else if(cutTime=='06'){
                    countA[10].count+=acc[i].count;
                }else if(cutTime=='07'){
                    countA[11].count+=acc[i].count;
                }else if(cutTime=='08'){
                    countA[12].count+=acc[i].count;
                }
                console.log("acc ok");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            for(var i=0;i<13;i++){
                countA[i].count = i;
            }
        },
        async: false
    });
    //코골이 횟수 GET
    $.ajax({
        url: "http://127.0.0.1:8000/network/sound/count/",
        type: "GET",
        datatype: "json",
        success: function(response){
            var sound = response;
            var curTime; var cutTime;
            for(var i=0; i<sound.length;i++){
                curTime = sound[i].sleeptime;
                cutTime = curTime.substring(11, 13);
                if(cutTime=='20'){
                    countS[0].count+=sound[i].count;
                }else if(cutTime=='21'){
                    countS[1].count+=sound[i].count;
                }else if(cutTime=='22'){
                    countS[2].count+=sound[i].count;
                }else if(cutTime=='23'){
                    countS[3].count+=sound[i].count;
                }else if(cutTime=='00'){
                    countS[4].count+=sound[i].count;
                }else if(cutTime=='01'){
                    countS[5].count+=sound[i].count;
                }else if(cutTime=='02'){
                    countS[6].count+=sound[i].count;
                }else if(cutTime=='03'){
                    countS[7].count+=sound[i].count;
                }else if(cutTime=='04'){
                    countS[8].count+=sound[i].count;
                }else if(cutTime=='05'){
                    countS[9].count+=sound[i].count;
                }else if(cutTime=='06'){
                    countS[10].count+=sound[i].count;
                }else if(cutTime=='07'){
                    countS[11].count+=sound[i].count;
                }else if(cutTime=='08'){
                    countS[12].count+=sound[i].count;
                }
                console.log("snd ok");
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            for(var i=0;i<13;i++){
                countS[i].count = i;
            }
        },
        async: false
    });
});

function drawChartA(){
    var data1 = new google.visualization.arrayToDataTable([
        ['hour', 'count'],
        [String(countA[0].hour), countA[0].count],
        [String(countA[1].hour), countA[1].count],
        [String(countA[2].hour), countA[2].count],
        [String(countA[3].hour), countA[3].count],
        [String(countA[4].hour), countA[4].count],
        [String(countA[5].hour), countA[5].count],
        [String(countA[6].hour), countA[6].count],
        [String(countA[7].hour), countA[7].count],
        [String(countA[8].hour), countA[8].count],
        [String(countA[9].hour), countA[9].count],
        [String(countA[10].hour), countA[10].count],
        [String(countA[11].hour), countA[11].count],
        [String(countA[12].hour), countA[12].count]
    ]);

    var options1 = {
        title: '뒤척임',
        colors: '#FA9F45'
    };

    var chart = new google.charts.Bar(document.getElementById('acG'));
    chart.draw(data1, google.charts.Bar.convertOptions(options2));
}

function drawChartS(){
    var data2 = new google.visualization.arrayToDataTable([
        ['hour', 'count'],
        [String(countS[0].hour), countS[0].count],
        [String(countS[1].hour), countS[1].count],
        [String(countS[2].hour), countS[2].count],
        [String(countS[3].hour), countS[3].count],
        [String(countS[4].hour), countS[4].count],
        [String(countS[5].hour), countS[5].count],
        [String(countS[6].hour), countS[6].count],
        [String(countS[7].hour), countS[7].count],
        [String(countS[8].hour), countS[8].count],
        [String(countS[9].hour), countS[9].count],
        [String(countS[10].hour), countS[10].count],
        [String(countS[11].hour), countS[11].count],
        [String(countS[12].hour), countS[12].count]
    ]);

    var options2 = {
        title: '코골이',
        colors: '#6DB0F8'
    };

    var chart = new google.charts.Bar(document.getElementById('sdG'));
    chart.draw(data2, google.charts.Bar.convertOptions(options2));
}


//수면점수
$.ajax({
    url: "http://127.0.0.1:8000/network/score/",
    type: "GET",
    datatype: "json",
    success: function(response){
        var score = response.score;
        $(document).ready(function() {
            $('.score').html(score+"점");
        });
    },
    error: function(jqXHR, textStatus, errorThrown){
        var score=0;
        $(document).ready(function() {
            $('.score').html(score+"점");
        });
    }
});
