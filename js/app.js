let emailInput = document.getElementById('emailInput')
let passwordInput = document.getElementById('passwordInput')
let ageInput = document.getElementById('ageInput')
let submit = document.getElementById('submit')
let userManager = document.getElementById('mngUsr')
let accountArr;
if (localStorage.getItem('array')) {
    accountArr = JSON.parse(localStorage.getItem('array'))
    loadUsers()
} else {
    accountArr = []
}

submit.onclick = () => {
    console.log('clicked')
    let account = {
        email: emailInput.value,
        age: ageInput.value,
        password: passwordInput.value
    }
    if (emailInput.value && passwordInput.value && ageInput.value) {
        accountArr.push(account);
        console.log(accountArr);
        emailInput.value = '';
        passwordInput.value = '';
        ageInput.value = '';
        addUser()
        localStorage.setItem('array', JSON.stringify(accountArr))
    } else {
        alert('fill out all of the form')
    }
}

function addUser() {
    let latest
    for (let i = 0; i < accountArr.length; i++) { latest = i }
    userManager.innerHTML += `<div><p>Email: <span class='email' contenteditable="true">${accountArr[latest].email}</span></p>` +
        `<p>Age: <span class='age' contenteditable="true">${accountArr[latest].age}</span></p></div>`

}
function loadUsers() {
    console.log('ran')
    for (let i = 0; i < accountArr.length; i++) {
        userManager.innerHTML += `<div><p>Email: <span class='email' contenteditable="true">${accountArr[i].email}</span></p>` +
            `<p>Age: <span class='age' contenteditable="true">${accountArr[i].age}</span></p></div>`
    }
}
let updateBtn = document.getElementById('update')
let emailDoc = document.getElementsByClassName('email')
let ageDoc = document.getElementsByClassName('age')
updateBtn.onclick = function () {
    for (let i = 0; i < accountArr.length; i++) {
        accountArr[i].email = emailDoc[i].innerText
        accountArr[i].age = ageDoc[i].innerText
    }
    localStorage.setItem('array', JSON.stringify(accountArr))

}
