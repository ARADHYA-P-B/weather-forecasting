   let cityInput =  document.getElementById("city_input");
   searchBtn = document.getElementById('searchbtn');
   locationbtn = document.getElementById('locationbtn');

   api_key ='98e2c01fa5471c047f35c259f1ea3134',
  currentweathercard = document.querySelectorAll('.weather-left .card')[0];
   fiveDayscard = document.querySelector('.day-forecast');
   aqicard= document.querySelectorAll('.highlights .card')[0],
   sunrisecard= document.querySelectorAll('.highlights .card')[1],
   humidityval = document.getElementById('humidityval'),
   pressureval = document.getElementById('pressureval'),
   Visibilityval = document.getElementById('Visibilityval'),
   windspeedval = document.getElementById('windspeedval'),
   feelslistval = document.getElementById('feelslistval'),
   hourlyforecastcard = document.querySelector('.hourly-forecast'),
   aqiList =['Good','Fair','Moderate','Poor','very Poor'];

   function getWeatherDetails(name,lat,lon,country,state){
           let FORECAST_API_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
            WEATHER_API_URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
            AIR_POLLUTION_API_URL =`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,  

            days=[
               'Sunday',
               'Monday',
               'Tuesday',
               'Wednesday',
               'Thrusday',
               'Friday',
               'Saturday',
               
           ],
           months=[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
           ];


           fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data =>{
                   let {co,no,no2,o3,so2,pm2_5,pm10,nh3} = data.list[0].components;
                   aqicard.innerHTML= `
                   <div class="card-head">
                   <p>Ait Quality index</p>
                   <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi]}</p >
               </div>
               <div class="air-indices">
                       <i class="fas fa-wind fa-3x"></i>
                       <div class="item">
                           <p>PM2.5</p>
                           <h2>${pm2_5}</h2>
                       </div>
                       <div class="item">
                           <p>PM10</p>
                           <h2>${pm10}</h2>
                       </div>
                       <div class="item">
                           <p>SO2</p>
                           <h2>${so2}</h2>
                       </div>
                       <div class="item">
                           <p>CO</p>
                           <h2>${co}</h2>
                       </div>
                       <div class="item">
                           <p>NO</p>
                           <h2>${no}</h2>
                       </div>
                       <div class="item">
                           <p>NO2</p>
                           <h2>${no2}</h2>
                       </div>
                       <div class="item">
                           <p>NH3</p>
                           <h2>${nh3}</h2>
                       </div>
                       <div class="item">
                           <p>O3</p>
                           <h2>${o3}</h2>
                       </div>
                </div>
                     
                   `;
             
           }).catch(() =>{
                 alert( 'fail to fetch current Air pollution ')
           });
        
       fetch(WEATHER_API_URL).then(res =>res.json()).then(data =>{
                let date = new Date();
                currentweathercard.innerHTML =`
                  <div class="current-weather">
                       <div class="details">
                           <p>Now </p>
                        <h2>${(data.main.temp -273.15).toFixed(2)}&deg;C</h2>
                        <p>${data.weather[0].description}</p>
                  </div>
                  <div class ="weather-icon">
                  <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
                   </div>
              </div> 
              <hr>
                  <div class="card-footer">
                  <p><i class="fas fa-calendar fa-1x icon"></i>${days[date.getDay()]}, ${date.getDate()} ,${months[date.getMonth()]} ${date.getFullYear()}</p>
                
                  <p><i class="fas fa-map-marker-alt fa-1x icon"></i> ${data.name}, ${data.sys.country} </p>

              </div>   
              `;

              let {sunrise ,sunset} = data.sys,
              {timeZone,visibility} =data,
              {humidity,pressure,feels_like}  = data.main,
              {speed} =data.wind,
              sRiseTime = moment.utc(sunrise, 'x').add(timeZone, 'seconds').format('hh:mm:A'),
              sSetTime = moment.utc(sunset, 'x').add(timeZone, 'seconds').format('hh:mm:A');

              sunrisecard.innerHTML= `
                  <div class ="card-head">
                     <p> sunrise & senset</p>
                  </div>
                     <div class="sunrise-sunset">
                       <div  class="item">
                         <div class="icon">
                      <i class="fas fa-sun fa-3x"></i>
                    </div>
                  <div>
                   <p>sunrise</p>
                  <h2>${sRiseTime}</h2>
                  </div>
               </div>
                  <div  class="item">
                     <div class="icon">
                     <i class="fas fa-cloud-sun fa-3x"></i>
                  </div>
               <div>
                <p>sunset</p>
                  <h2>${sSetTime}</h2>
             </div>
            </div> 
        </div>
       `;

        humidityval.innerHTML= `${humidity}%`;
        pressureval.innerHTML= `${pressure}hpa`;
        Visibilityval.innerHTML =`${visibility /1000}km`;
        windspeedval.innerHTML =`${speed}m/s`;
        feelslistval.innerHTML =`${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(() =>{
             alert('Failed to fetch current Weather');
           })


           fetch(FORECAST_API_URL).then(res => res.json()).then(data =>{
                let hourlyforecast = data.list;
                hourlyforecastcard.innerHTML =``;
                for(i=0;i <= 7 ;i++){
                     let hrForecastDate = new Date(hourlyforecast[i].dt_txt);
                     let hr = hrForecastDate.getHours();
                     let a ='PM';
                     if(hr < 12) a ='AM';
                     if(hr  == 0 ) hr =12;
                     if(hr > 12) hr = hr -12;
                     hourlyforecastcard.innerHTML +=`
                             <div class="card">
                                       <p>${hr} ${a}</p>
                                       <img src="https://openweathermap.org/img/wn/${hourlyforecast[i].weather[0].icon}.png" alt ="">
                                      <p>${(hourlyforecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                            </div>
                                
                     `;
                }

                  let uniqueForcastDays = [];
                  let fiveDaysForcast = data.list.filter(forecast =>{
                       let forecastDate = new Date(forecast.dt_txt).getDate();
                       if(!uniqueForcastDays.includes(forecastDate)){
                           return uniqueForcastDays.push(forecastDate);   
                       }
                    
                  });
                  fiveDayscard.innerHTML = '';
                  for(i = 1 ;i < fiveDaysForcast.length; i++){
                         let date = new Date(fiveDaysForcast[i].dt_txt);
                         fiveDayscard.innerHTML += `
                          <div class="forcast-item">
                            <div class="icon-wrapper">
                              <img src="https://openweathermap.org/img/wn/${fiveDaysForcast[i].weather[0].icon}.png" alt="">
                               <span> ${(fiveDaysForcast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                         </div>
                         <p>${date.getDate()} ${months[date.getMonth()]} </P>
                         <p>${days[date.getDay()]}</P>
                        </div>
                         `;
                      }
           }).catch(() =>{
                  alert('fetch to fetch current weather forecast');
           })
   } 




function getcitycordinated(){
      let cityName = cityInput.value.trim();
      cityInput.value=' ';
      if(!cityName) return;
      let GEOCODING_API_URL =`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;

      fetch(GEOCODING_API_URL).then(res =>res.json()).then(data =>{
        let {name,lat,lon,country,state} = data[0];
        getWeatherDetails(name,lat,lon,country,state);
      }).catch(() =>{
           alert(`Failed to fetch cordinates of ${cityName}`);
      });
}

  function getuserCoordinatees(){
         navigator.geolocation.getCurrentPosition(position => {
        let {latitude,longitude} = position.coords;
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data =>{
              let {name, country, state} = data[0];
              getWeatherDetails(name,latitude ,longitude, country, state);
        }).catch(() =>{
              alert('Fail to fetch user coordinates');
        })
    });
     
  }


   searchBtn.addEventListener("click",getcitycordinated);
   locationbtn.addEventListener('click',getuserCoordinatees); 
   cityInput.addEventListener('keyup', e => e.key === 'Enter' && getcitycordinated());
   window.addEventListener('load',getuserCoordinatees);