/*const recipeNames = [
 '01 Q1/Blumenkohl-Fenchel-Suppe mit Madras-Curry und Brezelcroutons',
 '01 Q1/Blumenkohl-Nudel-Auflauf',
 '01 Q1/Bohnen mit Schafskäse',
 '01 Q1/Brokkoli-Nudel-Auflauf',
 '01 Q1/Chicorée mit Schinken',
 '01 Q1/Chinesisch gebratene Nudeln mit Hühnchenfleisch, Ei und Gemüse',
 '01 Q1/Dolma mit Minze-Bulgur',
 '01 Q1/Eier in Senfsauce mit Bratkartoffeln',
 '01 Q1/Fettucine mit Lachs-Mohn-Sauce',
 '01 Q1/Fischfilet paniert mit Estragon-Karotten',
 '01 Q1/Fusilli mit Tomatensauce',
 '01 Q1/Gemüse-Curry',
 '01 Q1/Griechischer Salat',
 '01 Q1/Heringssalat mit Pellka',
 '01 Q1/Huhn in Kokos-Gemüsesauce mit Nudeln',
 '01 Q1/Kasseler Lachs mit Polenta',
 '01 Q1/Kohl-Karotten-Quiche',
 '01 Q1/Kokos-Zitronen-Hähnchen',
 '01 Q1/Lachsfilet mit Fenchel-Orangen-Gemüse',
 '01 Q1/Minestrone',
 '01 Q1/Moules à la provençale',
 '01 Q1/Pardulas – süße und herzhafte',
 '01 Q1/Peperoncini alla turca',
 '01 Q1/Pizza',
 '01 Q1/Ragout fruschtique',
 '01 Q1/Rote Bete-Salat mit Bratkartoffeln und Spiegelei',
 '01 Q1/Rührei mit Pilzen, Paprika und Speck',
 '01 Q1/Sauerkraut-Rahmsuppe mit Brezel-Croûtons',
 '01 Q1/Spaghetti mit Pesto rosso',
 '01 Q1/Spaghetti mit Tomatensugo',
 '01 Q1/Spinat-Pfannkuchen mit Lauchgemüse',
 '01 Q1/Spitzkohlsalat',
 '01 Q1/Tom Khaa Kai',
 '01 Q1/Tortilla de Chili y Culantro',
 '01 Q1/Überbackener Fenchel',
 '01 Q1/Vialla-Nudeln mit Rapunzel-Pesto',
 '01 Q1/Wraps',
 '01 Q1/Zucchini-Puffer mit Joghurt-Dill-Sauce',
 '02 Q2/Artischocken mit Joghurt-Dill-Sauce',
 '02 Q2/Bohnensuppe',
 '02 Q2/Butter Chicken mit Naan',
 '02 Q2/Entenbrust mit Spitzkohl und Semmelknödeln',
 '02 Q2/Fettucine mit Lachs-Mohn-Sauce',
 '02 Q2/Fischfilet paniert mit Estragon-Karotten',
 '02 Q2/Gemüse-Curry',
 '02 Q2/Handkäs mit Musik',
 '02 Q2/Huhn in Kokos-Gemüsesauce mit Nudeln',
 '02 Q2/Lauchkuchen vom Blech',
 '02 Q2/Minestrone',
 '02 Q2/Putengeschnetzeltes Szechuan',
 '02 Q2/Ravioli in Tomatensauce',
 '02 Q2/Schwarzwurzeln mit Bratkartoffeln',
 '02 Q2/Schweinefilet im Blätterteig',
 '02 Q2/Spaghetti mit Bärlauchpesto',
 '02 Q2/Spinat-Quiche',
 '02 Q2/Sülze mit Bratkartoffeln und Karotten-Fenchel-Salat',
 '02 Q2/Wraps',
 '02 Q2/Zwiebelkuchen'
 ]*/

// keep in mind: img and thumbs pathes don't include chapter info
const basePathThumbs = 'https://storage.googleapis.com/testx.fruschtique.de/thumbs/';
const basePathImg = 'https://storage.googleapis.com/testx.fruschtique.de/img/';
const basePathRecipes = 'https://menu-22.fruschtique.de/recipes/'
let i = 0;
let innerCarousel = document.getElementById('inner');
// get image
function fetchResource(recipeName) {
	let path2Thumb = basePathThumbs;
	path2Thumb += recipeName.substring(recipeName.indexOf('/') + 1);
	path2Thumb += '.jpg';
	fetch(path2Thumb, {
		cache: "no-store"
	}).then(function (response) {
		if (!response.ok) {
			throw new Error(`Error - Status: $ {
                response.status
            }
            `);
		}
		return response.blob();
	}).then((resp) => {
		const imgUrl = URL.createObjectURL(resp);
		buildCarousel(i++, recipeName, imgUrl);
	}).catch(function (err) {})
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
apiKey = localStorage.getItem('apiKey');
hdrs = {
	'Accept': 'application/vnd.github.v3+json',
	'Authorization': apiKey
}
// create list of recipes
let url_str;
let myColl = 'Sammlung_2022';
url_str = `https://api.github.com/repos/nluttenberger/${myColl}/contents`;
fetch(url_str, {
	headers: hdrs
}).then(resp => {
	return resp.json();
}).then(data => {
	let ix = data.indexOf(data.filter(function (item) {
		return item.path === "recipes_xml"
	})[0])
	let sha = data[ix].sha;
	url_str = `https://api.github.com/repos/nluttenberger/${myColl}/git/trees/${sha}?recursive=true`;
	fetch(url_str, {
		headers: hdrs
	}).then(resp => {
		console.log('Sammlungsindex eingelesen: ', resp.status, resp.statusText);
		return resp.json()
	}).then(data => {
		let tree = data.tree;
		tree.sort(function (a, b) {
			return a.path.localeCompare(b.path, 'de-DE-1996')
		});
		let recp;
		for (let entry of tree) {
			recp = entry.path;
			recp = recp.substring(0, recp.indexOf('.xml'))
			fetchResource(recp);
		}
	}).catch((error) => {
		console.log('Error while reading directory listings:', error);
	})
}).catch((error) => {
	console.log('Error while reading collection sha:', error);
})

/*let oLength = document.getElementById('allRecipesList').options.length;
 let arr = [];
 let x;
 for (let i=0;i<oLength;i++) {
 x = document.getElementById('allRecipesList').options[i].value;
 arr.push (x);
 }
 console.log (arr);*/
