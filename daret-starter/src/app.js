

// Daret — simulateur. Ton code commence ici.
const daretForm = document.getElementById('daret-form');
const name = document.getElementById('nom-cercle');
const nameErreur = document.getElementById('nom-cercle-erreur');
const cot = document.getElementById('cotisation');
const cotErreur = document.getElementById('cotisation-erreur');
const per = document.getElementById('periodicite');
const perErreur = document.getElementById('periodicite-erreur');
const date = document.getElementById('date-debut');
const dateErreur = document.getElementById('date-debut-erreur');
const regexNom = /^[A-Za-zÀ-ÿ\s-]+$/;
const regexCotisation = /^\d+(\.\d+)?$/;

const btnAjouterParticipant = document.getElementById('ajouter-participant');
const participantsListes = document.getElementById('participants-liste');
const participantsCompteur = document.getElementById('participants-compteur');
const participantsErreur = document.getElementById('participants-erreur');

const today = new Date().toISOString().split("T")[0];
date.setAttribute('min', today);

let participants = 0;

function creerParticipant(){
    participants++;
    const li = document.createElement('li');
    li.className = "flex items-center gap-2 mt-2";

    const input = document.createElement('input');
    input.type = "text";
    input.className = " rounded border border-daret-bordure px-3 py-2 bg-daret-fond";
    input.placeholder = `Prénom du participant ${participants}`;
    li.appendChild(input);

    const btnSupprimer = document.createElement('button');
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "Remove";
    btnSupprimer.className = "rounded border border-daret-bordure px-3 py-2 font-medium text-white hover:bg-daret-vert-clair ";
    btnSupprimer.style="background-color: #dc2626;"
    btnSupprimer.style.marginLeft = "8px";
    
    li.appendChild(btnSupprimer);
    participantsListes.appendChild(li);
    participantsCompteur.textContent = `participants ${participants}`;

    btnSupprimer.addEventListener('click', function(){
        if(participants <=2){
            participantsErreur.textContent = "Il faut au moins 2 participants.";
            participantsErreur.classList.remove('hidden');
            return;
        }

        li.remove();
        participants--;
        participantsCompteur.textContent = `participants ${participants}`;
        
        if(participants >= 2 && participants <= 20){
            participantsErreur.textContent ="";
            participantsErreur.classList.add('hidden');
        }
        
    });
}
for (let i = 0 ; i < 3; i++){
    creerParticipant();
}

btnAjouterParticipant.addEventListener('click', function(){
    if(participants >= 20){
        participantsErreur.textContent = "Le nombre maximum est 20.";
        participantsErreur.classList.remove('hidden');
        return;
    }
    participantsErreur.textContent = "";
    participantsErreur.classList.add('hidden');
    creerParticipant();
});


daretForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    const word = name.value.trim();
    if(word === "" || !regexNom.test(word) || word.length < 3 || word.length > 40){
        nameErreur.textContent = "Le nom du cercle doit contenir entre 3 et 40 caractères (lettres, chiffres, espaces, tirets).";
        nameErreur.classList.remove('hidden');
    }else{
        nameErreur.textContent = "";
        nameErreur.classList.add('hidden');
    }
    const cotValue = Number(cot.value);
    if(cot.value.trim() === "" || !Number.isInteger(cotValue) || cotValue < 100 || cotValue > 50000){
        cotErreur.textContent = "La cotisation doit être un nombre entier entre 100 et 50 000 MAD.";
        cotErreur.classList.remove('hidden');
    }else{
        cotErreur.textContent = "";
        cotErreur.classList.add('hidden');
    }

    if(per.value === ""){
        perErreur.textContent = "Veuillez choisir une périodicité.";
        perErreur.classList.remove('hidden');
    }else{
        perErreur.textContent = "";
        perErreur.classList.add('hidden');
    }
    
    if(date.value === "" || date.value < today){
        dateErreur.textContent = "Veuillez entrer une date de début valide (aujourd'hui ou plus tard).";
        dateErreur.classList.remove('hidden');
    }else{
        dateErreur.textContent = "";
        dateErreur.classList.add('hidden');
    }
        //    us-03
    const cotVal = Number(cot.value);
    const perVal = per.value;
    const dateVal = date.value;

    const recu = calculerMontantRecu(cotVal, participants);
    const verse = calculerTotalVerse(cotVal, participants);
    const par = PARTICIPANTS(participants);
    const dateFin = calculerDateFin(perVal, participants, dateVal);

    document.getElementById('contenu-resultat').classList.remove('hidden');
    document.getElementById('resume-cagnotte').textContent = recu +" DH"
    document.getElementById('resume-total-cycle').textContent = verse + " DH";
    document.getElementById('resume-nb-tours').textContent = par + " Tour";
    document.getElementById('resume-dates').textContent = dateVal + " ➔ " + dateFin;

            //   us-04
    ordre = null;
    genererCalendrier();
    
});

            // us-03
