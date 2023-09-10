const dropdown = document.getElementById('dropdown');
const imageDiv = document.getElementById('image-container');



let API_ID = ;
let breeds = {};

const getCatBreeds = () => {
    fetch("https://api.thecatapi.com/v1/breeds").then((response) => response.json()).then((data) => )
}

const populateBreeds = () 