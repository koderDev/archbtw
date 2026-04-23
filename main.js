const term=document.getElementById('term');

function printf(txt,cls=''){
    const d=document.createElement("div")
    if(cls) {
        const s=document.createElement("span");
        s.className=cls;
        s.textContent=txt;
        d.appendChild(s)
    } else {
        d.textContent=txt;
    }
    term.appendChild(d)
    term.scrollTop=term.scrollHeight;
}

function prompt(){
    const p=document.createElement("div");
    p.innerHTML='<span class="g">user@archbtw</span> <span class="b">~</span> <span class="m">(main)</span>';
    term.appendChild(p);
    const row=document.createElement("div")
    row.id='input-row';
    row.innerHTML='<span>$ </span>';
    const inp=document.createElement('input')
    inp.id= 'inp';
    row.appendChild(inp)
    term.appendChild(row)
    inp.focus()
    inp.addEventListener('keydown',e=>{
        if(e.key!=="Enter") return;
        const v=inp.value.trim();
        row.remove();
        const done=document.createElement('div');
        done.textContent='$ '+v;
        term.appendChild(done);
        run(v);
    })
}

const CMDS = {
    echo: (a) => printf(a.join(' ')),
    clear: () => { term.innerHTML = ''; }
};

function run(c) {
    if(!c) {
        prompt();
        return;
    } 
    const [cmd, ...args]=c.split(' ');
    if(CMDS[cmd]) {
        CMDS[cmd](args);
    }
    else {
        printf("archbtw: " + cmd + ": cmd not found","r");
    }
    prompt();
}

[
    ['b',' welcome to archBTW'],
    ['',' someone left this terminal unlocked..'],
    ['y',' type: echo hello'],
].forEach(([c,t]) =>printf(t,c))
printf('')
prompt();

document.addEventListener('click',()=>document.getElementById('inp')?.focus())