var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");


var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen( process.env.PORT || 4321);

var request = require("request");
var cheerio = require("cheerio");

var mangdl =[]

app.get("/",function(req,res){
        res.render("trangchu")
        io.on("connection",function(socket){
                console.log("Startus: OK")
                socket.on("user-request-data", function(){
                        request("https://cafebiz.vn", function(err,response,body){
                                if (err){
                                        console.log(err)
                                } else{
                                        $ = cheerio.load(body);
                                        var ds = $(body).find("a.show-popup");
                                        //console.log(ds)
                                        ds.each(function(i,e){
                                                //console.log(e["attribs"])
                                                mangdl.push({tit: e["attribs"]["title"], link :"https:cafebiz.vn"+e["attribs"]["href"]})
                                        })
                                        socket.emit("res-data",mangdl)
                                }
                        }) 
                })
        })
      
})
