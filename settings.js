let allCookies = document.cookie.split('; ');

let settings = {
	betaMode: allCookies.find(row => row.startsWith('betaMode')).split('=')[1]
}

if (settings.betaMode === 'true'){
	document.getElementById("globalBackground").innerHTML ="<video autoplay loop muted poster='/res/bg1.png' id='flarebg'><source src='/res/flarebg4.webm' type='video/webm'></video>";
}

