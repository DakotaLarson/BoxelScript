const AppState = require('./AppState');
const Three = require('three');
const DomHandler = require('../../dom/DomHandler');
const CameraHandler = require('../CameraHandler');
module.exports = class SPGameState extends AppState {
     enable(){
         super.enable();
         this.scene = new Three.Scene();
         this.scene.background = new Three.Color(0x87CEEB);
         this.renderer = new Three.WebGLRenderer({antialias: true});
         DomHandler.init(this.renderer.domElement);
         CameraHandler.init();
         let dimensions = DomHandler.getDisplayDimensions();
         this.renderer.setSize(dimensions.width, dimensions.height);
         DomHandler.addEventListener('resize', function handleResize(){
             let dimensions = DomHandler.getDisplayDimensions();
             this.renderer.setSize(dimensions.width, dimensions.height);
         });

         let geometry = new Three.PlaneGeometry(25, 25);
         let material = new Three.MeshBasicMaterial({color:0x99be90});
         let mesh = new Three.Mesh(geometry, material);
         mesh.rotateX(-Math.PI / 2);
         this.scene.add(mesh);
     }
     update(){
         this.renderer.render(this.scene, CameraHandler.getCamera());
     }
};