const textareaQuestion = document.getElementById("textareaQuestion")
const btnSendQuestion = document.getElementById("btnSendQuestion")
const allMesages = document.getElementById("allMesages")
const btnNewChat = document.getElementById("btnNewChat")
const btnShowChats = document.getElementById("btnShowChats")
const btnCloseChats = document.getElementById("btnCloseChats")
const divChats = document.getElementById("divChats")
const bgGray = document.getElementById("bgGray")
const srcChats = document.getElementById("srcChats")
const btnProfile = document.getElementById("btnProfile")
const profile = document.getElementById("profile")
const bgNoColor = document.getElementById("bgNoColor")
const btnExit = document.getElementById("btnExit")
const btnprofile = document.getElementById("btnprofile")

btnSendQuestion.addEventListener("click", async () => {
    vlaueTextareaQuestion = textareaQuestion.value
    textareaQuestion.value = ""
    const list_href = (window.location.href).split("/")
    console.log(list_href.length)
    allMesages.innerHTML += `<div class="flex flex-row-reverse"><p class="bg-green-200 max-w-[85%] p-2.5 rounded-xl w-fit">${vlaueTextareaQuestion}</p></div>` 
    let response
    if(list_href.length == 4){
        response = await fetch("/message", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                text: vlaueTextareaQuestion
            })
        })
        response = await response.json()
        history.replaceState({}, "", `/chat/${response.chat_id}`)
        srcChats.innerHTML += 
        `<div class="flex justify-between py-3 items-center" id="titleChat${response.chat_id}">
            <input href="/chat/${response.chat_id}" class="w-10/12 outline-none flex items-center" value="${response.title}" onclick="changeChat(${response.chat_id})" onblur="blurTitle(${response.chat_id})"></input>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" onclick="changeTitle(${response.chat_id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>                                          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" onclick="deleteChat(${response.chat_id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>                                       
        </div>`
    }
    else {
        response = await fetch(`/message/${list_href[list_href.length - 1]}`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                text: vlaueTextareaQuestion
            })
        })
        response = await response.json()
        console.log(response)
    }
    allMesages.innerHTML += `<div><p class="max-w-[80%] w-fit">${response.answer_ai}</p></div>`
})

btnNewChat.addEventListener("click", () => {
    location.href = "/chat"
})

btnShowChats.addEventListener("click", () => {
    divChats.classList.remove("-left-10/12")
    bgGray.classList.remove("-left-full")
    allMesages.classList.remove("overflow-y-scroll")
    allMesages.classList.add("overflow-y-hidden")
})

function closeChats(){
    divChats.classList.add("-left-10/12")
    bgGray.classList.add("-left-full")
    allMesages.classList.remove("overflow-y-hidden")
    allMesages.classList.add("overflow-y-scroll")
}

btnCloseChats.addEventListener("click", closeChats)

bgGray.addEventListener("click", closeChats)

async function deleteChat(idChat){
    const titleChat = document.getElementById(`titleChat${idChat}`)
    if (titleChat){
        titleChat.remove()   
        await fetch(`/chat/${idChat}`, {method: "DELETE", headers: {"content-type": "application/json"}})
    }
}

function changeChat(idChat){
    location.href = `/chat/${idChat}`
}

function changeTitle(idChat){
    const input = document.querySelector(`#titleChat${idChat} input`)
    console.log(blur)
    input.readOnly = false
    input.classList.add("border-green-500",  "border-4", "rounded-lg", "p-1")
    input.focus();
    const change = document.querySelector(`#titleChat${idChat} svg`)
    change.classList.add("hidden")
    input.onclick = null
}

async function blurTitle(idChat){
    const input = document.querySelector(`#titleChat${idChat} input`)
    if (input){
        input.readOnly = true
        input.classList.remove("border-green-500",  "border-4", "rounded-lg", "p-1")
        console.log(input.classList)
    }
    const change = document.querySelector(`#titleChat${idChat} svg`)
    change.classList.remove("hidden")
    input.onclick = () => changeChat(idChat)
    await fetch(`/chat/${idChat}`, {method: "PUT", headers: {"content-type": "application/json"}, body: JSON.stringify({new_title: input.value})})
}

btnProfile.addEventListener("click", () => {
    profile.classList.remove("-left-100")
    bgNoColor.classList.remove("-left-full")
})

bgNoColor.addEventListener("click", () => {
    profile.classList.add("-left-100")
    bgNoColor.classList.add("-left-full") 
})

btnExit.addEventListener("click", async () => {
    await fetch("/exit", {method: "DELETE", headers: {"content-type": "application/json"}})
    location.href = "/reg"
})

btnprofile.addEventListener("click", () => {
    location.href = "/profile"
})