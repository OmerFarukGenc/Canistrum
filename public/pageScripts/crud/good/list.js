$(document).ready(
    function () {
        $("#create-new").click(
            function(event){
                window.location = "/crud/good/add"
            }
        )
    }
)

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
    history.go();
}