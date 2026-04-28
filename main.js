let history=[],histidx=-1;

let CWD='~';
const FS={
    '~':{
        dirs: ['mypc','downloads','documents','repo-archbtw'],files:['readme.txt','lore.md'], hidden: ['.hidden_logs','.secret']
    },
    '~/mypc':{
        dirs: ['ucantopenme'], files: [], hidden:[]
    },
    '~/downloads': {
        dirs: [], files: ['dontopenme.tar.gz'], hidden: []
    },
    '~/documents': {
        dirs: [], files: ['report.txt'], hidden: []
    },
}

const FILES= {
    'readme.txt': [
        'this system was not meant to be found.',
        'try: cat lore.md'
    ],
    'lore.md': [
        'ENTERED THE RABIIT HOLE o_0',
        'there are seven layers to this project.you are on layer 1.',
        'the map is a tree. HINT: type `tree`'
    ],
    'report.txt': [
        'this is MY business report.',
        'none of YOUR business. :P'
    ],
    'dontopenme.tar.gz': [
        'binary: corrupted. not yet.'
    ],
    '.hidden_logs': [
        '[ERROR] unauthorized access',
        '[INFO] origin: UNKNOWN',
        '[INFO] why do they always find this file...'
    ],
    '.secret': [
        'im an open book',
        'no secrets :D',
    ]
}
let hwinterval=null

const HW_CHARS='QWERTYUIOPASDFGHJKLZXCVBNM{}|:"<>?!@#$%^&*()1234567890-_=+\][;/.,';
const HW_MSGS=[
    'decrypting files',
    'access granted',
    'bypassing firewall',
    'downloading mod',
    'establishing backgate',
    'compiling the exploit'
]

// # TODO: loreeeeee, add cowsay, virtual fs also

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
    p.innerHTML=`<span class="g">user@archbtw</span> <span class="r">TTY1</span> <span class="y">${CWD}</span> <span class="b">(main)</span>`;
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

        if(e.ctrlKey&& e.key==='c'){
            e.preventDefault();
            const done=document.createElement('div')
            done.textContent='$ '+inp.value+'^C';
            promptc.appendChild(done)
            row.remove()
            printf('')
            prompt();
            return;
        }

        if(e.key==='Tab'){
            e.preventDefault();
            const partial=inp.value;
            const hit=Object.keys(CMDS).filter(c=>c.startsWith(partial));
            if(hit.length===1){
                inp.value=hit[0];
            } else if(hit.length>1){
                row.remove();
                printf('$ '+partial)
                printf('  '+hit.join('   '),'b');
                prompt();
            }
        }
        if(e.key==="Enter") {
            const v=inp.value.trim();
            if(v){
                history.unshift(v);
                histidx=-1;
            }
            row.remove();
            const done=document.createElement('div');
            done.textContent='$ '+v;
            promptc.appendChild(done);
            run(v);
        } else if(e.key==='ArrowUp'){
            e.preventDefault();
            if(histidx<history.length-1){
                histidx++;
                inp.value=history[histidx];
            }
        } else if(e.key==='ArrowDown'){
            e.preventDefault();
            if(histidx>0){
                histidx--;
                inp.value=history[histidx];
            } else {
                histidx=-1;
                inp.value='';
            }         
        } else if (e.ctrlKey&&!['v','c','a','z','x','=','-','r'].includes(e.key)){
            e.preventDefault();
        }
    })
}

