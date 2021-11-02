function goToSettings(){
    window.location.href = "https://flare145.com/settings";
}
function writeCookie(name, property) {
    document.cookie = name + "=" + property + "; ";
}

document.addEventListener("keypress", function(event) {
  if (event.key == 's') {
    goToSettings();
  }
});

writeCookie('initial','exists' );
if (document.cookie === "initial=exists") {
  writeCookie('betaMode','false');
}

let allCookies = document.cookie.split('; ');

let settings = {
	betaMode: allCookies.find(row => row.startsWith('betaMode')).split('=')[1]
}

if (settings.betaMode === 'true'){
	document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg1.png' id='flarebg'><source src='/res/flarebg4.webm' type='video/webm'></video>";
}

