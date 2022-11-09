

function getUserGeoLoc() {
 

  if ('geolocation' in navigator){
    console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(position =>{
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    document.getElementById('latitude').value =lat;
    document.getElementById('longitude').value = long;
    console.log(lat);
    console.log(long);
        })
  }else{
console.log('geolocation not available');
  }

}



