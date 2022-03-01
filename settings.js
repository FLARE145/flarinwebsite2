//cookie functions

function writeCookie(name, property) {
    document.cookie = name + '=' + property + '; ';
}
function readCookie(name) {
	if (document.cookie !== '') {
	    let allCookies = document.cookie.split('; ');
	    let cookieValue = allCookies.find(row => row.startsWith(name)).split('=')[1];
	    return cookieValue;
	}
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