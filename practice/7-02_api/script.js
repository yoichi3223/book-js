'use strict'
//geolocation
function success(pos){
  ajaxRequest(pos.coords.latitude,pos.coords.longitude);
}
function fail(error){
  alert('位置情報の取得に失敗しました。エラーコード' + error.code);
}

navigator.geolocation.getCurrentPosition(success,fail);

//データ取得
function utcToJSTime(utcTime){
  return utcTime * 1000;
}

function ajaxRequest(lat,long){
const url = 'https://api.openweathermap.org/data/2.5/forecast'
const appID = '91cf89e4de5dfa5a0344cb1301e98405';

$.ajax({
url: url,
data:{
appid: appID,
lat: lat,
lon: long,
units: 'metric',
lang: 'ja'
}
})

.done(function(data){
console.log(data);
console.log('都市名'+data.city.name);
console.log('都市名'+data.city.country);

data.list.forEach(function(forecast, index) {
            const dateTime = new Date(utcToJSTime(forecast.dt));
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2, '0');
            const temperature = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = `images/${forecast.weather[0].icon}.svg`;

            console.log('日時：' + `${month}/${date} ${hours}:${min}`);
            console.log('気温：' + temperature);
            console.log('天気：' + description);
            console.log('画像パス：' + iconPath);
        });
})
.fail(function(){
console.log('$.ajax failed!');
})
}
