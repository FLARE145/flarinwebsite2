function countElements() {
	let eCount = 0;
	for (let i = 0; document.getElementById(i); i++) {
		eCount += 1;
	}
	return eCount;
}
function addElement(type) {
	let eCount = countElements();
	switch(type) {
		case 'heading':
		    let hElem = document.createElement("div");
			hElem.id = eCount;
			hElem.classList.add("paragraph");
			hElem.innerHTML = '  <h4>Heading</h4>' + '\n' + '  <textarea name="headingBox" class="here" rows="1" cols="40"></textarea>';
			document.getElementById("paragraphs").appendChild(hElem);
			break;
		case 'paragraph':
			let pElem = document.createElement("div");
			pElem.id = eCount;
			pElem.classList.add("paragraph");
			pElem.innerHTML = '  <h4>Paragraph</h4>' + '\n' + '  <textarea name="paragraphBox" class="here" rows="8" cols="75"></textarea>';
			document.getElementById("paragraphs").appendChild(pElem);
			break;
		case 'image':
		    let iElem = document.createElement("div");
			iElem.id = eCount;
			iElem.classList.add("image");
			iElem.innerHTML = '  <h4>Image</h4>' + '\n' + '  <label for="sourceBox">Image source</label><br>' + '\n' + '  <textarea name="sourceBox" class= "imageSource" rows="1" cols="40"></textarea><br>' + '\n' + '  <label for="captionBox">Caption</label><br>' + '\n' + '  <textarea name="captionBox" class="imageCaption" rows="3" cols="40"></textarea><br>' + '\n' + '  <label for="labelBox">Alt text</label><br>' + '\n' + '  <textarea name="altBox" class="imageAlt" cols="40"></textarea><br>' + '\n' + '<label for="sizeBox">Size</label><br>' + '\n' + '  <input type="radio" class="skinny" name="size" value="45"><label for="skinny">Skinny</label><br>' + '\n' + '  <input type="radio" class="wide" name="size" value="60"><label for="wide">Wide</label><br>';
			document.getElementById("paragraphs").appendChild(iElem);
			break;
		default: console.log('unknown element type');
	}
}
function deleteElement() {
	let eCount = countElements();
	let elem = document.getElementById(eCount-1)
	elem.remove();
}
function generateParagraph(content) {
	return '          <p>' + content + '</p>' + '\n';
}
function generateHeading(content) {
	let day = new Date();
	let year = day.getFullYear().toString().slice(2);
	let fullDate = day.getMonth() + 1 + '/' + day.getDate() + '/' + year
	return '          <h2>' + fullDate + ' - ' + content + '</h2>' + '\n';
}
function generateImage(content) {
	let source = content.getElementsByClassName("imageSource")[0].value;
	let caption = content.getElementsByClassName("imageCaption")[0].value;
	let alt = content.getElementsByClassName("imageAlt")[0].value;
	let size = 60;
	if (content.getElementsByClassName("skinny")[0].checked === true) {
		size = content.getElementsByClassName("skinny")[0].value;
	} else {
		size = content.getElementsByClassName("wide")[0].value;
	}
	return '          <figure>' + '\n' + '            <img src="' + source + '" alt="' + alt + '" style="width:' + size + 'vmin; display:inline; max-width:790px;">' + '\n' + '            <figcaption>' + caption + '</figcaption>' + '\n' + '          </figure>' + '\n';
}
function generateElement(element) {
	switch(element.className) {
		case 'heading':
		    return generateHeading(element.getElementsByClassName("here")[0].value)
		    break;
		case 'paragraph':
		    return generateParagraph(element.getElementsByClassName("here")[0].value)
		    break;
		case 'image':
			return generateImage(element);
		    break;
		default: console.log('unknown element type')
	}
}
function generateOutput() {
	let eCount = countElements();
	let output = '';
	for (let i = 0; i < eCount; i++) {
		let currentE = document.getElementById(i);
		output += generateElement(currentE);
	}
	document.getElementById("output").value = '        <div class="post">' + '\n' + output + '        </div>';
	navigator.clipboard.writeText(document.getElementById("output").value);
}


function closePopup() {
	let newpage = document.getElementsByClassName("window")[0];
	newpage.innerHTML = '';
}