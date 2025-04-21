const btnReg = document.getElementById("btnReg")
const inputLogin = document.getElementById("inputLogin")
const inputName = document.getElementById("inputName")
const inputSurname = document.getElementById("inputSurname")
const inputPassword = document.getElementById("inputPassword")
const inputPassword2 = document.getElementById("inputPassword2")
const eye = document.getElementById("eye")
const eye2 = document.getElementById("eye2")

btnReg.addEventListener("click", async () => {
    if (!inputLogin.value || !inputName.value || !inputSurname.value || !inputPassword.value || (inputPassword.value != inputPassword2.value) || (inputPassword2.value == "")){
        if (!inputLogin.value){
            inputLogin.classList.remove("border-gray-200")
            inputLogin.classList.add("border-red-700")
        }
        if (!inputName.value){
            inputName.classList.remove("border-gray-200")
            inputName.classList.add("border-red-700")
        }
        if (!inputSurname.value){
            inputSurname.classList.remove("border-gray-200")
            inputSurname.classList.add("border-red-700")
        }
        if (!inputPassword.value){
            inputPassword.classList.remove("border-gray-200")
            inputPassword.classList.add("border-red-700")
        }
        if ((inputPassword.value != inputPassword2.value) || (inputPassword2.value == "")){
            inputPassword2.classList.remove("border-gray-200")
            inputPassword2.classList.add("border-red-700")
        }
    }
    else{
        response = await fetch("/reg", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: inputLogin.value,
                name: inputName.value,
                surname: inputSurname.value,
                password: inputPassword.value
            })
    
        })
    
        if (response.ok){
            window.location = "/"
        }
        else{
            response = await response.json()
            alert(response.detail)
        }
    }
})

function changeInput() {
    if (this.value){
        this.classList.remove("border-red-700")
        this.classList.add("border-gray-200")
    }
    else{
        this.classList.remove("border-gray-200")
        this.classList.add("border-red-700")
    }
}

inputLogin.addEventListener("keyup", changeInput)
inputName.addEventListener("keyup", changeInput)
inputSurname.addEventListener("keyup", changeInput)
inputPassword.addEventListener("keyup", changeInput)

inputPassword.addEventListener("keyup", () => {
    if ((inputPassword.value == inputPassword2.value) && (inputPassword.value != "")){
        inputPassword2.classList.remove("border-red-700")
        inputPassword2.classList.add("border-gray-200")
    }
})

inputPassword2.addEventListener("keyup", () => {
    if (inputPassword.value != inputPassword2.value){
        inputPassword2.classList.remove("border-gray-200")
        inputPassword2.classList.add("border-red-700")
    }
    else {
        inputPassword2.classList.remove("border-red-700")
        inputPassword2.classList.add("border-gray-200")
    }
})

eye.addEventListener("click", () => {
    if (inputPassword.type == "password"){
        inputPassword.type = "text"
        eye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" id="eye"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />'
    }
    else {
        inputPassword.type = "password"
        eye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />'
    }
})

eye2.addEventListener("click", () => {
    if (inputPassword2.type == "password"){
        inputPassword2.type = "text"
        eye2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" id="eye"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />'
    }
    else {
        inputPassword2.type = "password"
        eye2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />'
    }
})