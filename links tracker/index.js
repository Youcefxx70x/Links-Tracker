let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//buttons(btns)


/*function buttons(btns){
    console.log("works")
    for(let btn of btns){*/
    


function buttonsGrouper(){
    let btns=document.getElementsByClassName("line-btn")
for( let btn of btns){
                    btn.addEventListener("click",function(){
                    console.log(`it's working ${btn}`)
                    let list="li"+btn.id
                    let link="a"+btn.id
                    delLink(list,link)
                            })}
console.log(btns)

}
let leads=JSON.parse(localStorage.getItem("myLinks"))
console.log(leads)
if(leads){
    myLinks=leads
    renderLinks(myLinks)
    buttonsGrouper()
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLinks=[]
    renderLinks(myLinks)
    buttonsGrouper()
})

inputBtn.addEventListener("click", function() {
    let value=inputEl.value
    if (value!=""){
    myLinks.push(value)
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    inputEl.value = ""
    renderLinks(myLinks)
    buttonsGrouper()}
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true},function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        renderLinks(myLinks)
        buttonsGrouper()
    })
})

function renderLinks(leads) {
    let listItems = ""
    let count=0;
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li id="li${i}">
            <i class="bi bi-arrow-right" style="color:white; font-weight: bold;"></i><a target='_blank' href='${leads[i]}' id="a${i}">${leads[i]}</a>
                <div class="bt"><button class="line-btn" id="${i}" class="li-del">del</button></div>
            </li>
            <hr>
        `
        
    }
   
    ulEl.innerHTML = listItems  
}
/*function buttons(){
    let id="del"+number
    const btn=document.getElementById(id)
    list="li"+number
    link="a"+number
    btn.addEventListener("click",delLink(list,link))

}*/
function delLink(list,link){
    const li=document.getElementById(list)
    const a=document.getElementById(link)
    let text=a.innerText
    

    for(let i=0; i < myLinks.length; i++) {
        
        console.log(myLinks[i]===text)
            if(text==myLinks[i]){
            myLinks.splice(i,1)
            localStorage.setItem("myLinks", JSON.stringify(myLinks))
        }
    }
    renderLinks(myLinks)
    buttonsGrouper()
}


