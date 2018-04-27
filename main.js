const three = require('three');
let scene = new three.Scene();
let camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new three.Color(0x87CEEB);
let renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'game-canvas';
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

let geometry = new three.PlaneGeometry(25, 25);
let material = new three.MeshBasicMaterial({color:0x99be90});
let mesh = new three.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

camera.position.y = 5;
let animate = function () {
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();
