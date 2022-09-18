
var latitude;
var longitude;
function getUserGeoLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log("lat: " + latitude + " lng: " + longitude);
}

function showError(error) {
  if (error.code == error.PERMISSION_DENIED) {
    alert("please approve your location, you wont be able to find your skate mate!");
    console.log("Location request denied");
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}




/**const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
      console.error(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function ValidateForm(form){
  ErrorText= "";
  if ( ( form.gender[0].checked == false ) && ( form.gender[1].checked == false ) )
  {
  alert ( "Please choose your Gender: Male or Female" );
  return false;
  }
  if (ErrorText= "") { form.submit() }
  }

//const findMyLocation = () => {

    //const status = document.querySelector('.status');   

    //const success = (position) => {
    // console.log(position)
      //}
    
      //const error = () => {
      //  status.textContent = 'unable to retrive your location'
    //  }
  //  navigator.geolocation.getCurrentPosition(success,error );
    
//}

*/