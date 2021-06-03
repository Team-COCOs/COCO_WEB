
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