const textareaQuestion = document.getElementById("textareaQuestion")
const btnSendQuestion = document.getElementById("btnSendQuestion")
const allMesages = document.getElementById("allMesages")
const btnNewChat = document.getElementById("btnNewChat")

btnSendQuestion.addEventListener("click", async () => {
    vlaueTextareaQuestion = textareaQuestion.value
    textareaQuestion.value = ""
    const list_href = (window.location.href).split("/")
    console.log(list_href.length)
    allMesages.innerHTML += `<div class="flex flex-row-reverse"><p class="bg-green-200 max-w-[80%] p-2.5 rounded-xl">${vlaueTextareaQuestion}</p></div>` 
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
    }
    allMesages.innerHTML += `<div><p class="max-w-[80%]">${response.answer_ai}</p></div>`
})

btnNewChat.addEventListener("click", () => {
    location.href = "/chat"
})