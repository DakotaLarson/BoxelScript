
import Component from 'Component';
import DomHandler from 'DomHandler';
import EventHandler from 'EventHandler';

export default class FirstPersonControls extends Component{

    constructor(cameraMovement){
        super();
        this.cameraMovement = cameraMovement;
    }

    enable = () => {
        EventHandler.addEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYDOWN, this.onKeyDown);
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYUP, this.onKeyUp);

        DomHandler.requestPointerLock();
    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYDOWN, this.onKeyDown);
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYUP, this.onKeyUp);

        this.cameraMovement.moveForward = this.cameraMovement.moveBackward = this.cameraMovement.moveLeft = this.cameraMovement.moveRight = this.cameraMovement.sprinting = this.cameraMovement.jumping = false;
    };

    onMouseMove = (event) => {
        this.cameraMovement.rotate(event.movementX, event.movementY);
    };

    onKeyDown = (event) => {
        console.log(event.code);

        switch(event.code){
            case 'KeyW':
                this.cameraMovement.moveForward = true;
                break;
            case 'KeyA':
                this.cameraMovement.moveLeft = true;
                break;
            case 'KeyS':
                this.cameraMovement.moveBackward = true;
                break;
            case 'KeyD':
                this.cameraMovement.moveRight = true;
                break;
            case 'Space':
                this.cameraMovement.jumping = true;
                break;
            case 'ShiftLeft':
                this.cameraMovement.sprinting = true;
                break;
        }
    };

    onKeyUp = (event) => {
        switch (event.code) {
            case 'KeyW':
                this.cameraMovement.moveForward = false;
                break;
            case 'KeyA':
                this.cameraMovement.moveLeft = false;
                break;
            case 'KeyS':
                this.cameraMovement.moveBackward = false;
                break;
            case 'KeyD':
                this.cameraMovement.moveRight = false;
                break;
            case 'Space':
                this.cameraMovement.jumping = false;
                break;
            case 'ShiftLeft':
                this.cameraMovement.sprinting = false;
                break;
        }
    };
}
