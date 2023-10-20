const API_URL = "http://127.0.0.1:8081/api"

const navbar = [
    "Acceuil",
    "Preset",
    "Element",
    "Combianaison"
]
const default_navbar = 0;
let doc_el = {}

function setup() {

    //initialisation de la navbar
    doc_el["navbar"] = document.getElementById("navbar")

    let html_navbar = "";
    for (let i = 0; i < navbar.length; i++) {
        doc_el[navbar[i]] = document.getElementById(navbar[i])
        setElementOFF(doc_el[navbar[i]])
        html_navbar = html_navbar + "<li onclick='switchTo(" + i + ")' id='" + navbar[i] + "_navbar'>" + navbar[i] + "</li>"
    }
    doc_el["navbar"].innerHTML = html_navbar
    for (let i = 0; i < navbar.length; i++) {
        doc_el[navbar[i] + "_navbar"] = document.getElementById(navbar[i] + "_navbar")
        if (i == default_navbar) {
            doc_el[navbar[i] + "_navbar"].className = "navbarSelect"

        } else {
            doc_el[navbar[i] + "_navbar"].className = "navbarUnSelect"

        }
    }

    setElementON(doc_el[navbar[default_navbar]])



    console.log("Setup => OK")
    window.setInterval(draw, 1000)
}

function draw() {

}

function setElementON(el) {
    if (el != undefined) {
        el.style.display = "block"

    } else {
        console.log(el)
    }
}
function setElementOFF(el) {
    if (el != undefined) {
        el.style.display = "none"

    } else {
        console.log(el)
    }
}

function switchTo(id) {
    for (let i = 0; i < navbar.length; i++) {
        setElementOFF(doc_el[navbar[i]])
        doc_el[navbar[i] + "_navbar"].className = "navbarUnSelect"
    }
    setElementON(doc_el[navbar[id]])
    doc_el[navbar[id] + "_navbar"].className = "navbarSelect"
}

function sleep(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function getValue(id) {
    return document.getElementById(id).value;
}
function SendAddPreset() {
    let data = {
        name: getValue("Preset_name"),
        desc: getValue("Preset_desc"),
        mdp: getValue("Preset_mdp"),
        mdpadmin: getValue("Preset_mdpadmin")
    }
    requestPost(API_URL+"/preset/add",data,(res)=>{
        console.log(res)
    })
}

function requestGet(url,callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            callback(data);
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}

function requestPost(url,data,callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify(data);
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        callback(JSON.parse(xhr.responseText));
    } else {
        console.log(`Error: ${xhr.status}`);
    }
    };
    xhr.send(body);
}