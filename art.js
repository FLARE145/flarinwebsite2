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

randomImageOrder();