const AppState = require('./AppState');
const Three = require('three');
const DomHandler = require('../../dom/DomHandler');
const CameraHandler = require('../CameraHandler');
const FirstPersonControls = require('../FirstPersonControls');
const PointerLock = require('../PointerLock');
module.exports = class SPGameState extends AppState {
     enable(){
         super.enable();
         let canvas = DomHandler.getElement('#game-canvas');
         this.scene = new Three.Scene();
         this.scene.background = new Three.Color(0x87CEEB);
         this.renderer = new Three.WebGLRenderer({
             canvas: canvas,
             antialias: true
         });
         DomHandler.addElement(this.renderer.domElement);
         CameraHandler.init();
         let pointerLock = new PointerLock();
         let fpControls = new FirstPersonControls(CameraHandler.getCamera());
         let dimensions = DomHandler.getDisplayDimensions();
         this.renderer.setSize(dimensions.width, dimensions.height);
         DomHandler.addEventListener('resize', function handleResize(){
             let dimensions = DomHandler.getDisplayDimensions();
             this.renderer.setSize(dimensions.width, dimensions.height);
         }.bind(this));
         DomHandler.addEventListener('click', function(){
             pointerLock.requestLock();
         }.bind(this));
         let geometry = new Three.PlaneGeometry(25, 25);
         let material = new Three.MeshBasicMaterial({color:0x99be90});
         let mesh = new Three.Mesh(geometry, material);
         mesh.rotateX(-Math.PI / 2);
         this.scene.add(mesh);

         geometry = new Three.BoxGeometry(1, 1, 1);
         material = new Three.MeshLambertMaterial({color: 0x55a3b2});
         let cube = new Three.Mesh(geometry, material);
         cube.position.z = -10;
         cube.position.y = 0.5;
         this.scene.add(cube);
         let hemiLight = new Three.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
         hemiLight.color.setHSL( 0.6, 1, 0.6 );
         hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
         hemiLight.position.set( 0, 50, 0 );
         this.scene.add( hemiLight );
     }
     update(){
         this.renderer.render(this.scene, CameraHandler.getCamera());
     }
};
