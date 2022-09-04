const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const createUserButton = document.querySelector("#createUserButton");

const tableBody = document.querySelector("#tableBody");

const editModalBackground = document.querySelector("#editModalBackground");
const editModal = document.querySelector("#editModal");
const updateLabel = document.querySelector("#updateLabel");
const nameEditInput = document.querySelector("#nameEditInput");
const emailEditInput = document.querySelector("#emailEditInput");
const updateUserButton = document.querySelector("#updateUserButton");



let listCache = null;

function getUsersFromAPI(){
    fetch("http://192.168.1.11/users")
    .then((res)=>{
        return res.json()
    })
    .then(data=>{
        renderList(data)
    })
}



function createUserInAPI(){
    const userToCreate = {
        name: nameInput.value,
        email: emailInput.value
    }

    nameInput.value = "";
    emailInput.value = "";

    fetch(`http://192.168.1.11/users/` , {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(userToCreate)
    })
    .then((res)=>{
        editModalBackground.style.display = 'none';
        return res.json();
    })
    .then(data=>{
        console.log(data);
        getUsersFromAPI();
    })
}



function updateUserInAPI(userId){
    const userToUpdate = {
        id: userId,
        name: nameEditInput.value,
        email: emailEditInput.value,
        active: true
    }

    fetch(`http://192.168.1.11/users/${userId}` , {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(userToUpdate)
    })
    .then((res)=>{
        editModalBackground.style.display = 'none';
        return res.json();
    })
    .then(data=>{
        console.log(data)
        getUsersFromAPI();
    })
}



function deleteUserInAPI(userIndex){
    fetch(`http://192.168.1.11/users/${listCache[userIndex].id}` , {
        method: "DELETE"
    })
    .then((res)=>{
        return res.json();
    })
    .then(data=>{
        console.log(data)
        getUsersFromAPI();
    })
}



let updateUserId = null;

function openEditModal(rowIndex){
    updateUserId = listCache[rowIndex].id;

    editModalBackground.style.display = 'flex';
    updateLabel.innerHTML = `${listCache[rowIndex].name} (ID ${listCache[rowIndex].id})`
    nameEditInput.value = `${listCache[rowIndex].name}`
    emailEditInput.value = `${listCache[rowIndex].email}`
}



function renderList(list){
    listCache = list;
    tableBody.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        
        const row = tableBody.insertRow(i);

        const cell0 = row.insertCell(0);
        const cell1 = row.insertCell(1);
        const cell2 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        const cell4 = row.insertCell(4);

        cell0.innerHTML = `${String(list[i].id).padStart(4, "0")}`;
        cell1.innerHTML = `${list[i].name}`
        cell2.innerHTML = `${list[i].email}`
        cell3.innerHTML = `<img class="icon" src="./imgs/icon-edit.svg">`
        cell4.innerHTML = `<img class="icon" src="./imgs/icon-delete.svg">`

        // Give columns dimensions
        cell0.classList.add('shortColumn');
        cell1.classList.add('longColumn');
        cell2.classList.add('longColumn');
        cell3.classList.add('shortColumn');
        cell4.classList.add('shortColumn');

        // Colorize row
        if (i%2 == 0) {
            cell0.classList.add('oddLine');
            cell1.classList.add('oddLine');
            cell2.classList.add('oddLine');
            cell3.classList.add('oddLine');
            cell4.classList.add('oddLine');
        } else {
            cell0.classList.add('evenLine');
            cell1.classList.add('evenLine');
            cell2.classList.add('evenLine');
            cell3.classList.add('evenLine');
            cell4.classList.add('evenLine');
        }

        // cell1.addEventListener('click', ()=>{showProduct(list[i].id)});
        cell3.addEventListener('click', ()=>{openEditModal(i)});
        cell4.addEventListener('click', ()=>{deleteUserInAPI(i)});
    }
}

createUserButton.addEventListener('click', (e)=>{
    e.preventDefault();
    createUserInAPI();
})
editModal.addEventListener("click", (e)=>{e.stopImmediatePropagation()})
editModalBackground.addEventListener('click', (e)=>{e.target.style.display = "none"})
updateUserButton.addEventListener("click", (e)=>{
    e.preventDefault();
    updateUserInAPI(updateUserId);
})

getUsersFromAPI()