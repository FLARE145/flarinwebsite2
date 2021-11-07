function countImages() {
	return document.getElementsByClassName("imageHolder").length;
}

function randomSequence(amount) {
	let sequence = [];
	for (let i = 0; i < amount; i++) {
		sequence.push(Math.floor(Math.random()*amount));
	}
	return sequence;
}

function randomImageOrder() {
	let iCount = countImages();
	for (let i = 0; i < iCount; i++) {
		let image = document.getElementsByClassName("imageHolder")[i];
		image.style.order = randomSequence(iCount)[i];
	}
}

function openPopup(image) {
	let imageAdress = '/art-images/' + image;
	let uri = image.slice(0, 5);
	let newpage = document.getElementsByClassName("window")[0];
	let cover = document.createElement("div");
	cover.classList.add("popup-background");
	cover.setAttribute("onclick","closePopup();");
	newpage.appendChild(cover);
	let preview = document.createElement("div");
	preview.classList.add("popup");
	preview.innerHTML = '<a href="/art?i=' + uri + '"><img src="' + imageAdress + '"></a>';
	newpage.appendChild(preview);
}

function closePopup() {
	let newpage = document.getElementsByClassName("window")[0];
	newpage.innerHTML = '';
}

function readParam() {
	let param = window.location.search;
	console.log(param);
}

randomImageOrder();