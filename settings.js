//cookie functions

function writeCookie(name, property) {
    document.cookie = name + '=' + property + ';expires=Thu, 01 Jan 2030 00:00:00 GMT ';
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

//misc

function copyToClipboard(text, id) {
	navigator.clipboard.writeText(text);
	ogText = document.getElementById(id).innerHTML;
	document.getElementById(id).innerHTML = 'Link copied to clipboard';
	document.getElementById(id).style.color = 'red';
	ogClick = document.getElementById(id).onclick;
	document.getElementById(id).onclick = '';
	setTimeout(() => {
			document.getElementById(id).style.color = '';
			document.getElementById(id).innerHTML = ogText;
			document.getElementById(id).onclick = ogClick;
		}, 2500);
}


//settings shortcut

document.addEventListener("keypress", function(event) {
  if (event.key == 's') {
    window.location.href = "https://flare145.com/settings";
  }
});

if (readCookie('visited') === 'true') {
	console.log('you are a returning user');
	} else {
		writeCookie('news', true);
		writeCookie('visited', true);
		console.log('this is your first visit!');
};

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


//ad

let adCode = '';

function getAd(){
	fetch("https://flare145.com/ad.txt").then(function(response) {
	  response.text().then(function(text) {
		ad = document.getElementsByClassName("post")[1];
		ad.innerHTML = text;
		});
	});
}

//activate changes

if (readCookie('betaMode') === 'true') {
	//background change
	let bgElement = document.getElementById("globalBackground")
	if (bgElement) {
        document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg1.png' id='flarebg'><source src='/res/flarebg4.webm' type='video/webm'></video>";
	};
	//enable ads    btw no idea why this doesn't run anymore but it shouldn't so we good
	if (document.getElementsByClassName('post')[0] != undefined){
		console.log('yes');
		let ad = document.createElement("div");
		ad.classList.add("post");
		let parentDiv = document.getElementById("main");
		let secondPost = document.getElementsByClassName("post")[1];
		parentDiv.insertBefore(ad, secondPost);
		getAd();
	};
	//message
	console.log('experimental mode is enabled')
	} else {
		console.log('press s for secret settings');
};


//scroolll



let pos = window.innerWidth*.25;
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
		document.getElementById("scrollText").innerHTML = 'Announcements:  ' + text.repeat(5) + 'Announcements will return momentarily';
		});
	});
}