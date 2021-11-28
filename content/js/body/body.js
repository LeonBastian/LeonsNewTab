document.getElementById("bodyid").addEventListener("onload", setBody());

//OnClick for edit buttons bookmarks
var allEditLinks = document.getElementsByClassName("edit");
for (var i = 0; i < allEditLinks.length; i++){
	allEditLinks[i].addEventListener("click", function(){
	   openEditBookmarkModal(this.id);
	});
}


function setBody() {
	
	//SET BACKGROUND
	chrome.storage.sync.get(['key'], function(result) {
		if(result.key == "dark"){
			//display active item in settings offcanvas
			document.getElementById("setting-pic-dark-icon").style.color = "yellow";
			document.getElementById("footer-piccredit").style.display = "none";
			document.getElementById("footer-deleteinfo").style.display = "none";
		} 
		else if(result.key == "weekly") {
			var picurl = "http://api.leonstab.leon.cx/weekly";
			document.getElementById("bodyid").style.backgroundImage = "url('"+picurl+"')";
			document.getElementById("bodyid").style.backgroundRepeat = "no-repeat";
			document.getElementById("bodyid").style.backgroundPosition = "center center";
			document.getElementById("bodyid").style.backgroundAttachment = "fixed";
			document.getElementById("bodyid").style.backgroundSize = "cover";
			//display active item in settings offcanvas
			document.getElementById("setting-pic-weekly-icon").style.color = "yellow";
			document.getElementById("footer-piccredit").style.display = "block";
			document.getElementById("footer-deleteinfo").style.display = "none";
		}
		else if(result.key == "own") {
			var imageLink = localStorage.getItem("background-image-url");
			console.log(imageLink);
			document.getElementById("bodyid").style.backgroundImage = "url('"+imageLink+"')";
			document.getElementById("bodyid").style.backgroundRepeat = "no-repeat";
			document.getElementById("bodyid").style.backgroundPosition = "center center";
			document.getElementById("bodyid").style.backgroundAttachment = "fixed";
			document.getElementById("bodyid").style.backgroundSize = "cover";
			document.getElementById("bodyid").style.cursor = "default";
			//display active item in settings offcanvas
			document.getElementById("setting-pic-own-icon").style.color = "yellow";
			document.getElementById("footer-piccredit").style.display = "none";
			document.getElementById("footer-deleteinfo").style.display = "block";
			
		}
	});
	
	
	//SET BOOKMARKS / QUICKLINKS
	setBookmarksInBody();
}


function setBookmarksInBody() {
	var maxBookmarksNav = 6;
	var bookmarkObjArray = JSON.parse(localStorage.getItem('bookmarks'));
	if(bookmarkObjArray == null) {
		document.getElementById("bookmarks-dropdown").style.display = "none";
		return null;
	} else {
		var keys = Object.keys(bookmarkObjArray);
		var len = keys.length;
		if(len > maxBookmarksNav) {
			//document.getElementById("bookmarknew").style.display = "none";
			document.getElementById("bookmarks-dropdown").style.display = "block";
		} else {
			//ADD BOOKMARKS TO NAV BAR
			document.getElementById("bookmarks-dropdown").style.display = "none";
		}
		
		var overallLen = 0;
		for (var i = 0; i < len; i++){
			var obj = bookmarkObjArray[i];
			var elementTitle = obj['title'];
			var newTitle = "";
			
			if(i < maxBookmarksNav) {
				//add bookmarks to shortcut navbar
				var cutoffLen = 21;
				if(elementTitle.length > cutoffLen){
					newTitle = elementTitle.slice(0, cutoffLen);
					newTitle = newTitle+"...";
				} else {
					newTitle = obj['title'];
				}
				var dropdownDiv = document.createElement('div');
				dropdownDiv.className = 'dropdown';
				dropdownDiv.style.marginLeft = "16px";
				var newHtmlHref = document.createElement('a');
				newHtmlHref.appendChild(document.createTextNode(newTitle));
				newHtmlHref.className = "nav-link";
				newHtmlHref.href = obj['link'];
				newHtmlHref.setAttribute('data-bs-target', obj['link']);
				var newHtmlHrefId = "link-"+i; 
				newHtmlHref.id = newHtmlHrefId;
				var dropdownUl = document.createElement('ul');
				dropdownUl.className = "dropdown-menu dropdown-contents";
				dropdownUl.setAttribute('aria-labelledby', newHtmlHrefId);
				var dropdownLi = document.createElement('li');
				var dropdownEditButton = document.createElement('a');
				dropdownEditButton.className = "dropdown-item backgroundhover edit";
				dropdownEditButton.id = "edit-"+i;
				dropdownEditButton.href = "#";
				dropdownEditButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
				dropdownEditButton.setAttribute("data-bs-toggle", "modal");
				dropdownEditButton.setAttribute("data-bs-target", "#editBookmarkModal");
				dropdownLi.appendChild(dropdownEditButton);
				dropdownLi.style.display = "inline-block";
				dropdownUl.appendChild(dropdownLi);
				dropdownDiv.appendChild(newHtmlHref);
				dropdownDiv.appendChild(dropdownUl);
				document.getElementById("bookmark-div").appendChild(dropdownDiv);
				
			} else {
				//add bookmarks to dropdown!
				newTitle = elementTitle;
				var newListItem = document.createElement('li');
				var newDropdownHref = document.createElement('a');
				newDropdownHref.appendChild(document.createTextNode(newTitle));
				newDropdownHref.className = "dropdown-item";
				newDropdownHref.href = obj['link'];
				newDropdownHref.style.width = "90%";
				newListItem.appendChild(newDropdownHref);
				
				var newDropdownHrefEditIcon = document.createElement('a');
				newDropdownHrefEditIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
				newDropdownHrefEditIcon.className = "dropdown-item edit";
				newDropdownHrefEditIcon.href = "#";
				newDropdownHrefEditIcon.style.width = "10%";
				newDropdownHrefEditIcon.id = "edit-"+i;
				newDropdownHrefEditIcon.setAttribute("data-bs-toggle", "modal");
				newDropdownHrefEditIcon.setAttribute("data-bs-target", "#editBookmarkModal");
				newListItem.appendChild(newDropdownHrefEditIcon);
				
				var bookmarksList = document.getElementById("bookmarks-list");
				bookmarksList.appendChild(newListItem);
			}
		}
	}
}