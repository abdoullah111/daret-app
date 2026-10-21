// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
const daretForm = document.getElementById('daret-form');
const name = document.getElementById('nom-cercle');
const nameErreur = document.getElementById('nom-cercle-erreur');
const cot = document.getElementById('cotisation');
const cotErreur = document.getElementById('cotisation-erreur');
const per = document.getElementById('periodicite');
const perErreur = document.getElementById('periodicite-erreur');
const date = document.getElementById('date-debut');
const dateErreur = document.getElementById('date-debut-erreur');
const regexNom = /^[\wÀ-ÿ\s-]+$/;
const regexCotisation = /^\d+(\.\d+)?$/;

const today = new Date().toISOString().split("T")[0];
date.setAttribute('min', today)

daretForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const word = name.value.trim();
    if(word === "" || !regexNom.test(word) || word.length < 3 || word.length > 40){
        nameErreur.textContent = "Le nom du cercle doit contenir entre 3 et 40 caractères (lettres, chiffres, espaces, tirets).";
        nameErreur.classList.remove('hidden')
    }else{
        nameErreur.textContent = "";
        nameErreur.classList.add('hidden')
    }
    const cotValue = Number(cot.value)
    if(cot.value.trim() === "" || !Number.isInteger(cotValue) || cotValue < 100 || cotValue > 50000){
        cotErreur.textContent = "La cotisation doit être un nombre entier entre 100 et 50 000 MAD.";
        cotErreur.classList.remove('hidden')
    }else{
        cotErreur.textContent = "";
        cotErreur.classList.add('hidden')
    }

    if(per.value === ""){
        perErreur.textContent = "Veuillez choisir une périodicité.";
        perErreur.classList.remove('hidden')
    }else{
        perErreur.textContent = "";
        perErreur.classList.add('hidden')
    }
    
    if(date.value === "" || date.value < today){
        dateErreur.textContent = "Veuillez entrer une date de début valide (aujourd'hui ou plus tard).";
        dateErreur.classList.remove('hidden')
    }else{
        dateErreur.textContent = "";
        dateErreur.classList.add('hidden') 
    }
})


