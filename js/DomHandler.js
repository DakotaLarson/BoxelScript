import EventHandler from 'EventHandler';

export default class DomHandler{
    static getDisplayDimensions = () =>{
        return displayDimensions;
    };

    static requestPointerLock = () => {
        document.body.requestPointerLock();
    };

    static exitPointerLock = () => {
        document.exitPointerLock();
    };

    static hasPointerLock = () => {
        return document.pointerLockElement !== null;
    };
    static getElement = (query, parent) => {
        if(parent){
            return parent.querySelector(query);
        }else{
            return document.querySelector(query);
        }
    };
}

const displayDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};
const eventTitles = {
    'resize': EventHandler.Event.DOM_RESIZE,
    'mousemove': EventHandler.Event.DOM_MOUSEMOVE,
    'click': EventHandler.Event.DOM_CLICK,
    'keydown': EventHandler.Event.DOM_KEYDOWN,
    'keyup': EventHandler.Event.DOM_KEYUP,
    'mousedown': EventHandler.Event.DOM_MOUSEDOWN,
    'mouseup': EventHandler.Event.DOM_MOUSEUP,
    'pointerlockerror': EventHandler.Event.DOM_POINTERLOCKERROR
};
const windowEventTitles = ['resize'];


let keys = Object.keys(eventTitles);
for(let i = 0; i < keys.length; i ++){
    let eventTitle = keys[i];
    let eventHandlerEvent = eventTitles[eventTitle];
    if(windowEventTitles.indexOf(eventTitle) > -1){
        window.addEventListener(eventTitle, (event) => {
            EventHandler.callEvent(eventHandlerEvent, event);
        });
    }else{
        document.addEventListener(eventTitle, (event) => {
            EventHandler.callEvent(eventHandlerEvent, event);
        });
    }
}
document.addEventListener('pointerlockchange', () => {
    EventHandler.callEvent(EventHandler.Event.DOM_POINTERLOCKCHANGE, DomHandler.hasPointerLock());
});
EventHandler.addEventListener(EventHandler.Event.DOM_RESIZE, () => {
    displayDimensions.width = window.innerWidth;
    displayDimensions.height = window.innerHeight;
});


const stopDefaultActions = () => {
    document.oncontextmenu = () => { return false };
    document.addEventListener('keydown', (event) => {
        event.preventDefault();
    });
};
//stopDefaultActions();
