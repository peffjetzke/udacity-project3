/*Variables*/
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; 
const apiKey = "&appid=b8a55a0b8c9b612c96d2927ca046035c&units=";
const units = "imperial";
let date = new Date(); //setup the date
let today = date.toLocaleDateString(); //format the date to a string in dd/mm/yyyy format

//Button event listener
document.getElementById("generate").addEventListener("click", generatePage);

//Function for event listener
function generatePage(e){
    let zip = document.getElementById("zip").value;
    let apiURL = baseURL+zip+apiKey+units;
    let feelings = document.getElementById("feelings").value;

    //No semi-colon here as it would terminate "getWeather" and not allow the chaining to work
    getWeather(apiURL)
    //Combine it all
    .then(function(data){
        postData('/add', {temp: data.main.temp , date: today, feelings: feelings})
    })
    //Update the UI
    .then(()=> updateUI());
}

/*Call Weather API data*/
const getWeather = async (apiURL)=>{
    const res = await fetch(apiURL) //baseURL+zip+apiKey+units
    try{
        const data = await res.json();
        console.log(data); //debug check for weather data
        return data;
    } catch(error){
        console.log("There was a problem", error);
    }
}

/*Post the data, combine weather data from API with user data from UI*/
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        const allData = await response.json();
        console.log(allData);
        return allData;
    } catch(error){
        console.log("There was a problem", error);
    }
}

/*Update the UI with the returned Weather and feeling data*/
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const pageData = await request.json();
        console.log(pageData); //debug
        document.getElementById("date").innerHTML = pageData.date;
        document.getElementById("temp").innerHTML = pageData.temp;
        document.getElementById("content").innerHTML = pageData.feelings;
    } catch(error){
        console.log("There was a problem", error);
    }
}