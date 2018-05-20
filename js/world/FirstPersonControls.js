import {PerspectiveCamera, Object3D, Vector3} from 'three';

import Component from 'Component';
import DomHandler from 'DomHandler';
import EventHandler from 'EventHandler';

export default class FirstPersonControls extends Component{

    constructor(scene){
        super();
        this.scene = scene;
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.sprinting = false;
        this.jumping = false;
        this.inAir = false;

        this.speed = 50;
        this.xSpeed = 30;
        this.zSpeed = 40;
        this.speedMultiplier = 1.5;

        this.pitchObject = new Object3D();
        this.pitchObject.add(this.camera);

        this.yawObject = new Object3D();
        this.yawObject.position.y = 6;
        this.yawObject.add(this.pitchObject);


        this.velocity = new Vector3();
    }

    enable = () => {
        EventHandler.addEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYDOWN, this.onKeyDown);
        EventHandler.addEventListener(EventHandler.Event.DOM_KEYUP, this.onKeyUp);
        EventHandler.addMonitorEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);
        EventHandler.addEventListener(EventHandler.Event.DOM_CLICK, this.onClick);
        EventHandler.addEventListener(EventHandler.Event.DOM_POINTERLOCKCHANGE, this.onPointerLockChange);
        EventHandler.addEventListener(EventHandler.Event.GAME_ANIMATION_UPDATE, this.update);
        this.scene.add(this.yawObject);
    };

    disable = () => {
        EventHandler.removeEventListener(EventHandler.Event.DOM_MOUSEMOVE, this.onMouseMove);
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYDOWN, this.onKeyDown);
        EventHandler.removeEventListener(EventHandler.Event.DOM_KEYUP, this.onKeyUp);
        EventHandler.removeEventListener(EventHandler.Event.DOM_RESIZE, this.onResize);
        EventHandler.removeEventListener(EventHandler.Event.DOM_CLICK, this.onClick);
        EventHandler.removeEventListener(EventHandler.Event.DOM_POINTERLOCKCHANGE, this.onPointerLockChange);
        this.scene.remove(this.yawObject);
    };

    update = (delta) => {
        let moving = false;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 10.0 * delta;

        if(!this.inAir && this.jumping){
            this.velocity.y += 35;
            this.inAir = true;
        }

        if(this.moveForward && !this.moveBackward){
            moving = true;
            if((this.moveLeft || this.moveRight) && !(this.moveLeft && this.moveRight)){

                if(this.sprinting){
                    this.velocity.z -= this.zSpeed * delta * this.speedMultiplier;
                }else{
                    this.velocity.z -= this.zSpeed * delta;
                }

            }else{

                if(this.sprinting){
                    this.velocity.z -= this.speed * delta * this.speedMultiplier;
                }else{
                    this.velocity.z -= this.speed * delta;
                }

            }
        }

        else if(this.moveBackward && !this.moveForward){
            moving = true;
            if((this.moveLeft || this.moveRight) && !(this.moveLeft && this.moveRight)){
                this.velocity.z += this.zSpeed * delta;
            }else{
                this.velocity.z += this.speed * delta;
            }

        }

        if(this.moveLeft && !this.moveRight){
            moving = true;
            if((this.moveForward || this.moveBackward) && !(this.moveForward && this.moveBackward)){
                this.velocity.x -= this.xSpeed * delta;
            }else{
                this.velocity.x -= this.speed * delta;
            }
        }

        else if(this.moveRight && !this.moveLeft){
            moving = true;
            if((this.moveForward || this.moveBackward) && !(this.moveForward && this.moveBackward)){
                this.velocity.x += this.xSpeed * delta;
            }else{
                this.velocity.x += this.speed * delta;
            }
        }

        if(!moving){
            if(Math.abs(this.velocity.x) < 0.005) this.velocity.x = 0;
            if(Math.abs(this.velocity.z) < 0.005) this.velocity.z = 0;
        }

        this.yawObject.translateX(this.velocity.x * delta * this.speedMultiplier);
        this.yawObject.translateY(this.velocity.y * delta * this.speedMultiplier);
        this.yawObject.translateZ(this.velocity.z * delta * this.speedMultiplier);

        if(this.yawObject.position.y < 6){
            this.yawObject.position.y = 6;
            this.velocity.y = 0;
            this.inAir = false;
        }
    };

    getCamera = () => {
        return this.camera;
    };

    onMouseMove = (event) => {
        this.yawObject.rotation.y -= event.movementX * 0.002;
        this.pitchObject.rotation.x -= event.movementY * 0.002;
        this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
    };

    onKeyDown = (event) => {
        console.log(event.code);

        switch(event.code){
            case 'KeyW':
                this.moveForward = true;
                break;
            case 'KeyA':
                this.moveLeft = true;
                break;
            case 'KeyS':
                this.moveBackward = true;
                break;
            case 'KeyD':
                this.moveRight = true;
                break;
            case 'Space':
                this.jumping = true;
                break;
            case 'ShiftLeft':
                this.sprinting = true;
                break;
        }
    };

    onKeyUp = (event) => {
        switch (event.code) {
            case 'KeyW':
                this.moveForward = false;
                break;
            case 'KeyA':
                this.moveLeft = false;
                break;
            case 'KeyS':
                this.moveBackward = false;
                break;
            case 'KeyD':
                this.moveRight = false;
                break;
            case 'Space':
                this.jumping = false;
                break;
            case 'ShiftLeft':
                this.sprinting = false;
                break;
        }
    };

    onResize = () => {
        let dimensions = DomHandler.getDisplayDimensions();
        this.camera.aspect = dimensions.width / dimensions.height;
        this.camera.updateProjectionMatrix();
    };

    onClick = () => {
        DomHandler.requestPointerLock();
    };

    onPointerLockChange = (locked) => {
        if(!locked){
            //transition to game menu here.
        }
    }
}
