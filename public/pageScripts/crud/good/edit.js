
$(document).ready(function () {
    $("#back-to-list").click(
        function(event){
            window.location = "/crud/good"
        }
    )

    $("#edit-form").submit(
        function (event) {
            event.preventDefault();
            var ID = event.target.id.value;
            var name = event.target.name.value;
            var oldPrice = event.target.oldPrice.value;
            var newPrice = event.target.newPrice.value;
            var data = JSON.stringify({ "name": name, "oldPrice": oldPrice, "newPrice": newPrice });
            console.log(data);
 

            $.ajax({
                    url: '/api/crud/good/' + ID,
                    type: 'put',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        console.log(data);
                    },
                    data: data
            }); 
            window.location = "/crud/good/" + ID;   
        }

    )



});
