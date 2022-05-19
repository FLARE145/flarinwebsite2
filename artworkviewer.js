let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let image = urlParams.get('i');

let imageLink = '';
let png = new Image();
png.src = '/art-images/' + image + '.png';


//Loads Image. I did not write this code for the most part.
png.onload = function() {
    // image exists and is loaded
    document.getElementsByClassName("bigImageHolder")[0].appendChild(png);
	imageLink = 'https://flare145.com/art-images/' + image + '.png';
}
png.onerror = function() {
    // image did not load

    let jpg = new Image();
    jpg.src = '/art-images/' + image + '.jpg';

    document.getElementsByClassName("bigImageHolder")[0].appendChild(jpg);
	imageLink = 'https://flare145.com/art-images/' + image + '.jpg';
}

let imageInfo = {};

//this was copied from mozilla docs. no clue how it works but it reads files
fetch('https://flare145.com/image-info/' + image + '.json')
  .then(response => response.json())
  .then(data => {
	imageInfo = data;
	let title = document.createElement("p");
	title.innerText = imageInfo.title;
	document.getElementsByClassName("post")[0].appendChild(title);
	let medium = document.createElement("p");
	medium.innerText = imageInfo.medium;
	document.getElementsByClassName("post")[0].appendChild(medium);
	let resolution = document.createElement("p");
	resolution.innerText = imageInfo.resolution;
	document.getElementsByClassName("post")[0].appendChild(resolution);
	let size = document.createElement("p");
	size.innerText = imageInfo.size;
	document.getElementsByClassName("post")[0].appendChild(size);
	let description = document.createElement("p");
	description.innerText = imageInfo.description;
	document.getElementsByClassName("post")[0].appendChild(description);
});

function linkTo() {
	window.open(imageLink, '_blank');
}

