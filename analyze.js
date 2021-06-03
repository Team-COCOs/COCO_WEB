google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.ajax({
        url:"http://127.0.0.1:8000/network/sound/count/", //코골이차트 API
        type: "GET",
        datatype:"json",
        success: function(response){
            if(response["result"] == "success"){
                var history = response['history'];

                //차트 시작시간 20시로 설정
                var chartTime = 20;

                //오늘기록 객체 생성자 함수(time,count)
                function ArrDay(time, count){
                    this.time = time;
                    this.count = count;
                }

                //객체 저장할 배열 선언, 배열안에 객체 넣고 시간 넣어두기
                var arrDay = [];
                for(var i=0;i<12;i++){
                    if(chartTime==24){ chartTime==0; }
                    arrDay[i] = new ArrDay(chartTime, 0);
                    chartTime++;
                }

                chartTime=20; 
                for(var i=0;i<history.length;i++){
                    //json 배열에서 가져온 뒤척임 시간 2자리(00-23)로 표현
                    var count = new Date(history[i].sleeptime);
                    var cutA = ("0"+curA.getHours()).slice(-2);//가공된시간

                    if(chartTime==cutA){
                        if(cutA<24){ arrDay[cutA-20].acc++; }
                        else{ arrDay[cutA+4].acc++; }
                    } 
                }

                // 구글차트 데이터테이블에 넣기
                var data = new google.visualization.arrayToDataTable([
                     ['시간', '뒤척임', '코골이'],
                     [arrDay[0].time, arrDay[0].acc], 
                     [arrDay[1].time, arrDay[1].acc], 
                     [arrDay[2].time, arrDay[2].acc], 
                     [arrDay[3].time, arrDay[3].acc], 
                     [arrDay[4].time, arrDay[4].acc], 
                     [arrDay[5].time, arrDay[5].acc], 
                     [arrDay[6].time, arrDay[6].acc], 
                     [arrDay[7].time, arrDay[7].acc], 
                     [arrDay[8].time, arrDay[8].acc], 
                     [arrDay[9].time, arrDay[9].acc], 
                     [arrDay[10].time, arrDay[10].acc], 
                     [arrDay[11].time, arrDay[11].acc], 
                     [arrDay[12].time, arrDay[12].acc]
                 ]);

                 var options = {
                    title: 'tonight',
                    curveType: 'function',
                    hAxis: {
                       title: 'day',
                   },
                    //뒤척임, 코골이
                    colors: '#FA9F45',
                    
                    //차트 크기 설정
                    width: 900,
                    height: 500
                };
                
                var obj = document.getElementById('.acG');
                var chart = new google.visualization.ColumnChart(obj);
                chart.draw(data, options);
            }
        },
        error:function(error){
            var data = new google.visualization.arrayToDataTable([
                ['시간', '뒤척임'],
                ['8PM', 1], 
                ['9PM', 1],
                ['10PM', 3], 
                ['11PM', 3], 
                ['12AM', 2], 
                ['1AM', 2], 
                ['2AM', 1],
                ['3AM', 2],
                ['4AM', 2],
                ['5AM', 1],
                ['6AM', 1],
                ['7AM', 1],
                ['8AM', 2]
            ]);

            var options = {
                title: 'tonight',
                curveType: 'function',
                //뒤척임, 코골이
                colors: ['#FA9F45', '#6DB0F8'],
                
                //차트 크기 설정
                width: 500,
                height: 500
            };
           
            var obj = document.getElementById('.acG');
            var chart = new google.visualization.ColumnChart(obj);
            chart.draw(data, options);
        }
    });
}

function getChart(){
    google.charts.load("current", {package: ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
}

$.ajax({
    async: false,
    url: "http://127.0.0.1:8000/account/signup/",
    type: "GET",
    datatype: "json",
    success: function(response){
        var str1=""; var str2="";
        str1 += response.nickname;
        str2 += response.birth_date;
        
        $(document).ready(function() {
            $('.name').html(str1);
            $('.birth').html(str2);
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
        //response.score에서 score은 API 형태 보고 변경 필요
        var score = response.score;
        
        $(document).ready(function() {
            $('.score').html(score+"점");

            if(score<40){
                $('.comment').html("괜찮으세요? 솔루션이 시급해요.");
            } else if((score>=40)&&(score<60)){
                $('.comment').html("솔루션이 필요해보여요.");
            } else if((score>=60)&&(score<80)){
                $('.comment').html("조금만 더 노력해볼까요?");
            } else if((score>=80)&&(score<100)){
                $('.comment').html("잘하고 있어요!");
            } else if(score==100){
                $('.comment').html("완벽합니다! 잘 하고 있어요~");
            }
        });
    },
    error: function(jqXHR, textStatus, errorThrown){
        var score = 100;
        $(document).ready(function() {
            $('.score').html(score+"점");

            if(score<40){
                $('.comment').html("괜찮으세요? 솔루션이 시급해요.");
            } else if((score>=40)&&(score<60)){
                $('.comment').html("솔루션이 필요해보여요.");
            } else if((score>=60)&&(score<80)){
                $('.comment').html("조금만 더 노력해볼까요?");
            } else if((score>=80)&&(score<100)){
                $('.comment').html("잘하고 있어요!");
            } else if(score==100){
                $('.comment').html("완벽합니다! 잘 하고 있어요~");
            }
        });
    }
});