function calculerMontantRecu(cot, participants){
    return cot * participants;
}
function calculerTotalVerse(cot, participants){
    return cot * participants;
}

function PARTICIPANTS(participants){
    return participants;
}

function calculerDateFin(periodicite, participants, Tdate ){
    const date = new Date(Tdate)
    const tour = participants - 1;

    if (periodicite === "mensuelle"){
        date.setMonth(date.getMonth() + tour)
    }

    if(periodicite === "hebdomadaire"){
        date.setDate(date.getDate() + (tour * 7))
    }

    if(periodicite === "quinzaine"){
        date.setDate(date.getDate() + (tour * 15))
    }

    return date.toISOString().split("T")[0];

}  

function queryParticipants(){
const Nparticipantsliste = document.querySelectorAll('#participants-liste input')
let newParticipants = [];
for (let input of Nparticipantsliste){
    newParticipants.push(input.value)
}
return newParticipants;
}



function genererCalendrier(){
    const Tbody = document.getElementById('calendrier-corps');
    Tbody.innerHTML = "";
    const laDate =  new Date(date.value);
    const participantsNoms = ordre || queryParticipants();
    let k = 0;
    const some = document.createElement('p')
    participantsNoms.forEach((nom, index) =>{
       const tr = document.createElement('tr');

       const tdTour = document.createElement('td');
       tdTour.textContent = index + 1;
       tdTour.className = "px-4 py-3"
       tr.appendChild(tdTour);

       const tdDate = document.createElement('td');
       tdDate.textContent = laDate.toLocaleDateString('fr-FR', {day: 'numeric', month:'long', year: 'numeric' });
       tdDate.className = "px-4 py-3"
       tr.appendChild(tdDate);

       const tdNom = document.createElement('td')
       tdNom.textContent = nom;
       tdNom.className = "px-4 py-3"
       tr.appendChild(tdNom);
       

       if(per.value === "mensuelle"){
        laDate.setMonth(laDate.getMonth() + 1)
       }
       if(per.value === "quinzaine"){
        laDate.setDate(laDate.getDate() + 15)
       }
       if(per.value === "hebdomadaire"){
        laDate.setDate(laDate.getDate() + 7)
       }

       const TdMontant = document.createElement('td');
       TdMontant.textContent = (cot.value * participantsNoms.length) + " DH";
       TdMontant.className = "px-4 py-3"
       tr.appendChild(TdMontant);

       const TdStatus = document.createElement('td');
       TdStatus.textContent = "À venir";
       TdStatus.classList.add("status")
       tr.appendChild(TdStatus)
       
       const TdButton = document.createElement('button');
       TdButton.textContent = "Terminé";
       TdButton.className="mt-3 rounded border border-daret-vert px-4 py-2 font-medium text-daret-vert hover:bg-daret-vert-clair focus:outline-2 focus:outline-offset-2 focus:outline-daret-vert"
       TdButton.addEventListener("click", function(){
       let change = TdButton.closest('tr');
       if(TdButton.textContent =="Terminé"){
        TdButton.textContent = "Annuler";
        change.querySelector(".status").textContent ="Terminé";
        k++
       }else{
        TdButton.textContent = "Terminé";
        change.querySelector(".status").textContent = "À venir"
        k--
       }
       
       some.textContent = k+ " tours terminés sur "+ participants;
       
    })
    tr.appendChild(TdButton);
    
    Tbody.appendChild(tr)
    Tbody.appendChild(some)
})
    
}
let ordre = null
document.getElementById('tirage-au-sort').onclick = function(){
    ordre = [];
    const noms = queryParticipants()
    while(noms.length > 0){
        const i = Math.floor(Math.random() * noms.length)
        ordre.push(noms[i]);
        noms.splice(i, 1)
    }
    genererCalendrier();
}

document.getElementById('ordre-saisie').onclick = function (){
    ordre = null;
    genererCalendrier();
}
