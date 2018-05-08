const Three = require('three');
const domHandler = require('../dom/DomHandler');
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

module.exports.init = function(){
    domHandler.addEventListener('resize', function handleResize(){
        let dimensions = domHandler.getDisplayDimensions();
        camera.aspect = dimensions.width / dimensions.height;
        camera.updateProjectionMatrix();
    });
};
module.exports.getCamera = function(){
    return camera;
};