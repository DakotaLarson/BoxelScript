import Component from 'Component';
import Renderer from 'Renderer';
import Scene from 'Scene';
import FirstPersonControls from 'FirstPersonControls';
import GUI from 'GUI';
import EventHandler from 'EventHandler';
import GameMenu from 'GameMenu';
import Camera from 'Camera';
import CameraMovement from 'CameraMovement';

export default class SingleplayerWorld extends Component{

    constructor(){
        super();
        this.scene = new Scene();
        this.camera = new Camera();
        this.cameraMovement = new CameraMovement(this.scene.getScene(), this.camera.getCamera());
        this.controls = new FirstPersonControls(this.cameraMovement);
        this.renderer = new Renderer(this.scene.getScene(), this.camera.getCamera());
        this.gui = new GUI();
        this.gameMenu = new GameMenu();


    }

    enable = () => {
        EventHandler.addEventListener(EventHandler.Event.DOM_POINTERLOCKCHANGE, this.onPointerLockChange);
        EventHandler.addEventListener(EventHandler.Event.GAMEMENU_CLOSE_REQUEST, this.onGameMenuCancel);

        this.attachChild(this.scene);
        this.attachChild(this.renderer);
        this.attachChild(this.camera);
        this.attachChild(this.cameraMovement);
        this.attachChild(this.controls);
        this.attachChild(this.gui);

    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_POINTERLOCKCHANGE, this.onPointerLockChange);
        EventHandler.removeEventListener(EventHandler.Event.GAMEMENU_CLOSE_REQUEST, this.onGameMenuCancel);

        this.detachChild(this.scene);
        this.detachChild(this.renderer);
        this.detachChild(this.camera);
        this.detachChild(this.cameraMovement);
        this.detachChild(this.controls);
        this.detachChild(this.gui);
    };

    onPointerLockChange = (locked) => {
        console.log(locked);
        if(!locked){
            this.detachChild(this.controls);
            this.attachChild(this.gameMenu);
        }
    };

    onGameMenuCancel = () => {
        this.detachChild(this.gameMenu);
        this.attachChild(this.controls);
    };
}
