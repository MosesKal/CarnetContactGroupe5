const form = document.getElementById('form');
let fileURL;
let file;
const imageZone = document.querySelector('.image_zone');
const spanClick = document.querySelector('.span-click');
const buttonReset = document.getElementById('reset');
const buttonSubmit = document.getElementById('create');
const inputFile = document.getElementById('inputFile');
const erreurs = {};


function validPrenom(){
    let prenom =form.elements.prenom.value
    if (prenom.length < 3) {
        if (prenom.length === 0) {
            document.getElementById("prenom").style.borderColor = "";
            document.getElementById("prenomErr").style.color=""
            document.getElementById("prenomErr").innerHTML = "";
          }else{
        document.getElementById("prenom").style.borderColor = "red";
        document.getElementById("prenomErr").style.color="red"
        document.getElementById("prenomErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un prenom avec plus de 3 caractères</p>`;
        Object.defineProperty(erreurs, 'prenom', {
            value: 'renseigner un prenom avec plus de 3 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }
    }else if (nom.length > 50) {
        document.getElementById("prenom").style.borderColor = "red";
        document.getElementById("prenomErr").style.color="red"
        document.getElementById("prenomErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un prenom avec moin de 50 caractères</p>`;
        Object.defineProperty(erreurs, 'prenom', {
            value: "renseigner un prenom avec moin de 50 caractères",
            writable : true,
            enumerable : true,
            configurable : true
        });

    }else{
        document.getElementById("prenom").style.borderColor = "";
        document.getElementById("prenomErr").style.color=""
        document.getElementById("prenomErr").innerHTML = "";
        delete erreurs.prenom;
    }
}
function validNom(){
    let nom = form.elements.nom.value
    if(nom.length < 3) {
        if (nom.length === 0) {
            document.getElementById("nom").style.borderColor = "";
            document.getElementById("nomErr").style.color=""
            document.getElementById("nomErr").innerHTML = "";
          }else{
        document.getElementById("nom").style.borderColor = "red";
        document.getElementById("nomErr").style.color="red"
        document.getElementById("nomErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un nom avec plus de 3 caractères</p>`;
        Object.defineProperty(erreurs, 'nom', {
            value: 'renseigner un nom avec plus de 3 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }
    }else if (nom.length > 50) {
        document.getElementById("nom").style.borderColor = "red";
        document.getElementById("nomErr").style.color="red"
        document.getElementById("nomErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un nom avec moin de 50 caractères</p>`;
        Object.defineProperty(erreurs, 'nom', {
            value: 'renseigner un nom avec moin de 50 caractères',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }else{
        document.getElementById("nom").style.borderColor = "";
        document.getElementById("nomErr").style.color=""
        document.getElementById("nomErr").innerHTML = "";
        delete erreurs.nom;
    }
}

function validPhone(){
    let telephone = form.elements.telephone.value
    let phoneReg = /^\d+$/;
    let validPrefixes = ["084", "085", "080", "089", "081", "082", "083", "099", "097", "090"];
    if(!phoneReg.test(telephone)) {
        document.getElementById("telephone").style.borderColor = "red";
        document.getElementById("phoneErr").style.color="red"
        document.getElementById("phoneErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un numéro de téléphone valide</p>`;
        Object.defineProperty(erreurs, 'phone', {
            value: 'renseigner un numéro de téléphone valide',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }else if (telephone.length !== 10) {
        document.getElementById("telephone").style.borderColor = "red";
        document.getElementById("phoneErr").style.color="red"
        document.getElementById("phoneErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un numéro de téléphone avec 10 chiffres</p>`;

        Object.defineProperty(erreurs, 'phone', {
            value: 'renseigner un numéro de téléphone avec 10 chiffres',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }else if (!validPrefixes.includes(telephone.substring(0, 3))) {
        document.getElementById("telephone").style.borderColor = "red";
        document.getElementById("phoneErr").style.color="red";
        document.getElementById("phoneErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>renseigner un numéro de téléphone au format valide</p>`;
        Object.defineProperty(erreurs, 'phone', {
            value: 'renseigner un numéro de téléphone au format valide',
            writable : true,
            enumerable : true,
            configurable : true
        });  
    }else{
        document.getElementById("telephone").style.borderColor = "";
        document.getElementById("phoneErr").style.color=""
        document.getElementById("phoneErr").innerHTML = "";
        delete erreurs.phone;
    }
}
function validEmail(){
    let email = form.elements.email.value
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("emailErr").style.color="red"
        document.getElementById("emailErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>Veuillez saisir une adresse email valide</p>`;
        Object.defineProperty(erreurs, 'email', {
            value: 'Veuillez saisir une adresse email valide',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }
    else {

        document.getElementById("email").style.borderColor = "";
        document.getElementById("emailErr").style.color=""
        document.getElementById("emailErr").innerHTML = "";
        delete erreurs.email;
    }
}
buttonReset.addEventListener('click', function(){
    location.reload();
})
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
        imageZone.style.borderColor = "red"
        imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
        document.getElementById("imgErr").style.color="red"
        document.getElementById("imgErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>le poids de l’image doit être inférieur à 1 Mo</p>`;
        Object.defineProperty(erreurs, 'image', {
            value: 'le poids de l’image doit être inférieur à 1 Mo',
            writable : true,
            enumerable : true,
            configurable : true
        });
    }else if(!validExt.includes(fileType)){
        imageZone.style.borderColor = "red"
        imageZone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
        document.getElementById("imgErr").style.color="red"
        document.getElementById("imgErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>Ce fichier n'est pas une image</p>`;
        Object.defineProperty(erreurs, 'image', {
            value: "Le fichier n'est pas une image",
            writable : true,
            enumerable : true,
            configurable : true
        });
    }
    else{
        imageZone.style.borderColor = ""
        document.getElementById("imgErr").style.color=""
        document.getElementById("imgErr").innerHTML = "";
        displayImg();
        delete erreurs.image;
}
});

function displayImg(){
    let fileReader = new FileReader()
    fileReader.onload = () => {
    fileURL = fileReader.result;
    let imgTag = `<img src = "${fileURL}" alt = "" >`
    imageZone.innerHTML = imgTag
    }
    fileReader.readAsDataURL(file)
}
spanClick.onclick = () => {
    inputFile.click();
}
inputFile.addEventListener('change', () => {
    file = inputFile.files[0];
    displayImg();
});
// Ajouter contact
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

            if(buttonSubmit.textContent === 'Modifier'){
                localStorage.removeItem('contacts');
                const contactsUpdated = newcontacts.map(function(contact){
                    if(contact.telephone === `${form.elements.telephone.value}`){
                        return contactUpdate;
                    }else{
                        return contact;
                    }
                });
                localStorage.setItem('contacts', JSON.stringify(contactsUpdated));
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
                if(messagesErreurs.length != 0){

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
                            document.getElementById("emailErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>Ce mail existe</p>`;
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
        const iconsDelete = document.getElementsByClassName('icon2');
        const buttonSupprimer = document.getElementById("deleteContact");
        const AnnulerDelete = document.getElementById("AnnulerDelete");

        for(let i = 0 ; i < iconsEdite.length ; i++){
            iconsEdite[i].addEventListener('click', function(){
                let objetContacts = JSON.parse(localStorage.contacts);
        
                form.setAttribute('id', 'formModif');

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
                const contactImage = item.image;

                // let fileReader = new FileReader()
                // fileReader.onload = () => {
                let imgTag = `<img src = "${contactImage}" alt = "" >`
                imageZone.innerHTML = imgTag
                // }
                // fileReader.readAsDataURL(file)
                // console.log(contactImage);
            });
        }
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
