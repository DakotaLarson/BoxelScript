const StateManager = require('./StateManager');
const SPGameHandler = require('./states/SPGameState');
const MainMenuState = require('./states/MainMenuState');

//StateManager.attach(new SPGameHandler.SPGameState());
StateManager.attach(new MainMenuState());
let animate = function () {
    requestAnimationFrame(animate);
    StateManager.update();
};
animate();
