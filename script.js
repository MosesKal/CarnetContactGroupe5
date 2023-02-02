const form = document.getElementById('form');
let fileURL;
let file;
const imageZone = document.querySelector('.image_zone');
const spanClick = document.querySelector('.span-click');
const buttonReset = document.getElementById('reset');
const buttonSubmit = document.getElementById('create');
const inputFile = document.getElementById('inputFile');
const erreurs = {};

// Fonctions de validation===========================================================
function showErrorMessage(message, elementId, elementErrorId){

  if(message.length !== 0){
    document.getElementById(elementId).style.borderColor = "red";
    document.getElementById(elementErrorId).style.color="red"
    document.getElementById(elementErrorId).innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation">       </i></span>${message}</p>`;
  }else{
    document.getElementById(elementId).style.borderColor = "";
    document.getElementById(elementErrorId).style.color=""
    document.getElementById(elementErrorId).innerHTML = "";
  }
}
function validPrenom(){
    let prenom =form.elements.prenom.value
    if (prenom.length < 3) {
        erreurs['prenom'] = {
            value: 'renseigner un prenom avec plus de 3 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        }

        showErrorMessage(erreurs.prenom.value, 'prenom', 'prenomErr');

    }else if (prenom.length > 50) {
            erreurs['prenom'] = {
            value: 'renseigner un nom avec moins de 50 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        }
        showErrorMessage(erreurs.prenom.value, 'prenom', 'prenomErr');

    }else{
      showErrorMessage('', 'prenom', 'prenomErr');
        delete erreurs.prenom;
    }
}
function validNom(){
    let nom = form.elements.nom.value
    if(nom.length < 3) {
        if (nom.length === 0) {
          showNoError(nom, nomErr)
          }else{
       erreurs['nom']= {
            value: 'renseigner un nom avec plus de 3 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        }
           showErrorMessage(erreurs.nom.value, 'nom', 'nomErr');
    }
    }else if (nom.length > 50) {
        erreurs['nom']= {
            value: 'renseigner un nom avec moin de 50 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        }
      showErrorMessage(erreurs.nom.value, 'nom', 'nomErr');
    }else{
      showErrorMessage('', 'nom', 'nomErr');
        delete erreurs.nom;
    }
}
function validPhone(){
    let telephone = form.elements.telephone.value
    let phoneReg = /^\d+$/;
    let validPrefixes = ["084", "085", "080", "089", "081", "082", "083", "099", "097", "090"];
    if(!phoneReg.test(telephone)) {
        erreurs['phone']= {
            value: 'renseigner un numéro de téléphone valide',
            writable : true,
            enumerable : true,
            configurable : true
        };
      showErrorMessage(erreurs.phone.value, 'telephone', 'phoneErr');
    }else if (telephone.length !== 10) {
         erreurs['phone']= {
            value: 'renseigner un numéro de téléphone avec 10 chiffres',
            writable : true,
            enumerable : true,
            configurable : true
        };
       showErrorMessage(erreurs.phone.value, 'telephone', 'phoneErr');
    }else if (!validPrefixes.includes(telephone.substring(0, 3))) {
        erreurs['phone']= {
            value: 'renseigner un numéro de téléphone au format valide',
            writable : true,
            enumerable : true,
            configurable : true
        };
       showErrorMessage(erreurs.phone.value, 'telephone', 'phoneErr');
    }else{
      showErrorMessage('', 'telephone', 'phoneErr');
        delete erreurs.phone;
    }
}
function validEmail(){
    let email = form.elements.email.value
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        erreurs['email'] = {
            value: 'Veuillez saisir une adresse email valide',
            writable : true,
            enumerable : true,
            configurable : true
        }
      showErrorMessage(erreurs.email.value, 'email', 'emailErr');
    }
    else {
      showErrorMessage('', 'email', 'emailErr');
        delete erreurs.email;
    }
}
// Zone image========================================================================
function displayImg(){
    let fileReader = new FileReader()
    fileReader.onload = () => {
        fileURL = fileReader.result;
        let imgTag = `<img src = "${fileURL}" alt = "" >`;
        imageZone.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(file);
} 
function showErreursImage(message, elementErrorId) {
  imageZone.style.borderColor = "red"
  imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
  document.getElementById(elementErrorId).style.color="red"
  document.getElementById(elementErrorId).innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>${message}</p>`;
}

imageZone.addEventListener('dragover', (event) => {      
    event.preventDefault();
    imageZone.textContent = 'Relacher image';
    imageZone.classList.add('active');
});

imageZone.addEventListener('dragleave', () => {
    imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`;
    imageZone.classList.remove('active');
});

imageZone.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    let fileType = file.type;
    let validExt = ['image/jpeg','image/jpg','image/png'];

    if(file.size >1000000){
        erreurs['image'] = {
            value: 'le poids de l’image doit être inférieur à 1 Mo',
            writable : true,
            enumerable : true,
            configurable : true
        }
      showErreursImage(erreurs.image.value, 'imgErr')
    }else if(!validExt.includes(fileType)){
         erreurs['image'] = {
            value: "Ce fichier n'est pas une image",
            writable : true,
            enumerable : true,
            configurable : true
        }
      showErreursImage(erreurs.image.value, 'imgErr')
    }
    else{
        imageZone.style.borderColor = ""
        document.getElementById("imgErr").style.color=""
        document.getElementById("imgErr").innerHTML = "";
        displayImg();
        delete erreurs.image;
    }
});

spanClick.onclick = () => {
    inputFile.click();
}
inputFile.addEventListener('change', () => {
    file = inputFile.files[0];
    displayImg();
});

buttonReset.addEventListener('click', function(){
    location.reload();
});

// Ajouter contact===================================================================
form.addEventListener('submit', function(e){

    if(Object.keys(erreurs).length === 0){

        if(localStorage.hasOwnProperty('contacts')){
            const newcontacts = JSON.parse(localStorage.getItem('contacts'));
            const contactUpdate = {
                'prenom' : form.elements.prenom.value,
                'nom': form.elements.nom.value,
                'telephone' : form.elements.telephone.value,
                'groupe': form.elements.groupe.value,
                'email': form.elements.email.value,
                'bio': form.elements.bio.value,
                'image': fileURL
            };
            // Modifier contact======================================================
            if(buttonSubmit.textContent === 'Modifier'){
                localStorage.removeItem('contacts');
              const key = this.getAttribute('data-key');
                const contactsUpdated = newcontacts.map(function(contact){
                    if(newcontacts[index].telephone === form.elements.telephone.value){
                        return contactUpdate;
                    }else{
                        return contact;
                    }
                });
                localStorage.setItem('contacts', JSON.stringify(contactsUpdated));
                location.reload();
              // ====================================================================
            }else{

                const messagesErreurs = [];

                for(index in newcontacts){
                    if(newcontacts[index].telephone === form.elements.telephone.value){
                        messagesErreurs.push('Ce numero existe');
                    }
                    if(newcontacts[index].email === form.elements.email.value){
                        messagesErreurs.push('Ce mail exist');
                    }
                }
                if(messagesErreurs.length !== 0){
                    for(index in messagesErreurs){
                        if(messagesErreurs[index] === 'Ce numero existe'){
                            document.getElementById("telephone").style.borderColor = "red";
                            document.getElementById("phoneErr").style.color="red"
                            document.getElementById("phoneErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un autre numéro, ce numéro existe</p>`;
                            e.preventDefault();
                        }
                        if(messagesErreurs[index] === 'Ce mail exist'){
                          document.getElementById("email").style.borderColor = "red";
                            document.getElementById("emailErr").style.color="red"
                            document.getElementById("emailErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>Ce mail existe</p>`
                            e.preventDefault();
                        }
                    }
                }else{
                    localStorage.removeItem('contacts');
                    newcontacts.push({
                        'prenom' : form.elements.prenom.value,
                        'nom': form.elements.nom.value,
                        'telephone' : form.elements.telephone.value,
                        'groupe': form.elements.groupe.value,
                        'email': form.elements.email.value,
                        'bio': form.elements.bio.value,
                        'image': fileURL
                    });
                    localStorage.setItem('contacts', JSON.stringify(newcontacts));
                }
            } 
        }else{
            const contacts = [];
            contacts.push({                    
                'prenom' : form.elements.prenom.value,
                'nom': form.elements.nom.value,
                'telephone' : form.elements.telephone.value,
                'groupe': form.elements.groupe.value,
                'email': form.elements.email.value,
                'bio': form.elements.bio.value,
                'image': fileURL
            });
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }

    }
});
// Afficher contacts=================================================================
if(localStorage.hasOwnProperty('contacts')){
    const newcontacts = JSON.parse(localStorage.getItem('contacts'));
    const conteneurContact = document.querySelector('.block_liste_contacts');

    for(index in newcontacts){
        const divContact = document.createElement('div');
        divContact.innerHTML = `
        <div class="contacts">
            <div class="image_contact">
                <img src="${newcontacts[index].image}" alt="">
            </div>
            
            <div class="info_contact">
            <div class="align">
                <h3>
                    ${newcontacts[index].prenom} ${newcontacts[index].nom} - ${newcontacts[index].groupe}
                </h3>
                <div class="icon">
                    <span><a href="#" class="icon1" data-key="${index}"><i class="fa-solid fa-user-pen"></i></a></span>
                    <span> <a href="#" class="icon2" data-key="${index}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-trash"></i></a></span>
                </div>
            </div>

            <h4>${newcontacts[index].telephone}</h4>
            <p>
                ${newcontacts[index].bio}
            </p>
            </div>
        </div>`

        conteneurContact.appendChild(divContact);
    }
        const iconsEdite = document.querySelectorAll('.icon1');
      
// Icone modifier contact============================================================
        for(let i = 0 ; i < iconsEdite.length ; i++){
            iconsEdite[i].addEventListener('click', function(){
                let objetContacts = JSON.parse(localStorage.contacts);
        

                let key = this.getAttribute('data-key');

                let item = objetContacts[key];
                let buttonCreate = form.elements.create;
                let buttonReset = form.elements.reset;

                buttonCreate.innerText = "Modifier";
                buttonReset.innerText = "Annuler";

                form.elements.prenom.value = item.prenom;
                form.elements.nom.value = item.nom;
                form.elements.telephone.value = item.telephone;
                form.elements.groupe.value = item.groupe;
                form.elements.email.value = item.email;
                form.elements.bio.value = item.bio;
                fileURL= item.image;

                let imgTag = `<img src = "${fileURL}" alt = "" >`;
                imageZone.innerHTML = imgTag;
            });
        }
// Supprimer contact=================================================================
    const iconsDelete = document.getElementsByClassName('icon2');
    const buttonSupprimer = document.getElementById("deleteContact");
    const AnnulerDelete = document.getElementById("AnnulerDelete");
        for(let i = 0 ; i < iconsDelete.length ; i++){

            iconsDelete[i].addEventListener('click', function(){
                buttonSupprimer.innerHTML = `<span> <a href="#" class="btn btn-danger" data-key="${index}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">supprimer</a></span>`;
                const key = this.getAttribute('data-key');

                buttonSupprimer.addEventListener('click', function(){
                    let objetContacts = JSON.parse(localStorage.contacts);
                    objetContacts.splice(key, 1);

                    localStorage.removeItem('contacts');
                    localStorage.setItem('contacts', JSON.stringify(objetContacts));

                    location.reload();
                });
                AnnulerDelete.addEventListener('click', function(){
                    location.reload();
                })
                
            });
    
        }
}
