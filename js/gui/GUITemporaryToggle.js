import Component from 'Component';
import EventHandler from 'EventHandler';
import DomHandler from 'DomHandler';

export default class GUITemporaryToggle extends Component{

    constructor(){
        super();
        this.toggleState = false;
    }

    enable = () => {
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYDOWN, this.handleTabDown);
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYUP, this.handleTabUp);
        EventHandler.addEventListener(EventHandler.Event.DOM_BLUR, this.handleDomBlur);
        this.toggleState = false;
    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYDOWN, this.handleTabDown);
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYUP, this.handleTabUp);
        EventHandler.removeEventListener(EventHandler.Event.DOM_BLUR, this.handleDomBlur);
    };

    handleTabDown = (event) => {
        if(!this.toggleState && event.code === 'Tab'){
            DomHandler.exitPointerLock();
            this.toggleState = true;
            EventHandler.callEvent(EventHandler.Event.GUI_TOGGLE_CONTROLS_DISABLED);
        }
    };

    handleTabUp = (event) => {
        if(event.code === 'Tab'){
            DomHandler.requestPointerLock();
            this.toggleState = false;
            EventHandler.callEvent(EventHandler.Event.GUI_TOGGLE_CONTROLS_ENABLED);
        }
    };

    handleDomBlur = () => {
        this.toggleState = false;
        EventHandler.callEvent(EventHandler.Event.GUI_TOGGLE_CONTROLS_ENABLED);
        console.log('blur called');
    };
}
