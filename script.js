let weather = {

    apiKey: "12a64c4ddd3d3f26bea8d61121a6de59",

    fetchWeather: function(city)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&units=imperial&appid=" +this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data)
    {
        document.querySelector(".city").innerText = data.city.name;
        document.querySelector(".description").innerText = data.list[0].weather[0].description;
        document.querySelector(".icon").src="https://assets.codepen.io/8350408/" +data.list[0].weather[0].icon+".svg" 
        document.querySelector(".main-temp").innerText = Math.trunc(data.list[0].main.temp) + "°F"
        document.querySelector(".humidity").innerText = "humidity\n "+data.list[0].main.humidity+ "%";
        document.querySelector(".wind").innerText = "wind speed\n " +Math.trunc(data.list[0].wind.speed)+ " mph";
        document.querySelector(".temp-max").innerText = "hi: " +Math.trunc(data.list[0].main.temp_max)+"°F"; 
        document.querySelector(".temp-min").innerText = "lo: " +Math.trunc(data.list[0].main.temp_min)+"°F"; 
        
        document.querySelectorAll('.temp').forEach((element, i) => {
            element.innerText = Math.trunc(data.list[i].main.temp) + "°F"
        });

        document.querySelectorAll('.img').forEach((element, i) => {
            element.src="https://assets.codepen.io/8350408/" +data.list[i].weather[0].icon+".svg"
        });
    
        const d = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        function CheckDay(day){
            if(day +d.getDay() > 6){
                return day +d.getDay() -7;
            }
            else{
                return day +d.getDay();
            }
        }

        document.querySelectorAll('.day').forEach((element, i) => {
            element.innerHTML = weekday[CheckDay(i)];
        });
    },

    search: function()
    {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search-button").addEventListener("click", function()
{
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event)
{
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Dallas");