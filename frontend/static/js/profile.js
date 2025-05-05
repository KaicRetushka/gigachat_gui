const checkBoxPassword = document.getElementById("checkBoxPassword")
const oldPassword = document.getElementById("oldPassword")
const newPassword = document.getElementById("newPassword")
const newPassword2 = document.getElementById("newPassword2")
const btnSave = document.getElementById("btnSave")
const inputLogin = document.getElementById("inputLogin")
const eye = document.getElementById("eye")
const eye2 = document.getElementById("eye2")
const eye3 = document.getElementById("eye3")
const divOldPassword = document.getElementById("divOldPassword")
const divNewPassword = document.getElementById("divNewPassword")
const divNewPassword2 = document.getElementById("divNewPassword2")

checkBoxPassword.addEventListener("change", () => {
    if (checkBoxPassword.checked){
        divOldPassword.classList.remove("hidden")
        divNewPassword.classList.remove("hidden")
        divNewPassword2.classList.remove("hidden")
    }
    else{
        divOldPassword.classList.add("hidden")
        divNewPassword.classList.add("hidden")
        divNewPassword2.classList.add("hidden")
    }
})

btnSave.addEventListener("click", async () => {
    if (!inputLogin.value){
        inputLogin.classList.remove("border-gray-200")
        inputLogin.classList.add("border-red-700") 
    }
    else{
        if (checkBoxPassword.checked){
            if (!oldPassword.value || !newPassword.value || newPassword.value != newPassword2.value){
                if (!oldPassword.value){
                    oldPassword.classList.remove("border-gray-200")
                    oldPassword.classList.add("border-red-700")
                }
                if (!newPassword.value){
                    newPassword.classList.remove("border-gray-200")
                    newPassword.classList.add("border-red-700")
                }
                if (newPassword.value != newPassword2.value || !newPassword2.value){
                    newPassword2.classList.remove("border-gray-200")
                    newPassword2.classList.add("border-red-700")
                }
            }
            else {
                response = await fetch("/profile/login/pasword", {
                    method: "PUT",
                    body: JSON.stringify({
                        new_login: inputLogin.value,
                        old_password: oldPassword.value,
                        new_password: newPassword.value
                    }),
                    headers: {"content-type": "application/json"}
                })
                if (response.ok){
                    location.href = "/chat"
                }
                else{
                    response = await response.json()
                    console.log(response)
                    alert(response.detail)
                }
            }
        }
        else {
            response = await fetch("/profile/login", 
                {method: "PUT", 
                body: JSON.stringify({new_login: inputLogin.value}),
                headers: {"content-type": "application/json"}
            })
            if (response.ok){
                location.href = "/chat"
            }
            else{
                response = await response.json()
                alert(response.detail)
            }
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
oldPassword.addEventListener("keyup", changeInput)
newPassword.addEventListener("keyup", changeInput)

newPassword2.addEventListener("keyup", () => {
    if (newPassword.value != newPassword2.value || !newPassword2.value){
        newPassword2.classList.remove("border-gray-200")
        newPassword2.classList.add("border-red-700")
    }
    else {
        newPassword2.classList.remove("border-red-700")
        newPassword2.classList.add("border-gray-200")
    }
})


eye.addEventListener("click", () => {
    if (oldPassword.type == "password"){
        oldPassword.type = "text"
        eye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" id="eye"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />'
    }
    else {
        oldPassword.type = "password"
        eye.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />'
    }
})

eye2.addEventListener("click", () => {
    if (newPassword.type == "password"){
        newPassword.type = "text"
        eye2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" id="eye"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />'
    }
    else {
        newPassword.type = "password"
        eye2.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />'
    }
})

eye3.addEventListener("click", () => {
    if (newPassword2.type == "password"){
        newPassword2.type = "text"
        eye3.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" id="eye"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />'
    }
    else {
        newPassword2.type = "password"
        eye3.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />'
    }
})