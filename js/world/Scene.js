import {Scene as Three_Scene, Color, PlaneGeometry, MeshBasicMaterial, Mesh, BoxGeometry, MeshLambertMaterial, HemisphereLight} from 'three';

import Component from 'Component';



export default class Scene extends Component{

    constructor(){
        super();
        this.scene = new Three_Scene();
        this.scene.background = new Color(0x87CEEB);
    }

    enable = () => {
        let geometry = new PlaneGeometry(125, 125);
        let material = new MeshBasicMaterial({color:0x99be90});
        let mesh = new Mesh(geometry, material);
        mesh.rotateX(-Math.PI / 2);
        this.scene.add(mesh);

        geometry = new BoxGeometry(1, 1, 1);
        material = new MeshLambertMaterial({color: 0x55a3b2});
        let cube = new Mesh(geometry, material);
        cube.position.z = -10;
        cube.position.y = 0.5;
        this.scene.add(cube);
        let hemiLight = new HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        this.scene.add( hemiLight );
    };

    disable = () => {

    };

    getScene = () => {
        return this.scene;
    };
}
