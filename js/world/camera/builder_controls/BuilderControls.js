import Component from 'Component';
import EventHandler from 'EventHandler';

import {Vector3, Spherical} from 'three';


//    Rotate - left mouse
//    Zoom - middle mouse, or mousewheel
//    Pan - right mouse or keys

const ButtonState = {
    PRIMARY: 0,
    SECONDARY: 2,
    TERTIARY: 1
};


export default class BuilderControls extends Component{
    constructor(camera){
        super();
        this.camera = camera;

        this.target = new Vector3();
        this.position = new Vector3();

        this.azimuth = Math.PI /3; // horizontal rotation
        this.altitude = Math.PI / 4; // vertical rotation [0, PI] (PI/2 = horizontal view, 0 is vertical down)
        this.distance = 50; // distance [5, 100]
        this.spherical = new Spherical(this.distance, this.altitude, this.azimuth);

        this.state = -1;
    }

    enable = ()=> {
        EventHandler.addEventListener(EventHandler.Event.DOM_MOUSEDOWN, this.onMouseDown);
        EventHandler.addEventListener(EventHandler.Event.DOM_MOUSEUP, this.onMouseUp);
        EventHandler.addEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.addEventListener(EventHandler.Event.DOM_WHEEL, this.onWheel);

        this.camera.position.setFromSpherical(this.spherical);
        this.camera.lookAt(new Vector3());
        console.log(this.camera.position);
        console.log(this.spherical);

    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_MOUSEDOWN, this.onMouseDown);
        EventHandler.removeEventListener(EventHandler.Event.DOM_MOUSEUP, this.onMouseUp);
        EventHandler.removeEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.removeEventListener(EventHandler.Event.DOM_WHEEL, this.onWheel);
    };

    onMouseDown = (event) => {
        if(this.state === -1){
            switch(event.button){
                case 0:
                    this.state = ButtonState.PRIMARY;
                    break;
                case 1:
                    this.state = ButtonState.TERTIARY;
                    break;
                case 2:
                    this.state = ButtonState.SECONDARY;
                    break;
            }
        }
    };

    onMouseUp = () => {
        this.state = -1;
    };

    onMouseMove = (event) => {
        if(this.state === -1) return;
        switch(this.state){
            case ButtonState.PRIMARY:
                this.handleRotation(event.movementX, event.movementY);
                break;
            case ButtonState.SECONDARY:
                this.handlePan(event.movementX, event.movementY);
                break;
            case ButtonState.TERTIARY:
                this.handleZoom(event.movementY, false);
                break;
        }
    };

    onWheel = (event) => {
        this.handleZoom(event.deltaY, true);
    };

    handleRotation = (deltaX, deltaY) => {

    };

    handlePan = (deltaX, deltaY) => {

    };

    handleZoom = (deltaY, isScroll) => {

    };
}


