# archbtw

- a web based terminal simulator to help people learn linux commands and experience the horror world of terminals. its arch btw ;)
- trying to make it as minimal as i can.
- a doppelganger of git bash :P

## commands

```
- cd            change directory
- clear         clears screen
- date          shows the date
- echo <text>   prints text to screen
- help          to see list of commands available
- ls            list files under the directory
- mkdir <dir>    create a new directory
- neofetch       system info with coool art
- rm <file>      remove a file
- rm -r <dir>    remove a directory
- touch <file>   create a new empty file
- tree           visual hierarchy of files
- pwd            prints the current working directory
- whoami         who r u???
```

### learnings
- i have learned a lot of things while doing this project. love how this project has turned out to be. started by using basic event listeners and loops and gradually updated it line by line. added a command dispatcher fn that made my life much easier as adding commands was as simple as adding a key value pair in an object. used array index navigation for command history which is quite simple but makes this feel mroe like a terminal. 
- used a simple object for the virtual ~~(fake ;)~~ file system. 


### changelogsss

#### v1.0.5
- finally working on a fake file system for this project. 
- i have added ls, cd and pwd commands. the filesystem they list the directories on, is a fake one, which is simply a js object lol. but that does its job.
- i have added mkdir, touch and rm commands with proper syntax like the real terminal has. spent a lot of time on this.
- tree command has been added which lists out the visual hierarchy of the files in the current working directory.

#### v1.0.4
- i have added tab completion. it basically completes the commands when u type a character of it and press tab, e.g. if i type `e` and press tab then it autocompletes it into `echo`. there's a catch, if there are more than one commands with the same characters like `neofetch`  and `name` then it only autocompletes when the alphabet after the common one has been typed. not sure how to fix this, will prob fix in future updates.
- arrow key history has been added too. the history of previous commands/input can be tracked and checked using the up or down arrow key like how it can be done in a lot of terminals.
- date command basically shows the date and time on the time of execution of the command.. this command is also kinda mandatory for all terminals lol.

#### v1.0.3
- add neofetch finally!! this took a lot of time. it shows the system info along with a cool ascii art of arch linux logo (copied the exact arch linux art directly from neofetch manually, tried using ai but didnot get any fruitful results.)
- neofetch runs everytime the site is opened, with different colors of the logo and titles each time.

#### v1.0.2
- updated the CSS to make the term look like git bash, git bash is my only inspo for this project hehe.
- added two new commands: help and whoami. this update did not take much time, except for the css part.
- adding new commands is fairly simple. it is as simple as adding new key value pairs in an object. the command name is the key and the commands function is the value. thats it.


#### v1.0.1

- add two commands -> echo and clear. if the user types anything except those commands then the output is ‘command not found’.
- im trying to go with the UI and the feel of the git bash terminal cause it feels soo home.

## future plans
- [x] add neofetch command :P
- [ ] more commands, more fun
- [ ] command history, only if i feel smart
- [ ] fake file system, to get the real cli hacker vibes hehe
- [ ] ~~overengineer it~~