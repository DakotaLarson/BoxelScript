const Three = require('three');
const DomHandler = require('../dom/DomHandler');
class PointerLockControls {
     constructor(camera) {
         camera.rotation.set(0, 0, 0);

         let pitchObject = new Three.Object3D();
         pitchObject.add(camera);

         let yawObject = new Three.Object3D();
         yawObject.position.y = 10;
         yawObject.add(pitchObject);

         let PI_2 = Math.PI / 2;

         let onMouseMove = function (event) {
             yawObject.rotation.y -= event.movementX * 0.002;
             pitchObject.rotation.x -= event.movementY * 0.002;

             pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

         };

         this.dispose = function () {

             document.removeEventListener('mousemove', onMouseMove, false);

         };

         document.addEventListener('mousemove', onMouseMove, false);

         this.enabled = false;

         this.getObject = function () {

             return yawObject;

         };

         this.getDirection = function () {

             // assumes the camera itself is not rotated

             let direction = new Three.Vector3(0, 0, -1);
             let rotation = new Three.Euler(0, 0, 0, 'YXZ');

             return function (v) {

                 rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

                 v.copy(direction).applyEuler(rotation);

                 return v;

             };

         }();
     }
}
