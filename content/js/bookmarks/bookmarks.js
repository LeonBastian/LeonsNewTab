document.getElementById("bookmark-create-form").onsubmit = newBookmark;
document.getElementById("bookmark-edit-form").onsubmit = editBookmark;
document.getElementById("bookmark-edit-delete").onclick = deleteBookmark;
document.getElementById("bookmark-create-link").onclick = selectTextInLinkInput;

function selectTextInLinkInput(){
	document.getElementById("bookmark-create-link").select();
}


function makeValidUrl() {
	
}


function newBookmark() {
	var inputTitle = document.getElementById("bookmark-create-title").value;
	var inputLink = document.getElementById("bookmark-create-link").value;
	createBookmark(inputTitle, inputLink);
}

function editBookmark() {
	var inputId = document.getElementById("bookmark-edit-hidden-id").value;
	var inputTitle = document.getElementById("bookmark-edit-title").value;
	var inputLink = document.getElementById("bookmark-edit-link").value;
	editSaveBookmark(inputId, inputTitle, inputLink);
}

function editSaveBookmark(idParam, titleParam, linkParam) {
	var bookmarkObjArray = JSON.parse(localStorage.getItem('bookmarks'));
	var obj = bookmarkObjArray[idParam];
	obj['title'] = titleParam;
	obj['link'] = linkParam;
	bookmarkObjArray[idParam] = obj;
	localStorage.setItem("bookmarks", JSON.stringify(bookmarkObjArray));
	location.reload();
}

function createBookmark(titleParam, linkParam) {
	var tempBookmarkObjArray = JSON.parse(localStorage.getItem('bookmarks'));
	var objLength;
	if(tempBookmarkObjArray == null) {
		objLength = 0;
		var tempBookmarkObj = {
							  title: titleParam,
							  link: linkParam
							};
		tempBookmarkObjArray = [tempBookmarkObj];
		localStorage.setItem("bookmarks", JSON.stringify(tempBookmarkObjArray));
		
	} else {
		objLength = Object.keys(tempBookmarkObjArray).length;
		tempBookmarkObjArray.push({title: titleParam, link: linkParam});
		localStorage.setItem("bookmarks", JSON.stringify(tempBookmarkObjArray));
		
	}
	location.reload();
}

function deleteBookmark() {
	var inputId = document.getElementById("bookmark-edit-hidden-id").value;
	deleteBookmarkLogic(inputId);
}

function deleteBookmarkLogic(bookmarkArrayToDelete){
	var bookmarkObjArray = JSON.parse(localStorage.getItem('bookmarks'));
	bookmarkObjArray.splice(bookmarkArrayToDelete, 1);
	localStorage.setItem("bookmarks", JSON.stringify(bookmarkObjArray));
	location.reload();
}

function openEditBookmarkModal(bookmarkHtmlIdString){
	bookmarkHtmlIdString = bookmarkHtmlIdString.replace(/edit-/i, "");
	//This is so stupid but it works
	var bookmarkArrayIndex = parseInt(bookmarkHtmlIdString);
	
	var bookmarkObjArray = JSON.parse(localStorage.getItem('bookmarks'));
	var obj = bookmarkObjArray[bookmarkArrayIndex];
	
	document.getElementById("bookmark-edit-hidden-id").value = bookmarkArrayIndex;
	document.getElementById("bookmark-edit-title").value = obj['title'];
	document.getElementById("bookmark-edit-link").value = obj['link'];
}