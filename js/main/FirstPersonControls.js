const Three = require('three');
const DomHandler = require('../dom/DomHandler');
module.exports = class FirstPersonControls {
    constructor(camera) {
        camera.rotation.set(0, 0, 0);

        this.pitchObject = new Three.Object3D();
        this.pitchObject.add(camera);

        this.yawObject = new Three.Object3D();
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);

        let PI_2 = Math.PI / 2;

        this.onMouseMove = function (event) {
         this.yawObject.rotation.y -= event.movementX * 0.002;
         this.pitchObject.rotation.x -= event.movementY * 0.002;
         this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x));
        }.bind(this);
        this.enabled = false;
        this.enable();
    }
    disable(){
        if(this.enabled){
            DomHandler.removeEventListener('mousemove', this.onMouseMove);
            this.enabled = false;
        }
    }
    enable(){
        if(!this.enabled){
            DomHandler.addEventListener('mousemove', this.onMouseMove);
            this.enabled = true;
        }
    }
    getObject(){
            return this.yawObject;
    }
};
/*
    getDirection(){
        let direction = new Three.Vector3(0, 0, -1);
        let rotation = new Three.Euler(0, 0, 0, 'YXZ');

        return function (v) {

            rotation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);

            v.copy(direction).applyEuler(rotation);

            return v;

        };
    }();
*/
