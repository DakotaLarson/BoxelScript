import Component from 'Component';
import {PerspectiveCamera} from 'three';
import EventHandler from "../EventHandler";
import DomHandler from "../DomHandler";

export default class Camera extends Component{

    constructor(){
        super();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    enable = () => {
        EventHandler.addMonitorEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);

    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);

    };

    onResize = () => {
        let dimensions = DomHandler.getDisplayDimensions();
        this.camera.aspect = dimensions.width / dimensions.height;
        this.camera.updateProjectionMatrix();
    };

    getCamera = () => {
        return this.camera;
    };
}
