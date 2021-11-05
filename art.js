function countImages() {
	let iCount = 0;
	for (let i = 0; document.getElementById(i); i++) {
		iCount += 1;
	}
	return iCount;
}

function randomSequence() {
	let sequence = [];
	let iCount = countImages();
	for (let i = 0; i < iCount; i++) {
		sequence.push(Math.floor(Math.random()*iCount));
	}
	return sequence;
}

function randomImageOrder() {
	let iCount = countImages();
	for (let i = 0; i < iCount; i++) {
		let image = document.getElementById(i);
		image.style.order = randomSequence()[i];
	}
}

randomImageOrder();