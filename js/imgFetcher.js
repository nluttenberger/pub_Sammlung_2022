const basePathThumbs = 'https://storage.googleapis.com/testx.fruschtique.de/thumbs/';
const basePathImg = 'https://storage.googleapis.com/testx.fruschtique.de/img/';
const basePathRecipes = 'https://menu-22.fruschtique.de/recipes/'
let i = 0;
let innerCarousel = document.getElementById('inner');

// get image
function fetchResource(recipeName) {
	let path2Img = basePathImg;
	path2Img += recipeName.substring(recipeName.indexOf('/') + 1);
	path2Img += '.jpg';
	console.log (path2Img);
	/*fetch(path2Thumb, {
		cache: "no-store"
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Could not read image');
			}
			return response.blob()
		})
		.then((resp) => {
			const imgUrl = URL.createObjectURL(resp);
			buildCarousel(i++, recipeName, imgUrl);
	})
		.catch(function (err) {
			console.log (err);
	})*/
}
// add image to carousel
function buildCarousel(i, recipeName, imgUrl) {
	const imgDiv = document.createElement('div');
	imgDiv.className = 'item';
	const linkEl = document.createElement('a');
	linkEl.href = basePathRecipes + recipeName + '.html';
	linkEl.target = '_blank';
	const imageEl = document.createElement('img');
	imageEl.src = imgUrl;
	linkEl.appendChild(imageEl);
	imgDiv.appendChild(linkEl);
	innerCarousel.appendChild(imgDiv);
	if (i === 0) {
		imgDiv.classList.add('active')
	}
}
// start here onload
// keep in mind: img and thumbs paths don't include chapter info
let myCat;
myCat = window.location.pathname;
myCat = decodeURI(myCat.substring(myCat.lastIndexOf('-')+1));
myCat = myCat.substring(0,myCat.indexOf('.html'))
let oLength = document.getElementById(myCat).options.length;
let rcpArr = [];
for (let i=0;i<oLength;i++) {
	rcpArr.push (document.getElementById(myCat).options[i].value);
}
// set links to recipes
let x;
let myBase = window.location.origin;
for (let rcp of rcpArr) {
	x = `<li><a href="${myBase}/recipes/${rcp}.html" target="_blank"> ${rcp}</a></li>`;
	$('#catRcpList').append(x);
}
// get recipe images
for (let rcp of rcpArr) {
	recp = recp.substring(0, recp.indexOf('.xml'));
	let xx = recp.substring(recp.indexOf('/')+1);
	if (rcp.length > 0 && xx.match(re)===null) {
		fetchResource(recp);
	}
}

