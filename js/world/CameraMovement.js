import {Object3D, Vector3} from 'three';

import Component from 'Component';
import EventHandler from "../EventHandler";

export default class CameraMovement extends Component{

    constructor(scene, camera){
        super();

        this.scene = scene;

        this.speed = 50;
        this.xSpeed = 30;
        this.zSpeed = 40;

        this.speedMultiplier = 1.5;

        this.jumpPower = 25;

        this.inAir = false;

        this.velocity = new Vector3();

        this.pitchObject = new Object3D();
        this.pitchObject.add(camera);

        this.yawObject = new Object3D();
        this.yawObject.position.y = 6;
        this.yawObject.add(this.pitchObject);

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.sprinting = false;
        this.jumping = false;
    }

    enable = () => {
        this.scene.add(this.yawObject);

        EventHandler.addEventListener(EventHandler.Event.GAME_ANIMATION_UPDATE, this.move);
    };

    disable = () => {
        this.scene.remove(this.yawObject);

        EventHandler.removeEventListener(EventHandler.Event.GAME_ANIMATION_UPDATE, this.move);
    };

    move = (delta) => {
        let moving = false;

        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;
        this.velocity.y -= 9.8 * 10.0 * delta;

        if(!this.inAir && this.jumping){
            this.velocity.y += this.jumpPower;
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

    rotate = (deltaX, deltaY) => {
        this.yawObject.rotation.y -= deltaX * 0.002;
        this.pitchObject.rotation.x -= deltaY * 0.002;
        this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
    };
}
