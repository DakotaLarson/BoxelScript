import Component from 'Component';
import DomHandler from 'DomHandler';
import DebugPanel from 'DebugPanel';
import GUITemporaryToggle from 'GUITemporaryToggle';
import EventHandler from 'EventHandler';
import ControlsToggle from 'ControlsToggle';

export default class GUI extends Component {

    constructor(){
        super();
        this.element = DomHandler.getElement('.gui');
        this.debugPanel = new DebugPanel(this.element);
        this.temporaryToggle = new GUITemporaryToggle();
        this.controlsToggle = new ControlsToggle(this.element);
    }

    enable = () => {
        this.attachChild(this.debugPanel);
        this.attachChild(this.temporaryToggle);
        this.attachChild(this.controlsToggle);

        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_OPEN, this.handleGameMenuOpen);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.handleGameMenuClose);

        this.element.style.display = 'block';
    };

    disable = () => {
        this.detachChild(this.debugPanel);
        this.detachChild(this.temporaryToggle);
        this.detachChild(this.controlsToggle);

        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_OPEN, this.handleGameMenuOpen);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.handleGameMenuClose);

        this.element.style.display = '';
    };

    handleGameMenuOpen = () => {
        this.detachChild(this.temporaryToggle);
    };

    handleGameMenuClose = () => {
        this.attachChild(this.temporaryToggle);
    }
}
