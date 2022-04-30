const path2thumbs = [
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Blumenkohl-Fenchel-Suppe%20mit%20Madras-Curry%20und%20Brezelcroutons.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Blumenkohl-Nudel-Auflauf.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Bohnen%20mit%20Schafsk%C3%A4se.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Brokkoli-Nudel-Auflauf.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Chicor%C3%A9e%20mit%20Schinken.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Chinesisch%20gebratene%20Nudeln%20mit%20H%C3%BChnchenfleisch,%20Ei%20und%20Gem%C3%BCse.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Dolma%20mit%20Minze-Bulgur.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Eier%20in%20Senfsauce%20mit%20Bratkartoffeln.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Fettucine%20mit%20Lachs-Mohn-Sauce.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Fischfilet%20paniert%20mit%20Estragon-Karotten.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Fusilli%20mit%20Tomatensauce.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Gem%C3%BCse-Curry.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Griechischer%20Salat.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Heringssalat%20mit%20Pellka.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Huhn%20in%20Kokos-Gem%C3%BCsesauce%20mit%20Nudeln.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Kasseler%20Lachs%20mit%20Polenta.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Kohl-Karotten-Quiche.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Kokos-Zitronen-H%C3%A4hnchen.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Lachsfilet%20mit%20Fenchel-Orangen-Gem%C3%BCse.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Minestrone.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Moules%20%C3%A0%20la%20proven%C3%A7ale.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Pardulas%20%E2%80%93%20s%C3%BC%C3%9Fe%20und%20herzhafte.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Peperoncini%20alla%20turca.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Pizza.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Ragout%20fruschtique.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Ravioli%20in%20Tomatensauce.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Rote%20Bete-Salat%20mit%20Bratkartoffeln%20und%20Spiegelei.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/R%C3%BChrei%20mit%20Pilzen,%20Paprika%20und%20Speck.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Sauerkraut-Rahmsuppe%20mit%20Brezel-Cro%C3%BBtons.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Spaghetti%20mit%20Pesto%20rosso.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Spaghetti%20mit%20Tomatensugo.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Spinat-Pfannkuchen%20mit%20Lauchgem%C3%BCse.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Spitzkohlsalat.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Tom%20Khaa%20Kai.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Tortilla%20de%20Chili%20y%20Culantro.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/%C3%9Cberbackener%20Fenchel.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Vialla-Nudeln%20mit%20Rapunzel-Pesto.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Wraps.jpg',
  'https://storage.googleapis.com/testx.fruschtique.de/thumbs/Zucchini-Puffer%20mit%20Joghurt-Dill-Sauce.jpg'
]
let err;

/*async function fetchResource(pathToResource) {
  try {
    err = null;
    const response = await fetch(pathToResource);
    if (!response.ok) {
      throw Error(`${response.status}`);
    }
    return response;
  } catch (e) {
    err = e.message;
  }
}*/
function fetchResource(path) {

	fetch(path, {
			cache: "no-store"
		})
		.then(function (response) {
			console.log(response.ok);
			if (!response.ok) {
				throw new Error(`Error - Status: ${response.status}`);
			}
			return response.blob();
		})
		.then((resp) => {
			const imgUrl = URL.createObjectURL(resp);
			const imageEl = document.createElement('img');
			imageEl.src = imgUrl;
			document.body.appendChild(imageEl);
		})
		.catch(function (err) {
			console.log(err);
		})
}

/*function showImage(responseAsBlob) {
  const imgUrl = URL.createObjectURL(responseAsBlob);
  const imageEl = document.createElement('img');
  imageEl.src = imgUrl;
  document.body.appendChild(imageEl);
}*/
for (let thumb of path2thumbs) {

  fetchResource(thumb);
}
