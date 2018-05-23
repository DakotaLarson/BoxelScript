const eventListeners = {};

const Event = { //Latest Event #: 21 (Update upon event addition!)
    //GAME
    GAME_START: 0,
    GAME_ANIMATION_UPDATE: 1,
    GAME_DEBUG_OUTPUT: 21,
    //DOM
    DOM_RESIZE: 2,
    DOM_MOUSEMOVE: 3,
    DOM_CLICK: 4,
    DOM_KEYDOWN: 5,
    DOM_KEYUP: 6,
    DOM_MOUSEDOWN: 7,
    DOM_MOUSEUP: 8,
    DOM_POINTERLOCKCHANGE: 9,
    DOM_POINTERLOCKERROR: 10,
    //TOP MENU
    TOPMENU_SP_OPT_CLICK: 11,
    TOPMENU_MP_OPT_CLICK: 12,
    TOPMENU_OPT_OPT_CLICK: 13,
    //SP MENU
    SPMENU_CREATE_OPT_CLICK: 14,
    SPMENU_LOAD_OPT_CLICK: 15,
    SPMENU_CANCEL_OPT_CLICK: 16,
    //MP MENU
    MPMENU_CANCEL_OPT_CLICK: 17,

    //OPT MENU
    OPTMENU_CANCEL_OPT_CLICK: 18,

    //GAME MENU
    GAMEMENU_CLOSE_REQUEST: 19,

    //RENDERER
    RENDERER_RENDER_COMPLETE: 20

};

export default class EventHandler{

     static addEventListener(event, callback){
        if(eventListeners.hasOwnProperty(event)){
            eventListeners[event].unshift(callback);
        }else{
            eventListeners[event] = [callback];
        }
    }
    static addMonitorEventListener(event, callback){
        if(eventListeners.hasOwnProperty(event)){
            eventListeners[event].push(callback);
        }else{
            eventListeners[event] = [callback];
        }
    }
    static removeEventListener(event, callback){
        if(eventListeners.hasOwnProperty(event)){
            let callbackIndex = eventListeners[event].indexOf(callback);
            if(callbackIndex > -1){
                eventListeners[event].splice(callbackIndex, 1);
            }
        }
    }
    static callEvent(event, argument){
        if(eventListeners.hasOwnProperty(event)){
            let callbacks = eventListeners[event];
            for(let i = 0; i < callbacks.length; i ++){
                callbacks[i](argument);
            }
        }
    }
    static get Event(){
         return Event;
    }
}

