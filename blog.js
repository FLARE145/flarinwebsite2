let names = {};

let postCount = 0;

let adCount = 0;

window.onload = function() {
	fetch("postlist.json")
	.then(response => response.json())
	.then(json => names = json)
	.then(firstLoad => loadPosts(0))
};



function loadPosts(start) {
	let postArray = [];
	for (let i = start; i < start + 10 && names.postTitle[i]; i++) {
		let currentPost = names.postTitle[i] + ".html";
		let postContents = "";
		postArray.push(fetch("/blog-posts/" + currentPost)
		.then(response => response.text())
		.then(text =>{
			postContents = text;
			return postContents;
		}))
	};
	Promise.all(postArray)
	.then(postList =>{
		for (let i = 0; postList[i]; i++) {
			addElement(postList[i]);
			postCount += 1;
		};
		if (postCount >= names.postTitle.length){
			document.getElementById("loadMore").remove();
		};
		adActivate();
	});
};

function adActivate(){
	if (document.getElementsByClassName('post')[0] != undefined){
		let ad = document.createElement("div");
		ad.classList.add("ad");
		let parentDiv = document.getElementById("posts");
		let secondPost = document.getElementsByClassName("post")[postCount - 7];
		parentDiv.insertBefore(ad, secondPost);
		let adNumber = Math.floor(Math.random()*2) + 1;
		fetch("ad" + adNumber + ".txt").then(function(response) {
		response.text().then(function(text) {
			ad = document.getElementsByClassName("ad")[adCount];
			ad.innerHTML = text;
			adCount += 1;
			});
		});
	};
};

function addElement(postContents){
	let elem = document.createElement("div");
	elem.classList.add("post");
	elem.innerHTML = postContents;
	document.getElementById("posts").appendChild(elem);
};

function triggerLoad(){
	loadPosts(postCount);
};