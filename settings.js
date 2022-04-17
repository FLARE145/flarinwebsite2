//cookie functions

function writeCookie(name, property) {
    document.cookie = name + '=' + property + '; ';
}
function readCookie(name) {
	if (document.cookie !== '') {
	    let allCookies = document.cookie.split('; ');
		let expected = name + '=true';
		if (allCookies.find(row => row.startsWith(name)) === expected) {
			let cookieValue = allCookies.find(row => row.startsWith(name)).split('=')[1];
	        return cookieValue;
		} else{
			return false;
	}}
}

function deleteCookie(name) {
	document.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT '; 
}
function clearCookies() {
	let allCookies = document.cookie.split('; ');
	for (var i = 0; i < allCookies.length; i++) {
		deleteCookie(allCookies[i]);
	}
}


//settings shortcut

document.addEventListener("keypress", function(event) {
  if (event.key == 's') {
    window.location.href = "https://flare145.com/settings";
  }
});

//newsbar stuff

function toggleElement(){
	if (document.getElementsByClassName("newsbar")[0]){
	let element = document.getElementsByClassName("newsbar")[0];
	if (element.style.display === "none") {
		element.style.display = "grid";
		document.getElementsByClassName("togglebutton")[0].style.bottom = "29px";
		document.getElementsByClassName("togglebutton")[0].style.transform = "rotate(180deg)";
		writeCookie('news', true);
    } else {
    element.style.display = "none";
	document.getElementsByClassName("togglebutton")[0].style.bottom = "0px";
	document.getElementsByClassName("togglebutton")[0].style.transform = "rotate(0deg)";
	deleteCookie('news');
    }
	}
}

if (readCookie('news') === 'true') {
	toggleElement();
}

//activate changes

if (readCookie('betaMode') === 'true') {
	let bgElement = document.getElementById("globalBackground")
	if (bgElement) {
        document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg1.png' id='flarebg'><source src='/res/flarebg4.webm' type='video/webm'></video>";
	}
	console.log('experimental mode is enabled')
	} else {
		console.log('press s for secret settings');
}

//scroolll



let pos = window.innerWidth/2;
//let pos2 = window.innerWidth;


function scrollElement(){
	let element = document.getElementById('scrollText');
	let width = element.offsetWidth;
	pos -= .25;
	//let elementF = document.getElementById('fetchText');
	//let widthF = elementF.offsetWidth;
	endpoint = pos + width;
	//pos2 = endpoint + window.innerWidth/2;
	let posString = pos + "px";
	//let posString2 = pos2 + "px";
	element.style.marginLeft = posString;
	//elementF.style.marginLeft = posString2;
	if (pos < 0-width){
		pos = window.innerWidth;
		updateNews();
	}
	/*if (pos2 < 0-widthF){
		pos2 = window.innerWidth;
	}*/
}

window.onload = function(){
	if (document.getElementsByClassName('newsbar')[0]){
	updateNews();
	setInterval(scrollElement,5);
	}
};

function createNews(){
	let text = document.createElement("p");
	text.setAttribute("id","scrollText");
	document.getElementsByClassName("newsbar")[0].appendChild(text);
}

function updateNews(){
	fetch("news.txt").then(function(response) {
	  response.text().then(function(text) {
		document.getElementById("scrollText").innerHTML = 'News Feed:  ' + text + text + text + text + text + '  End of broadcast';
		});
	});
}