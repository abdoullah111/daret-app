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

    if(name.value.trim() === "" || !regexNom.test(name.value)){
        nameErreur.textContent = "Veuillez entrer un nom de cercle valide."
    }else{
        nameErreur.textContent = "";
    }
    const cotValue = Number(cot.value)
    if(cot.value.trim() === "" || !Number.isInteger(cotValue) || cotValue < 100 || cotValue > 50000){
        cotErreur.textContent = "La cotisation doit être un nombre entier entre 100 et 50 000 MAD.";
    }else{
        cotErreur.textContent = "";
    }

    if(per.value === ""){
        perErreur.textContent = "Veuillez choisir une périodicité.";
    }else{
        perErreur.textContent = "";
    }
    
    if(date.value === ""){
        dateErreur.textContent = "Veuillez entrer une date de début valide."
    }else{
        dateErreur.textContent = "";
    }
})


