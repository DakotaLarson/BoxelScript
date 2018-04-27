const three = require('three');
let scene = new three.Scene();
let camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.id = 'game-canvas';
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

let geometry = new three.BoxGeometry( 1, 1, 1 );
let material = new three.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new three.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

animate();