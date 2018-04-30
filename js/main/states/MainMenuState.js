const AppState = require('./AppState');
const StateManager = require('../StateManager');

module.exports = class MainMenuState extends AppState{
    constructor(){
        super();
        this.mainMenuElt = document.body.querySelector('.main-menu');
        this.topMenu = this.mainMenuElt.querySelector('.main-menu-top');
        this.topMenuState = new TopMenuState(this.topMenu);
    }
    enable(){
        super.enable();
        this.mainMenuElt.style.display = 'block';
        StateManager.attach(this.topMenuState);

    }
    disable(){
        this.mainMenuElt.style.display = 'none';
        StateManager.detach(this.topMenuState);
    }
};
class TopMenuState extends AppState{
    constructor(element){
        super();
        this.topMenu = element;
        //options
        this.spOpt = this.topMenu.querySelector('.opt-sp');
        this.mpOpt = this.topMenu.querySelector('.opt-mp');
        this.optsOpt = this.topMenu.querySelector('.opt-opts');
        //child menus
        this.spMenuBtn = this.topMenu.querySelector('.opt-sp');
        this.mpMenuBtn = this.topMenu.querySelector('.opt-mp');
        this.optMenuBtn = this.topMenu.querySelector('.opt-opt');
        //child menu states
        this.spMenuState = new SPMenuState(this.topMenu.parentElement.querySelector('.main-menu-sp'));
        this.mpMenuState = new MPMenuState(this.topMenu.parentElement.querySelector('.main-menu-mp'));
        this.optMenuState = new OptMenuState(this.topMenu.parentElement.querySelector('.main-menu-opt'));
    }
    enable(){
        this.topMenu.style.display = 'block';
        this.spMenuBtn.addEventListener('click', this.openSPMenu.bind(this));
        this.spMenuBtn.removeEventListener('click', this.openSPMenu);
        console.log('tesdt');
        this.mpMenuBtn.addEventListener('click', this.openMPMenu.bind(this));
        this.optMenuBtn.addEventListener('click', this.openOptMenu.bind(this));
    }
    disable(){
        this.topMenu.style.display = 'none';
        this.spMenuBtn.removeEventListener('click', this.openSPMenu.bind(this));
        this.mpMenuBtn.removeEventListener('click', this.openMPMenu.bind(this));
        this.optMenuBtn.removeEventListener('click', this.openOptMenu.bind(this));    }
    openSPMenu(){
        StateManager.detach(this);
        StateManager.attach(this.spMenuState);
    }
    openMPMenu(){
        StateManager.detach(this);
        StateManager.attach(this.mpMenuState);
    }
    openOptMenu(){
        StateManager.detach(this);
        StateManager.attach(this.optMenuState)
    }
}
class SPMenuState extends AppState{
    constructor(element){
        super();
        this.spMenu = element;
        this.createOpt = this.spMenu.querySelector('.opt-create');
        this.loadOpt = this.spMenu.querySelector('.opt-load');
        this.cancelOpt = this.spMenu.querySelector('.opt-cancel');
    }
    enable(){
        this.spMenu.style.display = 'block';
    }
    disable(){
        this.spMenu.style.display = 'none';
    }
}
class MPMenuState extends AppState{
    constructor(element){
        super();
        this.mpMenu = element;
        this.connectOpt = this.mpMenu.querySelector('.opt-connect');
        this.cancelOpt = this.mpMenu.querySelector('.opt-cancel');
    }
    enable(){
        this.mpMenu.style.display = 'block';
    }
    disable(){
        this.mpMenu.style.display = 'none';
    }
}
class OptMenuState extends AppState{
    constructor(element){
        super();
        this.optMenu = element;
        this.cancelOpt = this.optMenu.querySelector('.opt-cancel');
    }
    enable(){
        this.optMenu.style.display = 'block';
    }
    disable(){
        this.optMenu.style.display = 'none';
    }
}