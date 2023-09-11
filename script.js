const imageDiv = document.getElementById("image-container");
const breedOptions = document.getElementById("breed-options");
const breedDescription = document.getElementById("breed-description");
const breedName = document.getElementById("breed-name");
const breedOrigin = document.getElementById("breed-origin");

let breeds = [];

// Hacemos petición a la API y populamos el array breeds con todas las posibles razas de los gatos.

const getCatBreeds = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  return populateBreeds(data);
};

// Creamos un objeto con info de cada gato y lo pusheamos al array breeds.

const populateBreeds = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { id, name, description, origin } = arr[i];
    let obj = { id: id, name: name, desc: description, origin: origin };
    breeds.push(obj);
  }
};

// Rellenamos el elemento select con los nombres y ids de cada raza.

const populateSelect = (arr) => {
  let htmlContent = "";
  for (let i = 0; i < arr.length; i++) {
    let { id, name } = arr[i];
    htmlContent += `<option value=${id}>${name}</option> `;
  }
  breedOptions.innerHTML = htmlContent;
};

// Hacemos un request a la api que nos devuelve una imágen random de un gato. Le pasamos la id del gato como parámetro.
// Mostramos en pantalla imágen e información del gato.

const getCatImageAndInfo = async (catId) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`
  );
  const image = await response.json();
  const cat = breeds.find(({ id }) => id === catId);
  imageDiv.innerHTML = `
    <img src=${image[0].url} class="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl">
  `;
  breedDescription.textContent = cat.desc;
  breedName.textContent = cat.name;
  breedOrigin.textContent = cat.origin;
};

//

document.addEventListener("DOMContentLoaded", async () => {
  await getCatBreeds();
  populateSelect(breeds);

  // Cada vez que cambiemos la opción del dropdown, se muestra en pantalla un gato.

  breedOptions.addEventListener("change", (e) => {
    let selectedCatBreed = e.target.value;
    getCatImageAndInfo(selectedCatBreed);
  });
});
