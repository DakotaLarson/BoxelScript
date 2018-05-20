import Component from 'Component';
import EventHandler from 'EventHandler';

import MainMenu from 'MainMenu';
import SinglePlayerWorld from 'world/SingleplayerWorld';

class Game extends Component{
    constructor(){
        super();
        this.mainMenu = new MainMenu();
        this.singleplayerWorld = new SinglePlayerWorld();

    }
    start = () => {
        EventHandler.callEvent(EventHandler.Event.GAME_START);
        this.attachChild(this.mainMenu);

        EventHandler.addEventListener(EventHandler.Event.SPMENU_CREATE_OPT_CLICK, this.handleSpCreateOptClick);

    };
    update = (delta) => {
        EventHandler.callEvent(EventHandler.Event.GAME_ANIMATION_UPDATE, delta);
    };
    handleSpCreateOptClick = () => {
        this.detachChild(this.mainMenu);
        this.attachChild(this.singleplayerWorld);
    };
}
(() => {
    let game = new Game();
    game.start();

    let prevTime = performance.now();
    let update = function(){
        requestAnimationFrame(update);
        let currentTime = performance.now();
        let delta = (currentTime - prevTime) / 1000;
        prevTime = currentTime;
        game.update(delta);
    };
    update();


})();

