import Component from 'Component';
import Renderer from 'Renderer';
import Scene from 'Scene';
import GUI from 'GUI';
import EventHandler from 'EventHandler';
import GameMenu from 'GameMenu';
import Camera from 'Camera';

export default class SingleplayerWorld extends Component{

    constructor(){
        super();
        this.scene = new Scene();
        this.camera = new Camera(this.scene.getScene());
        this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());
        this.gui = new GUI();
        this.gameMenu = new GameMenu();

        this.state.gameMenuEnabled = false;

    }

    enable = () => {
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYDOWN, this.onKeyDown);
        EventHandler.addEventListener(EventHandler.Event.DOM_POINTERLOCK_DISABLE, this.onPointerLockDisable);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.onGameMenuCancel);
        EventHandler.addEventListener(EventHandler.Event.DOM_BLUR, this.onPointerLockDisable);

        this.attachChild(this.scene);
        this.attachChild(this.renderer);
        this.attachChild(this.camera);
        this.attachChild(this.gui);

    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_POINTERLOCK_DISABLE, this.onPointerLockDisable);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE, this.onGameMenuCancel);
        EventHandler.removeEventListener(EventHandler.Event.DOM_BLUR, this.onPointerLockDisable);

        this.detachChild(this.scene);
        this.detachChild(this.renderer);
        this.detachChild(this.camera);
        this.detachChild(this.gui);
    };

    onKeyDown = (event) => {
        if(event.code === 'Escape' && !this.state.gameMenuEnabled){
            this.attachChild(this.gameMenu);
            this.state.gameMenuEnabled = true;
        }
    };

    onPointerLockDisable = () => {
        if(!this.state.gameMenuEnabled){
            this.attachChild(this.gameMenu);
            this.state.gameMenuEnabled = true;
        }
    };

    onGameMenuCancel = () => {
        this.detachChild(this.gameMenu);
        this.state.gameMenuEnabled = false;
    };
}
