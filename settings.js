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

//settings shortcut

/*document.addEventListener("keypress", function(event) {
  if (event.key == 's') {
    window.location.href = "https://flare145.com/settings";
  }
});*/

if (readCookie('visited') === 'true') {
	console.log('you are a returning user');
	} else {
		writeCookie('news', true);
		writeCookie('visited', true);
		console.log('this is your first visit!');
};

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

//darkmode
let darkMode = false;
if (readCookie('darkTheme') === 'true') {
	document.getElementsByTagName('body')[0].classList.add("darkTheme");
	darkMode = true;
	} else {
		document.getElementsByTagName('body')[0].classList.add("lightTheme");
	};
	
//motion background
if (readCookie('motionBackground') === 'true') {
	//background change
	let bgElement = document.getElementById("globalBackground")
	if (darkMode === true) {
		if (bgElement) {
        document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg2.png' id='flarebg' style='filter:brightness(0.21)contrast(1.4)'><source src='/res/flarebg4.webm' type='video/webm'></video>";
		};
	} else if (bgElement) {
		document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg1.png' id='flarebg'><source src='/res/flarebg4.webm' type='video/webm'></video>";
	};
	//message
	console.log('fancy mode is enabled')
};