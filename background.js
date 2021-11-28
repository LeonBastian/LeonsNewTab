chrome.runtime.onInstalled.addListener(() => {
	var key = "background-type";
	var value = "weekly";
	chrome.storage.sync.set({key: value}, function() {
	  console.log('Value for background-type is set to ' + value);
	});
});