const CMDS = {
    echo: (a) => printf(a.join(' ')),
    clear: () => { term.innerHTML = ''; },
    help: () => {
        [
            ['w','archBTW, version 1.0.1-release'],
            ['gr','Type `help` to see the list of commands.'],
            // TODO: add this thing later on ... ['gr','Type `help name` to find out more about the command.'],
            ['b',''],
            ['',' cd            change directory'],
            ['',' clear         clears screen'],
            ['',' date          shows date'],
            ['',' echo <text>   print to screen'],
            ['',' exit          quit, i guess'],
            ['',' help          list of commands'],
            ['',' hollywood     hackerrr vibesss'],
            ['',' ls            list files within the directory'],
            ['',' mkdir <dir>   create a new directory'],
            ['',' neofetch      system info with coool art'],
            ['',' rm <file>     remove a file'],
            ['',' rm -r <dir>   remove a directory'],
            ['',' touch <file>  create a new empty file'],
            ['',' tree          visual hierarchy of files'],
            ['',' pwd           prints the current working directory'],
            ['',' uname         prints the os and kernel info'],
            ['',' whoami        who r u???'],
            ['b',''],
        ].forEach(([c,t])=>printf(t,c));
    },
    whoami: ()=>{
        printf('user@archbtw','g')
        printf('...the system doesn\'t recognize u.','b');
        printf('last login: unknown','b')
        printf('sessions: classified','b')
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

            const lblspan=document.createElement('span')
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
        
    },
    date: () =>{
        printf(new Date().toString())
    },
    pwd: () => printf(CWD===`~` ? '/home/user' : '/home/user/' + CWD.slice(2)),

    ls: (args) => {
        const node=FS[CWD];
        const showAll=args.includes('-a');
        node.dirs.forEach(d=>{
            printf(' '+d+'/','b')
        })
        node.files.forEach(f=>{
            printf(' '+f)
        })
        if(!showAll && node.hidden?.length){
            printf(' ('+node.hidden.length+' hidden files, use ls -a to show)','gr');
        }
        if(showAll){
            node.hidden?.forEach(hiddenfile=>{
                printf(' '+hiddenfile,'gr');
            })
        }
    }, 

    cd: (args) => {
        const trgt=args[0];
        if(!trgt || trgt==='~') {
            CWD='~';
            return;
        }
        if(trgt==='~') {
            CWD='~';
            return;
        }
        if(trgt==='repo-archbtw'){
            printf("opening project repo...",'b')
            setTimeout(()=>{
                window.open('https://github.com/koderDev/archbtw','_blank');
                printf("launched in new tab.",'g');
                printf('');
                prompt();
            },500);
            return 'async';
        }
        if(trgt==='ucantopenme'){
            printf("THIS FOLDER IS LOCKED.. U CANT OPEN IT x_x",'r')
            return;
        }
        const next = CWD+'/'+trgt;
        if(FS[next]){
            CWD=next;
        }
        else {
            printf('cd: '+trgt+' [no such file or directory]','r');
        }

    },

    cat: (args) =>{
        const name=args[0];
        if(!name) {
            printf('cat: missing operand','r');
            return;
        } 
        const content=FILES[name]
        if(content) {
            content.forEach(lo=>printf(lo));
        } else {
            printf('cat: '+name+' [no such file]','r');
        }

        // if(content[0]=='(empty file)'){ // yo chahiyena
        //     printf('(empty file)','gr');
        //     return
        // }
    },

    mkdir: (args) => {
        const name=args[0];
        if(!name){
            printf('mkdir: missing operand','r')
            return
        } 
        if(FS[CWD].files.includes(name)){
            printf('mkdir: cannot create directory \''+name+'\' [ file exists ]','r');
            return;
        }
        if(FS[CWD].dirs.includes(name)){
            printf('mkdir: cannot create directory \''+name+'\' [ file exists ]','r');
            return
        }
        const path=CWD+'/'+name;
        FS[path]={
            dirs: [],
            files: [],
            hidden: []
        }
        FS[CWD].dirs.push(name)
        printf('');
    },

    touch: (args) =>{
        const name=args[0];
        if(!name) {
            printf('touch: missing operand','r');
            return;
        }
        if(FS[CWD].dirs.includes(name)){
            printf('touch: cannot touch \''+name+'\' [ a directory with that name already exists ]','r');
            return;
        }
        if(FS[CWD].files.includes(name)||(FS[CWD].hidden??[]).includes(name)){
            printf(`file already exists.`,'r')
            return;
        }

        if(name.startsWith('.')){
            FS[CWD].hidden=FS[CWD].hidden || [];
            FS[CWD].hidden.push(name);
        } else {
            FS[CWD].files.push(name);
        }
        FILES[name]=['(empty file)'];
    },

    rm: (args) => {
        const rf=args.includes('-rf')||args.includes('-r');
        const name=args.find(a=>!a.startsWith('-'));
        if(!name) {
            printf('rm: missing operand','r');
            return;
        }

        const path=CWD+'/'+name;
        const isdirec=FS[CWD].dirs.includes(name)
        const isFile=FS[CWD].files.includes(name)
        const isHidden=FS[CWD].hidden?.includes(name)
        if(rf) {
            if(isdirec){
                Object.keys(FS).forEach(k=> {
                    if(k===path||k.startsWith(path+'/')){
                        delete FS[k];
                    }
                })
                FS[CWD].dirs=FS[CWD].dirs.filter(d=>d!==name);
            } else if (isFile) {
                FS[CWD].files.splice(FS[CWD].files.indexOf(name),1);
                delete FILES[name]
            } else {
                printf('rm: cannot remove \''+name+'\' [no such file or directory','r')
            }
            return
        }

        if(isdirec) {
            printf('rm: cannot remove \''+name+'\': it is a directory','r');
            printf('    use rm -r '+name+' to remove a directory','b')
        } else if(isFile||isHidden){
            const arr=isHidden?FS[CWD].hidden : FS[CWD].files;
            arr.splice(arr.indexOf(name),1);
            delete FILES[name]
        } else {
            printf('rm: cannot remove \''+name+'\' [no such file or directory]')
        }
    },
    tree: () => {
        function draw(path,prefx){
            const node=FS[path];
            if(!node) return;
            const all = [...node.dirs,...node.files]
            all.forEach((name,i)=>{
                const last=i===all.length-1;
                const isdirec=node.dirs.includes(name);
                const branch  = last ? '|-- ' : '|-> ';
                printf(prefx+branch+name,isdirec?'b':'')
                if(isdirec){
                    draw(path+'/'+name,prefx+(last?'   ':'|    '))
                }
            })
        }
        printf(CWD)
        draw(CWD,'');
    },
    
    hollywood: () => {
        printf('    [HOLLYWOOD MODE] - press any key to exit','y')
        let count=0;
        hwinterval=setInterval(()=>{
            if(count++ > 200){
                clearInterval(hwinterval);
                hwinterval=null;
                printf('');
                prompt()
                return
            }
            const rand=()=>HW_CHARS[Math.floor(Math.random()*HW_CHARS.length)]
            const noise=Array.from({length:60},rand).join('')
            const msg=Math.random()>0.85 ? '    >> '+HW_MSGS[Math.floor(Math.random()*HW_MSGS.length)]:noise;
            printf(msg,Math.random()>0.5?'g':'b')
            term.scrollTop=term.scrollHeight;
        },80);
        return 'async';
    },
    exit: () => {
        printf('you cant escape *-*','b')
        printf('there is NO EXIT.','r')
    },
    uname:()=>{
        printf('Linux archbtw 0.6.7-arch1-1 x86_64 GNU/Linux')
    }
};

function run(c) {
    if(!c) {
        prompt();
        return;
    } 
    const [cmd, ...args]=c.split(' ');
    let res;
    if(CMDS[cmd]) {
        res=CMDS[cmd](args);
    }
    else {
        printf(cmd + ": cmd not found - type help for commands","r");
    }

    if(res==='async') return;
    printf('')
    prompt();
}

//BOOOTTT
CMDS.neofetch();
[
    ['b','welcome to archBTW'],
    ['','someone left this terminal unlocked..'],
    ['y','to learn about various commands, type: help'],
].forEach(([c,t]) =>printf(t,c))
printf('')
prompt();

document.addEventListener('click',()=>document.getElementById('inp')?.focus())

document.addEventListener('keydown',e=>{
    if(hwinterval && e.key!=='Enter'){
        e.preventDefault()
        clearInterval(hwinterval)
        hwinterval=null
        printf('')
        prompt()
    }
})