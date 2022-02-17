
var input = document.getElementById("reminder");


input.addEventListener("input", function(event) {
  
	//event.preventDefault();
	var key = "reminder";
	var value = input.value;
	localStorage.setItem(key, value);
	console.log(localStorage.getItem(key));
	
});