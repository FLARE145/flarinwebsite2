const pageStack = [];
function search(){
	selector = document.getElementById("select");
	value = selector.value;
	switch(value){
		case 'ap2019':
			summon('ap2019.html');
			setParam('ap2019');
			break;
		case 'abstract':
			summon('abstract.html');
			setParam('abstract');
			break;
		default:
			document.getElementsByClassName("flexZone")[0].innerHTML = '';
			setParam('');
	};
};
let group = '';
function summon(name){
	fetch(name)
	.then(response => response.text())
	.then(text => group = text)
	.then(next => loadArt())
};
function loadArt(){
	let zone = document.getElementsByClassName("flexZone")[0];
	zone.innerHTML = group;
};



//url stuff
function setParam(name){
	const url = new URL(window.location);
	url.searchParams.set('', [name]);
	window.history.pushState({}, '', url);
};
function getParam(){
	url = window.location.href;
	if (url.includes('=') === true){
		param = url.substring(url.search("=") +1 , url.length);
		return param;
	} else{
		return 'none';
	};
};
window.onload = function(){
	let loc = getParam();
	if (loc === 'none'){
		return;
	} else{
		selector = document.getElementById("select").value = loc;
		search();
	};
};


//copied from art.js
function openPopup(image) {
	let imageAdress = '/art-images/' + image;
	let uri = image.slice(0, 5);
	let newpage = document.getElementsByClassName("window")[0];
	let cover = document.createElement("div");
	let screenWidth = window.screen.width;
	//opens link if on mobile
	if (screenWidth <= 1000) {
		location.href = "https://flare145.com/artwork/" + uri;
	} else {
		//rest of stuff for pc
		cover.classList.add("popup-background");
		cover.setAttribute("onclick","closePopup();");
		newpage.appendChild(cover);
		let preview = document.createElement("div");
		preview.classList.add("popup");
		//redirects to google hosted images
		imageAdress = 'https://storage.googleapis.com/flare145.com/art-images/' + image;
		preview.innerHTML = '<a href="/artwork/' + uri + '"><img src="' + imageAdress + '"></a>';
		console.log(imageAdress);
		newpage.appendChild(preview);;
		//11/20/23 added x
		let x = document.createElement("div");
		x.classList.add("xButton");
		x.setAttribute("onclick","closePopup();");
		preview.appendChild(x);
	}
}

function closePopup() {
	let newpage = document.getElementsByClassName("window")[0];
	newpage.innerHTML = '';
}