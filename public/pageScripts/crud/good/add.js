

$(document).ready(function () {
    $("#back-to-list").click(
        function(event){
            window.location = "/crud/good"
        }
    )

    $("#add-form").submit(
        function (event) {
            event.preventDefault();
            var name = event.target.name.value;
            var oldPrice = event.target.oldPrice.value;
            var newPrice = event.target.newPrice.value;
            var data = JSON.stringify({ "name": name, "oldPrice": oldPrice, "newPrice": newPrice });
            console.log(data);
            /*$.post("/api/crud/good",data ,
                function (event) {
                    console.log(event);
                }
                , "json")
*/

                $.ajax({
                    url: '/api/crud/good',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        console.log(data);
                        
                    },
                    data: data
                });
                window.location = "/crud/good";    
        }

    )



});
