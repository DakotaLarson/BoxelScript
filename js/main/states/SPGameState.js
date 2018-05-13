const AppState = require('./AppState');
const StateManager = require('../StateManager');
const Three = require('three');
const DomHandler = require('../../dom/DomHandler');
const FirstPersonControlsState = require('./FirstPersonControlsState');
const GUIState = require('./GUIState');

module.exports = class SPGameState extends AppState {
    constructor(){
        super();
        this.scene = new Three.Scene();
        this.scene.background = new Three.Color(0x87CEEB);
        this.renderer = new Three.WebGLRenderer({
            canvas: DomHandler.getElement('#game-canvas'),
            antialias: true
        });
    }
    enable(){
        
        //Scene setup
        super.enable();
        
        let dimensions = DomHandler.getDisplayDimensions();
        this.renderer.setSize(dimensions.width, dimensions.height);

        DomHandler.addEventListener('resize', function handleResize(){
            let dimensions = DomHandler.getDisplayDimensions();
            this.renderer.setSize(dimensions.width, dimensions.height);
        }.bind(this));
        
        //Camera setup
        this.firstPersonControlsState = new FirstPersonControlsState();
        this.scene.add(this.firstPersonControlsState.getObject());
        StateManager.attach(this.firstPersonControlsState);

        //GUI
        this.guiState = new GUIState();
        StateManager.attach(this.guiState);

        //Geometry business
        let geometry = new Three.PlaneGeometry(125, 125);
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
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        this.scene.add( hemiLight );
    }
    update(delta){
        this.renderer.render(this.scene, this.firstPersonControlsState.getCamera());
    }
};
