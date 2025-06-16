// ==============================
// 🌱 Sélection des éléments
// ==============================
const nom          = document.getElementById("nomParticipants"); 
const quantity     = document.getElementById("divNumber");
const inputBox     = document.getElementById("inputbox");
const displayZone  = document.querySelector(".display");
const add          = document.querySelector(".addBtn");
const warning      = document.querySelector("avertissement");
const stockageData = [];


// ==============================
// 🎊 Fonctionnalités
// ==============================





// je vais creer la fct pour ajouter les elems et leurs parametres

function addTask() {
    // Récupérer les valeurs actuelles des champs

    const nomValue      = nom.value;
    const quantityValue = quantity.value;
    const inputValue    = inputBox.value;
  
    // Vérification : tous les champs doivent être remplis
    if (!nomValue || !quantityValue || !inputValue) {
      alert("Tous les champs doivent être remplis !");
      return;
    }
    const taskObj = {
      name: nom,
      nombre: quantity,
      description: inputBox.value
    };
  
    // Stockage dans le tableau
    stockageData.push(taskObj);
  
    // Création de l'affichage
    const div = document.createElement("div");
    div.classList.add("task-card"); //pour styliser
  
    div.innerHTML = `
      
      <p> ${taskObj.name}</p>
      <p> ${taskObj.nombre}</p>
      <p> ${taskObj.description}</p>
    `
  
  
      let span = document.createElement("span");
      // innerhtml et le tring que je vais afficher dans le span 
      span.innerHTML = "✖️"
      // je fais accoucher le span a la balise div
      div.appendChild(span);
  
    displayZone.appendChild(div);
  
    // Réinitialisation des champs mais je suis pas sur du fonctionnement avec les selects :S
    nom.value       = "";
    quantity.value  = "";
    inputBox.value  = "";
  }



// je vais créer une fonction sauvegarde 
function saveData() {
    // je crée l'objet qui va checher les donnée (maClé, maValeur) 
    //  ici je stock le contenu  = elem capturé(id="diplay")
    localStorage.setItem("data",displayZone.innerHTML);
}

// je vais créer l'affichage avec un fonction
function displaySave() {
    // je définis le contenu comme étant égale a l'ojet json contenant 
    //les données sous le nom de "data"
    displayZone.innerHTML = localStorage.getItem("data")
}
displaySave();



// ==============================
// 🧲 Événements
// ==============================


// l'event au click "add" j'y ajoute ce qui ce produit lors du click 
add.addEventListener("click",() =>{
    event.preventDefault();
    addTask();
    saveData();
    
   
});



// displayZone.addEventListener("click",() =>{
//   event.preventDefault();
//   target.parentElement.remove();
//   saveData();
// });

displayZone.addEventListener('click',function (e) {
  // si je click sur une balise nommée ainsi alors
  if (e.target.closest(".task-card") && e.target.tagName !== "SPAN") {
      // toggle pour add/remove la classe
     e.target.closest(".task-card").classList.toggle("checked");
      saveData();

  // si je click sur une balise nommée span alors
  } else if (e.target.tagName === "SPAN"){
      //si je le fais sur le span , je lui applique un remove de niveau 5
      e.target.parentElement.remove();
      //je rappelle la save ici
     saveData();
  }
});

console.log(stockageData);