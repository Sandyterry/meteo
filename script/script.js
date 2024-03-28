const buttons = document.querySelectorAll("button");
const meteoDiv = document.querySelector('.infoMeteo');
let srcImgMeteo;

// Événement "mouseover" pour afficher le nom de la ville
buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        fetch(`http://57.129.5.9:3000/villes/${button.className}/`)
            .then(response => response.json())
            .then(data => {
                updateButtonProperties(button, data);
            });
    });
});

// Événement "mouseleave" pour remettre le bouton a son état inital
buttons.forEach(button => {
    button.addEventListener("mouseleave", () => {
        resetButtonProperties(button);
    });
});

// Événement "click" pour affiche l'onglet météo
buttons.forEach(button => {
    button.addEventListener("click", () => {
        fetch(`http://57.129.5.9:3000/villes/${button.className}/`)
            .then(response => response.json())
            .then(data => {
                displayWeatherInfo(data);
            });
    });
});

// Fonction pour mettre à jour les propriétés du bouton
function updateButtonProperties(button, data) {
    button.textContent = data.nom;
    button.style.width = "auto";
    button.style.height = "auto";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "#0071bc";
    button.style.border = "2px solid aliceblue";
}

// Fonction pour réinitialiser les propriétés du bouton
function resetButtonProperties(button) {
    button.textContent = "";
    button.style.width = "30px";
    button.style.height = "30px";
    button.style.borderRadius = "50%";
    button.style.backgroundColor = "aliceblue";
    button.style.border = "2px solid #0071bc";
}

// Fonction pour afficher la météo
function displayWeatherInfo(data) {
    urlImgMeteo(data.conditionsMeteo);
    meteoDiv.style.display = "flex";
    meteoDiv.innerHTML = `<h2>${data.nom}</h2>
                    <p>Temperature : ${data.temperature}°C</p>
                    <p>Conditions Météo: ${data.conditionsMeteo}</p>
                    <img src=${srcImgMeteo} alt="Logo-Meteo">
                    <p>Humidité: ${data.humidite}%</p>
                    <p>Précipitations: ${data.precipitations}%</p>
                    <p>Indice UV ${data.indiceUV}</p>`;
}

// Fonction pour déterminer l'URL de l'image en fonction de la météo
function urlImgMeteo(conditionsMeteo) {
    if (conditionsMeteo === "Pluvieux") {
        srcImgMeteo = "../img/pluie.png";
    }
    if (conditionsMeteo === "Ensoleillé") {
        srcImgMeteo = "../img/soleil.png";
    }
    if (conditionsMeteo === "Nuageux") {
        srcImgMeteo = "../img/nuage.png";
    }
}
