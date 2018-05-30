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


    }

    enable = () => {
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

    onPointerLockDisable = () => {
        this.attachChild(this.gameMenu);
    };

    onGameMenuCancel = () => {
        this.detachChild(this.gameMenu);
    };
}
