const outp=document.getElementById("output");
const inpt=document.getElementById("input");

let history=[], histIndx=-1;

const BOOT = [
    {t:"lore",s:' [this is ARCH btw]'},
    {t:"lore",s:''},
    {t:"success",s:' Welcome, stranger'},
    {t:"output",s:' type: help'},
]

function printf(text, type='output'){
    const d=document.createElement('div');
    d.className=`${type}-line`;
    d.textContent=text;
    outp.appendChild(d);
    outp.scrollTop=outp.scrollHeight;
}

BOOT.forEach(l => printf(l.s,l.t));

function printPrompt(c){
    printf('user@archbtw:~$ '+c,'prompt');
}

document.addEventListener('click',()=>inpt.focus())