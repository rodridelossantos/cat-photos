const dropdown = document.getElementById("dropdown");
const imageDiv = document.getElementById("image-container");

let API_ID =
  "live_3epzTEAQb7m3dLHYFZWgNlx7MuEmuyP6aTXuLhIKOB7yQLUBINIwpazCURpyvZ58";
let breeds = [];

const getCatBreeds = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  return populateBreeds(data);
};

const populateBreeds = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let { id, name } = arr[i];
    let obj = { id: id, name: name };
    breeds.push(obj);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getCatBreeds();
});
