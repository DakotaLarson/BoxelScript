const AppState = require('./AppState');
const StateManager = require('../StateManager');
const SPGameState = require('./SPGameState');

module.exports = class MainMenuState extends AppState{
    constructor(){
        super();
        this.mainMenuElt = document.body.querySelector('.main-menu');
        this.topMenu = this.mainMenuElt.querySelector('.main-menu-top');
        this.topMenuState = new TopMenuState(this.topMenu, this);
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
    constructor(element, parentState){
        super();
        this.topMenu = element;
        //Menu Buttons
        this.spMenuBtn = this.topMenu.querySelector('.opt-sp');
        this.mpMenuBtn = this.topMenu.querySelector('.opt-mp');
        this.optMenuBtn = this.topMenu.querySelector('.opt-opt');
        //Child Menu States
        this.spMenuState = new SPMenuState(this.topMenu.parentElement.querySelector('.main-menu-sp'), this);
        this.mpMenuState = new MPMenuState(this.topMenu.parentElement.querySelector('.main-menu-mp'), this);
        this.optMenuState = new OptMenuState(this.topMenu.parentElement.querySelector('.main-menu-opt'), this);
        this.parentState = parentState;
        //Listeners
        this.openSPMenu = function(){
            StateManager.detach(this);
            StateManager.attach(this.spMenuState);
        }.bind(this);
        this.openMPMenu = function(){
            StateManager.detach(this);
            StateManager.attach(this.mpMenuState);
        }.bind(this);
        this.openOptMenu = function(){
            StateManager.detach(this);
            StateManager.attach(this.optMenuState)
        }.bind(this);
    }
    enable(){
        this.topMenu.style.display = 'block';
        this.spMenuBtn.addEventListener('click', this.openSPMenu);
        this.mpMenuBtn.addEventListener('click', this.openMPMenu);
        this.optMenuBtn.addEventListener('click', this.openOptMenu);
    }
    disable(){
        this.topMenu.style.display = 'none';
        this.spMenuBtn.removeEventListener('click', this.openSPMenu);
        this.mpMenuBtn.removeEventListener('click', this.openMPMenu);
        this.optMenuBtn.removeEventListener('click', this.openOptMenu);
    }

}
class SPMenuState extends AppState{
    constructor(element, parentState){
        super();
        this.spMenu = element;
        //Menu Buttons
        this.createOptBtn = this.spMenu.querySelector('.opt-create');
        this.loadOptBtn = this.spMenu.querySelector('.opt-load');
        this.cancelOptBtn = this.spMenu.querySelector('.opt-cancel');
        //Listeners
        this.openCreateMenu = function(){
            StateManager.detach(this);
            StateManager.detach(parentState);
            StateManager.detach(parentState.parentState);
            StateManager.attach(new SPGameState());
        }.bind(this);
        this.openLoadMenu = function(){

        }.bind(this);
        this.openMainMenu = function(){
            StateManager.detach(this);
            StateManager.attach(parentState);
        }.bind(this);
    }
    enable(){
        this.createOptBtn.addEventListener('click', this.openCreateMenu);
        this.loadOptBtn.addEventListener('click', this.openLoadMenu);
        this.cancelOptBtn.addEventListener('click', this.openMainMenu);
        this.spMenu.style.display = 'block';
    }
    disable(){
        this.createOptBtn.removeEventListener('click', this.openCreateMenu);
        this.loadOptBtn.removeEventListener('click', this.openLoadMenu);
        this.cancelOptBtn.removeEventListener('click', this.openMainMenu);
        this.spMenu.style.display = 'none';
    }
}
class MPMenuState extends AppState{
    constructor(element, parentState){
        super();
        this.mpMenu = element;
        //Menu Buttons
        this.connectOptBtn = this.mpMenu.querySelector('.opt-connect');
        this.cancelOptBtn = this.mpMenu.querySelector('.opt-cancel');
        //Listeners
        this.openConnectMenu = function(){

        }.bind(this);
        this.openMainMenu = function(){
            StateManager.detach(this);
            StateManager.attach(parentState);
        }.bind(this);
    }
    enable(){
        this.connectOptBtn.addEventListener('click', this.openConnectMenu);
        this.cancelOptBtn.addEventListener('click', this.openMainMenu);
        this.mpMenu.style.display = 'block';
    }
    disable(){
        this.cancelOptBtn.removeEventListener('click', this.openConnectMenu);
        this.cancelOptBtn.removeEventListener('click', this.openMainMenu);
        this.mpMenu.style.display = 'none';
    }
}
class OptMenuState extends AppState{
    constructor(element, parentState){
        super();
        this.optMenu = element;
        //Menu Buttons
        this.cancelOptBtn = this.optMenu.querySelector('.opt-cancel');
        //Listeners
        this.openMainMenu = function(){
            StateManager.detach(this);
            StateManager.attach(parentState);
        }.bind(this);
    }
    enable(){
        this.cancelOptBtn.addEventListener('click', this.openMainMenu);
        this.optMenu.style.display = 'block';
    }
    disable(){
        this.cancelOptBtn.removeEventListener('click', this.openMainMenu);
        this.optMenu.style.display = 'none';
    }
}
