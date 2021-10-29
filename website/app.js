//set global variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
//creating date instance  dynamically using javascript
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//using personal API from openweathermap.org
//Convert measurement to Celsius By adding 'units=metric'
const apiKey = ',us&appid=96d54e603aa873b3e0cfacdd252046ba&units=metric';
//add event listener
const generate = document.getElementById('generate');
generate.addEventListener('click', performAction)
// peformAction function 
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const cont = document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey)
    //callback functions
    .then(function(data){
        //add data here
            console.log(data);
            postData('/addWeather', {date:newDate, temp: data.main.temp, content:cont} );
            updateUI()
    })
}
//add post data function
const postData = async(url="", data={})=>{
    //console.log to error handling
    console.log( data );
    //response
    const response = await fetch (url , {
            method: 'POST', 
            credentials: 'same-origin',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            //
            body: JSON.stringify(data), 
        });
      //using try and catch to avoid app crashing
      try{
        const  newData  =await response.json();
        console.log(newData);
        return newData;
      }
      catch(error){
          console.log('oops there an error' , error);
      }
}
//function to get data from openweathermap.org API
const getWeather  = async (baseURL,zipcode,key)=>{
        const res  = await fetch(baseURL+zipcode+key)
        //error handling
        try{
            const data = await res.json();
            console.log(data)

            return data;
        }catch(error){
            console.log('oops there an error' , error);
        }
}
//update website UI
const updateUI = async()=>{
    const request = await fetch('/all');
    //error handling
    try{
        const allData = await request.json();

        //update date
        document.getElementById("date").innerHTML = '📅Date: ' + allData.date;
        //update temprature
        document.getElementById("temp").innerHTML = '🌡️Temprature now : ' + allData.temp + ' °C';
        //update content
        document.getElementById("content").innerHTML='🥺felling : ' + allData.content;}
        catch(error){
            console.log('oops there an error', error);
        }
}