document.getElementById("setting-pic-dark").onclick = changePicToDark;
document.getElementById("setting-pic-weekly").onclick = changePicToWeekly;
document.getElementById("setting-pic-own").onclick = changePicToOwn;
document.getElementById("setting-pic-upload").onchange = uploadPic;
document.getElementById("setting-pic-delete").onclick = deleteImage;
document.getElementById("visit-imgur").onclick = visitImgur;

var clientId = "cb4c943c48d309a";

function visitImgur() {
	window.location.href = localStorage.getItem("background-image-url");
}


function deleteImage() {
	var deleteHash = localStorage.getItem("background-image-deletehash");
	
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Client-ID "+clientId);

	var formdata = new FormData();

	var requestOptions = {
	  method: 'DELETE',
	  headers: myHeaders,
	  body: formdata,
	  redirect: 'follow'
	};

	fetch("https://api.imgur.com/3/image/"+deleteHash, requestOptions)
	  .then(response => response.text())
	  .then(result => afterDelete(result))
	  .catch(error => console.log('error', error));
}

function afterDelete(resultParam) {
	var jsonResult = JSON.parse(resultParam);
	console.log(jsonResult);
	if(jsonResult.status == 200) {
		document.getElementById("alert-delete-success").style.display = "block";
		setTimeout(function(){
			document.getElementById("alert-delete-success").style.display = "none";
		}, 1500);
		changePicToDark();
	} else {
		document.getElementById("alert-delete-error").style.display = "block";
		document.getElementById("alert-delete-error").innerHTML = "Error "+jsonResult.status+": "+jsonResult.data.error+" - Sorry about that! If this error does not go away contact x@leon.cx";
	}
}

function uploadPic() {
	
	document.getElementById("bodyid").style.cursor = "wait";
	
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Client-ID "+clientId);

	var formdata = new FormData();
	formdata.append("image", document.getElementById("setting-pic-upload").files[0]);

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: formdata,
	  redirect: 'follow'
	};

	fetch("https://api.imgur.com/3/image", requestOptions)
	  .then(response => response.text())
	  .then(data => saveUploadLink(data))
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}

function saveUploadLink(responseParam){
	var jsonResponse = JSON.parse(responseParam);
	var picLink = jsonResponse.data.link;
	var picDeleteHash = jsonResponse.data.deletehash;
	var key = "background-image-url";
	var value = picLink;
	localStorage.setItem(key, value);
	key = "background-image-deletehash";
	value = picDeleteHash;
	localStorage.setItem(key, value);
	location.reload();
}

function changePicToDark() {
	var key = "background-type";
	var value = "dark";
	/*chrome.storage.sync.set({key: value}, function() {
	  console.log('Value for background-type is set to ' + value);
	});*/
	localStorage.setItem(key, value);
	document.getElementById("bodyid").style.backgroundImage = "";
	document.getElementById("setting-pic-weekly-icon").style.color = "white";
	document.getElementById("setting-pic-own-icon").style.color = "white";
	document.getElementById("setting-pic-dark-icon").style.color = "yellow";
	document.getElementById("footer-piccredit").style.display = "none";
	document.getElementById("footer-deleteinfo").style.display = "none";
}

function changePicToWeekly() {
	var key = "background-type";
	var value = "weekly";
	/*chrome.storage.sync.set({key: value}, function() {
	  console.log('Value for background-type is set to ' + value);
	});*/
	localStorage.setItem(key, value);
	document.getElementById("setting-pic-dark-icon").style.color = "white";
	document.getElementById("setting-pic-own-icon").style.color = "white";
	document.getElementById("setting-pic-weekly-icon").style.color = "yellow";
	document.getElementById("footer-piccredit").style.display = "block";
	var picurl = "http://api.leonstab.leon.cx/weekly";
	
	document.getElementById("bodyid").style.backgroundImage = "url('"+picurl+"')";
	document.getElementById("footer-deleteinfo").style.display = "none";
}

function changePicToOwn() {
	var key = "background-type";
	var value = "own";
	/*chrome.storage.sync.set({key: value}, function() {
	  console.log('Value for background-type is set to ' + value);
	});*/
	localStorage.setItem(key, value);
	document.getElementById("setting-pic-dark-icon").style.color = "white";
	document.getElementById("setting-pic-weekly-icon").style.color = "white";
	document.getElementById("setting-pic-own-icon").style.color = "yellow";
	document.getElementById("footer-piccredit").style.display = "none";
}
