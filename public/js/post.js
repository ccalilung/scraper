$(function () {
    $(".aButton").on("click", function() {
        let id = $(this).attr("id")
        $.ajax("/articles/" + id, {
            type: "GET"
        }).then(function (data) {
            location.replace("/articles/" + id)
        })
    })

    



})



