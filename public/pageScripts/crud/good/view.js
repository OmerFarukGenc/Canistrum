
$(document).ready(function () {
    $("#back-to-list").click(
        function(event){
            window.location = "/crud/good"
        }
    )

});


function del(id){
    console.log(id);
    $.ajax({
        url: '/api/crud/good/' + id,
        type: 'delete',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            
        },
        data: {}
    });  
    window.location = "/crud/good";
}
