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
			hElem.classList.add("smallHeading");
			hElem.innerHTML = '  <h4 style="color:var(--pColor);">Heading</h4>' + '\n' + '  <textarea name="headingBox" class="here" rows="1" cols="40"></textarea>';
			document.getElementById("paragraphs").appendChild(hElem);
			break;
		case 'paragraph':
			let pElem = document.createElement("div");
			pElem.id = eCount;
			pElem.classList.add("paragraph");
			pElem.innerHTML = '  <h4 style="color:var(--pColor);">Paragraph</h4>' + '\n' + '  <textarea name="paragraphBox" class="here" rows="8" cols="75"></textarea>';
			document.getElementById("paragraphs").appendChild(pElem);
			break;
		case 'image':
		    let iElem = document.createElement("div");
			iElem.id = eCount;
			iElem.classList.add("image");
			iElem.innerHTML = '  <h4 style="color:var(--pColor);">Image</h4>' + '\n' + '  <label for="sourceBox"style="color:var(--pColor);">Image source</label><br>' + '\n' + '  <textarea name="sourceBox" class= "imageSource" rows="1" cols="40"></textarea><br>' + '\n' + '  <label for="captionBox"style="color:var(--pColor);">Caption</label><br>' + '\n' + '  <textarea name="captionBox" class="imageCaption" rows="3" cols="40"></textarea><br>' + '\n' + '  <label for="labelBox"style="color:var(--pColor);">Alt text</label><br>' + '\n' + '  <textarea name="altBox" class="imageAlt" cols="40"></textarea><br>' + '\n' + '<label for="sizeBox"style="color:var(--pColor);">Size</label><br>' + '\n' + '  <input type="radio" class="skinny" name="size" value="45"><label for="skinny"style="color:var(--pColor);">Skinny</label><br>' + '\n' + '  <input type="radio" class="wide" name="size" value="60"><label for="wide"style="color:var(--pColor);">Wide</label><br>';
			document.getElementById("paragraphs").appendChild(iElem);
			break;
		default: console.log('unknown element type');
	}
}
function deleteElement() {
	let eCount = countElements();
	let elem = document.getElementById(eCount-1)
	if (eCount > 1){
		elem.remove();
	};
}
function generateParagraph(content) {
	return '<p>' + content + '</p>' + '\n';
}
function generateHeading(content) {
	let day = new Date();
	let year = day.getFullYear().toString().slice(2);
	let fullDate = day.getMonth() + 1 + '/' + day.getDate() + '/' + year
	return '<a href="https://flare145.com/blogpost?=' + fixTitle() + '"rel="noopener"style="text-decoration:none;"><h2 class="redHeading">' + content + '</h2></a>' + '\n' + '<p class="date">' + fullDate + '</p>' + '\n';
}
function generateSmallHeading(content) {
	return '<h3>' + content + '</h3>' + '\n';
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
	return '<figure>' + '\n' + '  <img src="' + source + '" alt="' + alt + '" style="width:' + size + 'vmin; display:inline; max-width:790px;">' + '\n' + '  <figcaption>' + caption + '</figcaption>' + '\n' + '</figure>' + '\n';
}
function fixTitle() {
	let title = document.getElementById("0").getElementsByClassName("here")[0].value;
	title = title.replaceAll(' ', '-');
	title = title.replaceAll('"', '');
	title = title.replaceAll('!', '');
	title = title.replaceAll('?', '');
	title = title.replaceAll('.', '');
	title = title.replaceAll("'", '');
	title = title.replaceAll(',', '');
	title = title.replaceAll('\\', '');
	title = title.replaceAll('/', '');
	title = title.replaceAll(':', '');
	title = title.replaceAll(';', '');
	title = title.toLowerCase();
	return title;
}
function generateUrl() {
	let title = fixTitle();
	title = 'https://flare145.com/blog/' + title;
	console.log(title);
	return title;
}
function generateFileName() {
	let title = fixTitle();
	title = title + '.html';
	return title;
}
function copyName(){
	navigator.clipboard.writeText(document.getElementById("outputFileName").value);
}
function copyAnchor(){
	navigator.clipboard.writeText('<a href="" rel="nopener" target="_blank"></a>');
}
function generateElement(element) {
	switch(element.className) {
		case 'heading':
		    return generateHeading(element.getElementsByClassName("here")[0].value)
		    break;
		case 'smallHeading':
		    return generateSmallHeading(element.getElementsByClassName("here")[0].value)
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
	document.getElementById("output").value = output;
	navigator.clipboard.writeText(document.getElementById("output").value);
	//document.getElementById("outputUrl").value = generateUrl();
	document.getElementById("outputFileName").value = generateFileName();
}

//Close popup is stolen from art.js and the other thingy is from settings.js
//there isnt a need to link those scripts entirely and it actually does weird stuff im just throwing these in here
function closePopup() {
	let newpage = document.getElementsByClassName("window")[0];
	newpage.innerHTML = '';
}

function readCookie(name) {
	if (document.cookie !== '') {
	    let allCookies = document.cookie.split('; ');
	    let cookieValue = allCookies.find(row => row.startsWith(name)).split('=')[1];
	    return cookieValue;
	}
}