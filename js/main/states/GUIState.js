const DomHandler = require('../../dom/DomHandler');
const AppState = require('./AppState');

module.exports = class GUIState extends AppState{ 
    constructor(){
        super();
        this.guiElement = DomHandler.getElement('.gui');
    }
    enable(){
        super.enable();
        this.guiElement.style.display = 'block';
    }
}