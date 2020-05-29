var socket = io("https://crawlerweb2020.herokuapp.com/");


$(document).ready(function(){
        $("#getdata").click(function(){
                socket.emit("user-request-data")
        })
})

socket.on("res-data",function(data){
    console.log(data)
        $("#data").html("");
        data.forEach(e => {
                $("#data").append(
                        `<div class='user'>
                        { <br> 
                                Tên bài: ${e.tit}<br>                        
                                link: <a href='${e.link}' target="_blank">${e.link}<a><br>
                        }
                        </div>`
                );
        });
        $("#thongbao").append(
        `<div>load được: ${data.length} bài</div>`
        )
})