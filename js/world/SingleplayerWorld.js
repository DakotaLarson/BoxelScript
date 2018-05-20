import Component from 'Component';
import Renderer from 'Renderer';
import Scene from 'Scene';
import FirstPersonControls from 'FirstPersonControls';
import GUI from 'GUI';

export default class SingleplayerWorld extends Component{

    constructor(){
        super();
        this.scene = new Scene();
        this.controls = new FirstPersonControls(this.scene.getScene());
        this.renderer = new Renderer(this.scene.getScene(), this.controls.getCamera());
        this.gui = new GUI();

    }

    enable = () => {
        this.attachChild(this.scene);
        this.attachChild(this.renderer);
        this.attachChild(this.controls);
        this.attachChild(this.gui);
    };

    disable = () => {
        this.detachChild(this.scene);
        this.detachChild(this.renderer);
        this.detachChild(this.controls);
        this.detachChild(this.gui);
    };
}
