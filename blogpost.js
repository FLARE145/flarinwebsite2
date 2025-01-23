names = {};

url = window.location.href;

uri = url.substring(url.search("=") +1 , url.length);

window.onload = function() {
	fetch("postlist.json")
	.then(response => response.json())
	.then(json => names = json)
	.then(firstLoad => loadPost())
};

function loadPost(){
	let postArray = [];
	let postContents = "";
	let currentPost = uri + ".html";
	(fetch("/blog-posts/" + currentPost)
		.then(response => response.text())
		.then(text =>{
			postContents = text;
			document.getElementsByClassName("post")[0].innerHTML = postContents;
			adActivate();
			return postContents;
		}));
};

//ad
function adActivate(){
	if (document.getElementsByClassName('post')[0] != undefined){
		let ad = document.createElement("div");
		ad.classList.add("ad");
		let parentDiv = document.getElementById("posts");
		parentDiv.appendChild(ad);
		let adNumber = Math.floor(Math.random()*4) + 1;
		fetch("ad" + adNumber + ".txt").then(function(response) {
		response.text().then(function(text) {
			ad = document.getElementsByClassName("ad")[0];
			ad.innerHTML = text;
			});
		});
	};
};