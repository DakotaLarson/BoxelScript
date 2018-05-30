import Component from 'Component';
import DomHandler from 'DomHandler';
import EventHandler from 'EventHandler';

export default class GameMenu extends Component {

    constructor(){
        super();
        this.element = DomHandler.getElement('.game-menu');
        this.cancelBtn = DomHandler.getElement('#game-cancel', this.element);
    }

    enable = () => {
        EventHandler.callEvent(EventHandler.Event.GAMEMENU_OPEN);

        this.cancelBtn.addEventListener('click', this.handleMenuClose);

        EventHandler.addEventListener(EventHandler.Event.DOM_KEYUP, this.handleKeyUp);

        this.element.style.display = 'block';
    };

    disable = () => {
        this.cancelBtn.removeEventListener('click', this.handleMenuClose);

        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYUP, this.handleKeyUp);

        this.element.style.display = '';
    };

    handleKeyUp = (event) => {
        if(event.code === 'Escape'){
            this.handleMenuClose();
        }
    };

    handleMenuClose = () => {
        EventHandler.callEvent(EventHandler.Event.GAMEMENU_CLOSE);
    };
}
