import Component from 'Component';
import {PerspectiveCamera} from 'three';
import EventHandler from 'EventHandler';
import DomHandler from 'DomHandler';
import PlayerControls from 'PlayerControls';
import BuilderControls from 'BuilderControls';

export default class Camera extends Component{

    constructor(scene){
        super();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.state.controls = 'player';

        this.playerControls = new PlayerControls(scene, this.getCamera());
        this.builderControls = new BuilderControls(this.getCamera());
    }

    enable = () => {
        EventHandler.addMonitorEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_OPEN, this.onGameMenuOpen);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.onGameMenuClose);
        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_BUILDER, this.onToggleBuilder);
        EventHandler.addEventListener(EventHandler.Event.CONTROLS_TOGGLE_PLAYER, this.onTogglePlayer);
        this.attachControls();
    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_OPEN, this.onGameMenuOpen);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.onGameMenuClose);
        this.detachControls();
    };

    onResize = () => {
        let dimensions = DomHandler.getDisplayDimensions();
        this.camera.aspect = dimensions.width / dimensions.height;
        this.camera.updateProjectionMatrix();
    };

    getCamera = () => {
        return this.camera;
    };

    onGameMenuOpen = () => {
        this.detachControls();
    };

    onGameMenuClose = () => {
        this.attachControls();
    };

    onToggleBuilder = () => {
        this.detachControls();
        this.state.controls = 'builder';
        this.attachControls();
    };

    onTogglePlayer = () => {
        this.detachControls();
        this.state.controls = 'player';
        this.attachControls();
    };

    attachControls = () => {
        if(this.state.controls === 'player'){
            this.attachChild(this.playerControls);
        }else if(this.state.controls === 'builder'){
            this.attachChild(this.builderControls);
        }
    };

    detachControls = () => {
        if(this.state.controls === 'player'){
            this.detachChild(this.playerControls);
        }else if(this.state.controls === 'builder'){
            this.detachChild(this.builderControls);
        }
    };
}
