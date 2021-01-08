const express= require("express");
const https= require("https");
const bodyp= require("body-parser");
const app= express();

app.use(bodyp.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var cityname=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=40a24500e869bd23b71b344a11434911&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weather_data= JSON.parse(data);
      const temp= weather_data.main.temp;
      const icon= weather_data.weather[0].icon;
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>temp is"+ temp+"<h1>");
      res.write("<img src="+imageurl+">");
      res.send();
    });
  });
});
app.listen(3000,function(){
  console.log("running...");
});
