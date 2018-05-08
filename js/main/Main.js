const StateManager = require('./StateManager');
const MainMenuState = require('./states/MainMenuState');
StateManager.attach(new MainMenuState());
let prevTime = performance.now();
let animate = function () {
    requestAnimationFrame(animate);
    let currentTime = performance.now();
    let delta = (currentTime - prevTime) / 1000;
    prevTime = currentTime;
    StateManager.update(delta);
};
animate();
