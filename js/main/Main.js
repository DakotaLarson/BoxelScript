const StateManager = require('./StateManager');
const MainMenuState = require('./states/MainMenuState');
StateManager.attach(new MainMenuState());
let animate = function () {
    requestAnimationFrame(animate);
    StateManager.update();
};
animate();
