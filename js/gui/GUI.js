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

        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_OPEN, this.detachToggle);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.attachToggle);
        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_BUILDER, this.detachToggle);
        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_PLAYER, this.attachToggle);

        this.element.style.display = 'block';
    };

    disable = () => {
        this.detachChild(this.debugPanel);
        this.detachChild(this.temporaryToggle);
        this.detachChild(this.controlsToggle);

        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_OPEN, this.detachToggle);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.attachToggle);
        EventHandler.removeEventListener(EventHandler.Event.CONTROLS_TOGGLE_BUILDER, this.detachToggle);
        EventHandler.removeEventListener(EventHandler.Event.CONTROLS_TOGGLE_PLAYER, this.attachToggle);

        this.element.style.display = '';
    };

    detachToggle = () => {
        this.detachChild(this.temporaryToggle);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_OPEN, this.detachToggle);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.attachToggle);
    };

    attachToggle = () => {
        this.attachChild(this.temporaryToggle);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_OPEN, this.detachToggle);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.attachToggle);
    };
}
