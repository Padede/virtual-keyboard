import { chars } from './chars.js'

class Input {

    createInput() {
        let input = document.createElement('div');
        input.classList.add('input');
        input.innerHTML = `
        </div>
        <div class="info">
                <p>Клавиатура создана в ОС: Windows</p>
                <p>Смена языка: Shift+alt</p>
            </div>
        <textarea id="input" rows="2" cols="50"></textarea>`

        return input;
    }
}

let lang="ru";
lang = localStorage.getItem('KeyboardLanguage') ? localStorage.getItem('KeyboardLanguage') : lang;
const body = document.querySelector('body');

let input = new Input();
body.appendChild(input.createInput());

let inputNode = document.querySelector('#input');
inputNode.focus();
inputNode.select();



let keyboard=document.createElement("div");
keyboard.classList.add('keyboard');
keyboard.innerHTML=`<div class="keyboard-row row1"></div>
<div class="keyboard-row row2"></div>
<div class="keyboard-row row3"></div>
<div class="keyboard-row row4"></div>
<div class="keyboard-row row5"></div>`;
body.appendChild(keyboard);

Object.values(chars).forEach(keycode => {

    let index = keyboard.children.length;
    let key;
    key=document.createElement('div');
            key.classList.add('keyboard-key', keycode.code.toLowerCase());
    switch (keycode.row) {
        case 1: 
        if (lang=="ru") key.innerHTML=keycode.ru.caseDown;
        else key.innerHTML=keycode.en.caseDown;                  
            keyboard.children[index - 5].appendChild(key);
            break;
        case 2:
            if (lang=="ru") key.innerHTML=keycode.ru.caseDown;
            else key.innerHTML=keycode.en.caseDown;  
            keyboard.children[index - 4].appendChild(key);
            break;
        case 3:
            if (lang=="ru") key.innerHTML=keycode.ru.caseDown;
            else key.innerHTML=keycode.en.caseDown;  
            keyboard.children[index - 3].appendChild(key);
            break;
        case 4:
            if (lang=="ru") key.innerHTML=keycode.ru.caseDown;
            else key.innerHTML=keycode.en.caseDown;   
            keyboard.children[index - 2].appendChild(key);
            break;
        case 5:
            if (lang=="ru") key.innerHTML=keycode.ru.caseDown;
            else key.innerHTML=keycode.en.caseDown;   
            keyboard.children[index - 1].appendChild(key);
            break;
        default:
            // code block
    }
});


let elementsArray = document.querySelectorAll(".keyboard-key");

function keyFind(elem){
    Object.values(chars).forEach(keycode => {
        let s=elem.split(" ");
        inputNode.focus();
        if (keycode.code.toLocaleLowerCase()==s[1]){
            if (s[1]=='tab') inputNode.value+="    ";
            else if (s[1]=="enter") inputNode.value+=String.fromCharCode(13);
            else if (s[1]=="backspace") inputNode.value=inputNode.value.slice(0, -1);
            else if (s[1]=="space") inputNode.value+= " ";
            else if(s[1]=="delete") {
                let temp = inputNode.value.slice(0, inputNode.selectionStart);
                let position = inputNode.selectionStart;
                inputNode.value = temp + inputNode.value.slice(inputNode.selectionStart + 1, inputNode.length);
            }
            else if (s[1]=="arrowright")  {inputNode.selectionEnd++;inputNode.selectionStart++;}
            else if (s[1]=="arrowleft")  {inputNode.selectionStart--;inputNode.selectionEnd--;}
            else if (s[1]=="arrowdown") {
                inputNode.selectionStart = inputNode.selectionEnd =inputNode.value.length;
            }
            else if (s[1]=="arrowup") {
                inputNode.selectionStart = inputNode.selectionEnd = 0;
            }
            else if (s[1]=="shiftleft" || s[1]=="controlleft" || s[1]=="controlright" || s[1]=="shiftright" || s[1]=="altleft" || s[1]=="altright" || s[1]=="metaleft"){}
            else {
                if (lang=="ru"){
                    inputNode.value+=keycode.ru.caseDown;
                }
                if (lang=="en"){
                    inputNode.value+=keycode.en.caseDown;
                }
                
            }
            
        }
    });
}


elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
       keyFind(elem.className);
    });
});
let activecaps=false;
window.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'Alt') {
        let allkeys=document.querySelectorAll(".keyboard-key");
        if (lang === 'ru') {
            for (let i=0;i<allkeys.length;i++){
                Object.values(chars).forEach(keycode => {
                    let q=allkeys[i].className;
                    let s=q.split(" ");
                    inputNode.focus();

                    if (keycode.code.toLocaleLowerCase()==s[1]){
                        allkeys[i].innerHTML=keycode.en.caseDown
                    }
                });
            }
            lang= 'en';
            localStorage.setItem('KeyboardLanguage', 'en');
        } else {
            for (let i=0;i<allkeys.length;i++){
                Object.values(chars).forEach(keycode => {
                    let q=allkeys[i].className;
                    let s=q.split(" ");
                    inputNode.focus();
                    if (keycode.code.toLocaleLowerCase()==s[1]){
                        allkeys[i].innerHTML=keycode.ru.caseDown
                    }
                });
            }    
                
            lang = 'ru';
            localStorage.setItem('KeyboardLanguage', 'ru');
        }
        
    }
    else if(event.code==="CapsLock"){

    }

    else{
        let button = document.querySelector(`.${event.code.toLowerCase()}`);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
        keyFind(event.code.toLowerCase())
    }
    
})
