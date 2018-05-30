import Component from 'Component';
import DomHandler from 'DomHandler';
import EventHandler from 'EventHandler';

export default class ControlsToggle extends Component{

    constructor(parent){
        super();
        this.element = DomHandler.getElement('.controls-toggle', parent);
        this.cameraState = 'player';
    }

    enable = () => {
        this.element.addEventListener('click', this.handleClick);

        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_PLAYER, this.toPlayer);
        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_BUILDER, this.toBuilder);
    };

    disable = () => {
        this.element.removeEventListener('click', this.handleClick);

        EventHandler.removeEventListener(EventHandler.Event.CONTROLS_TOGGLE_PLAYER, this.toPlayer);
        EventHandler.removeEventListener(EventHandler.Event.CONTROLS_TOGGLE_BUILDER, this.toBuilder);
    };

    handleClick = () => {
        if(this.cameraState === 'player'){
            EventHandler.callEvent(EventHandler.Event.CONTROLS_TOGGLE_BUILDER);
        }else if(this.cameraState === 'builder'){
            EventHandler.callEvent(EventHandler.Event.CONTROLS_TOGGLE_PLAYER);
        }
    };

    toBuilder = () => {
        this.cameraState = 'builder';
        this.element.textContent = 'Player Controls';
        this.element.classList.add('controls-toggle-toggled');
    };

    toPlayer = () => {
        this.cameraState = 'player';
        this.element.textContent = 'Builder Controls';
        this.element.classList.remove('controls-toggle-toggled');
    };
}
