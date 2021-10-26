const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
     
console.log("hiihih")
    // res.send("Server is up and running.");
})
app.post("/",function(req,res){
 
    
const query=req.body.cityName;
https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=593c5974a29a1705f657fc6b26f4bc83",function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
      const wetherdata=JSON.parse(data);
      console.log(wetherdata)
      console.log(wetherdata.main.temp);
      console.log(wetherdata.main.feels_like);
      res.write("<h1>the temp in london is"+wetherdata.main.temp+ "degree </h2>");
      const icon=wetherdata.weather[0].icon
      const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<img src="+imgurl+">")
      res.send();
 
})

})
})

app.listen(3000,function(){
    console.log("server started at port 3000");
})