$(function () {
    $(".aButton").on("click", function() {
        let id = $(this).attr("id")
        $.ajax("/articles/" + id, {
            type: "GET"
        }).then(function (data) {
            location.replace("/articles/" + id)
        })
    })

    $(".bButton").on("click", function() {
        event.preventDefault()
        let id = $(".theID").attr("value")
        let postInfo = {
            title: $("#postTitle").val().trim(),
            body: $("#theContent").val().trim()}
            // console.log(postInfo)
        $.ajax("/api/post/" + id, {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            location.replace("/articles/" + id)
        })
    })

    $(".deletePost").on("click", function() {
        // event.preventDefault()
        let id = $(".theID").attr("value")
        console.log(id)
        $.ajax("/api/deletepost/" + id, {
            type: "DELETE",
            
        }).then(function (data) {
            location.replace("/articles/" + id)
        })
    })

    $(".sButton").on("click", function() {
        event.preventDefault()
        let id = $(this).attr("value")
        console.log(id)
        let postInfo = {
            saved: "true"}
        $.ajax("/api/save/" + id, {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            location.replace("/savedarticles/")
        })
    })

    $(".dButton").on("click", function() {
        event.preventDefault()
        let id = $(this).attr("value")
        console.log(id)
        let postInfo = {
            saved: "false"}
        $.ajax("/api/save/" + id, {
            type: "POST",
            data: postInfo
        }).then(function (data) {
            location.replace("/savedarticles/")
        })
    })


    



})



