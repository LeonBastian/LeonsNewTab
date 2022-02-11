
var input = document.getElementById("inputsearch");


input.addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    
    event.preventDefault();
    location = "https://www.google.com/search?q="+input.value;
	
  }
});