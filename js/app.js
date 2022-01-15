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
    userManager.innerHTML += `<p>Email: ${accountArr[latest].email}</p>` +
        `<p>Age: ${accountArr[latest].age}</p>`

}
function loadUsers() {
    console.log('ran')
    for (let i = 0; i < accountArr.length; i++) {
        userManager.innerHTML += `<p>Email: ${accountArr[i].email}</p>` +
            `<p>Age: ${accountArr[i].age}</p>`
    }
}
