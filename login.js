$(document).ready(function logincheck(){
    var userID = $('input[name=".id"]').val();
    var pwd = $('input[name=".pw"]').val();
    var saveIDCheck = $('checkbox:checked').val();

    // ID 기억하기 위해 localStorage 활용
    //아이디 저장 checkbox 선택한 상태로 로그인 버튼 클릭할 때, 
    //로그인 페이지 접속할 때 document.ready 시점에
    //localStorage.getItem("saveID")
    //값이 '', null, 'N' 중에 없을 시에만 id input 란에 값을 넣어주면 된다.
    if(saveIDCheck == 'on'){
        localStorage.setItem("saveID", userID);
    } else {
        localStorage.setItem("saveID", 'N');
    }

    var loginData = {"email":userID, "password":pw};

    $.ajax({
        type : "POST",                               
        url : "http://172.30.1.6:8000/account/signup/",                          
        contentType : 'application/json',            
        data : JSON.stringify(loginData),                 
        success : function(result){
            if(result == 401){
                alert("아이디와 비밀번호를 다시 확인 후 시도해 주세요.");
                return false;
            } else {
                window.location.href = 'index.html';
            }
        },                       
        error   : function(jqXHR, status, error){
            alert("알 수 없는 에러 [" + error + "]");
        }                   
    });
});






