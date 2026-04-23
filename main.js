// # TODO: neofetch, arrow key command history,tab completion,loreeeeee, add cowsay,

const term=document.getElementById('term');

function printf(txt,cls=''){
    const d=document.createElement("div")
    if(cls) {
        const s=document.createElement("span");
        s.className=cls;
        if(txt===''){
            s.innerHTML='&nbsp;'
        }else {
            s.textContent=txt
        }
        d.appendChild(s)
    } else {
        d.textContent=txt;
    }
    term.appendChild(d)
    term.scrollTop=term.scrollHeight;
}

function prompt(){
    const promptc=document.createElement("div");
    promptc.classList.add("prompt");
    term.appendChild(promptc);
    const p=document.createElement("div");
    p.innerHTML='<span class="g">user@archbtw</span> <span class="r">TTY1</span> <span class="y">~</span> <span class="b">(main)</span>';
    promptc.appendChild(p);
    const row=document.createElement("div")
    row.id='input-row';
    row.innerHTML=`<span>$&nbsp;</span>`;
    const inp=document.createElement('input')
    inp.id= 'inp';
    row.appendChild(inp)
    promptc.appendChild(row)
    inp.focus()
    inp.addEventListener('keydown',e=>{
        if(e.key!=="Enter") return;
        const v=inp.value.trim();
        row.remove();
        const done=document.createElement('div');
        done.textContent='$ '+v;
        promptc.appendChild(done);
        run(v);
    })
}

const CMDS = {
    echo: (a) => printf(a.join(' ')),
    clear: () => { term.innerHTML = ''; },
    help: () => {
        [
            ['w','archBTW, version 1.0.1-release'],
            ['gr','Type `help` to see the list of commands.'],
            ['gr','Type `help name` to find out more about the command.'],
            ['b',''],
            ['',' echo <text>   print to screen'],
            ['',' clear         clears screen'],
            ['',' whoami        who r u???'],
            ['',' neofetch      system info with coool art'],
            ['',' help          list of commands'],
            ['b',''],
        ].forEach(([c,t])=>printf(t,c));
    },
    whoami: ()=>{
        printf('...the system doesn\'t recognize u.','b');
    },
    neofetch:()=>{
        const art = [
            '                   ',
            '      /\\          ',
            '     /  \\         ',
            '    /\\   \\       ',
            '   /      \\       ',
            '  /   \'\'   \\    ',
            ' /   |  |   \\     ',
            '/_-\'\'    \'\'-_\\'
        ];

        const info =[
            ['','user@archbtw'],
            ['','- - - - - - -'],
            ['OS:       ','Arch Linux x86_64'],
            ['Host:     ','archbtw'],
            ['Kernel:   ','0.6.7-arch1-1'],
            ['Shell:    ','bazsh 1.0.0'],
            ['Terminal: ','archbtw-term'],
            ['CPU:      ','unknown @ 4.2Ghz'],
            ['Memory:   ','1.2Mib/64Mib'],
            ['',''],
        ]

        const cycleclrs=['b','g','r','y','m'];
        const logoclr=cycleclrs[Math.floor(Math.random()*cycleclrs.length)];
        const rows=Math.max(art.length,info.length);
        for (let i=0;i<rows;i++){
            const a=(art[i]||'').padEnd(20);
            const [lbl,val]=info[i]||['',''];
            const d=document.createElement("div");
            const artspan=document.createElement('span')
            artspan.className=logoclr;
            artspan.textContent=a;

            const lblspan=document.createElement('lblspan')
            lblspan.textContent=lbl;
            const vspan=document.createElement('span')
            vspan.className=i===0?logoclr:'';
            vspan.textContent=val;

            d.appendChild(artspan)
            d.appendChild(lblspan)
            d.appendChild(vspan)
            term.appendChild(d)
        }
        printf('');
        
    }

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
        printf(cmd + ": cmd not found","gr");
    }
    prompt();
}

//BOOOTTT
CMDS.neofetch();
[
    ['b','welcome to archBTW'],
    ['','someone left this terminal unlocked..'],
    ['y','type: help'],
].forEach(([c,t]) =>printf(t,c))
printf('')
prompt();

document.addEventListener('click',()=>document.getElementById('inp')?.focus())