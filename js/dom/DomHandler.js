const eventListeners = {};
const eventTitles = [
    'resize',
    'mousemove',
    'click',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'pointerlockchange',
    'pointerlockerror'
];

let displayDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};
module.exports.addElement = function(domElement){
    document.body.appendChild(domElement);
};
module.exports.getDisplayDimensions = function(){
    return displayDimensions;
};
module.exports.getElement = function(selector){
    return document.body.querySelector(selector);
};
module.exports.addEventListener = function(event, callback){
    if(eventListeners.hasOwnProperty(event)){
        eventListeners[event].push(callback);
    }else{
        if(eventTitles.indexOf(event) > -1){
            eventListeners[event] = [callback];
        }
    }
};
module.exports.removeEventListener = function(event, callback){
    if(eventListeners.hasOwnProperty(event)){
        let callbackIndex = eventListeners[event].indexOf(callback);
        if(callbackIndex > -1){
            eventListeners[event].splice(callbackIndex, 1);
        }
    }
};
module.exports.requestPointerLock = function(){
    document.body.requestPointerLock();
};
module.exports.exitPointerLock = function(){
    document.exitPointerLock();
};
module.exports.getPointerLockElement = function(){
    return document.pointerLockElement;
};
(function(){
    stopDefaultActions();
    module.exports.addEventListener('resize', function(){
        displayDimensions.width = window.innerWidth;
        displayDimensions.height = window.innerHeight;
    });
    for(let i = 0; i < eventTitles.length; i ++){
        document.addEventListener(eventTitles[i], function(event){
            if(eventListeners.hasOwnProperty(eventTitles[i])){
                let callbackList = eventListeners[eventTitles[i]];
                for(let i = 0; i < callbackList.length; i ++){
                    callbackList[i](event);
                }
            }
        });
    }
})();
function stopDefaultActions(){
    document.oncontextmenu = function(){
        return false;
    };
    document.addEventListener('keydown', function(event){
        event.preventDefault();
    });

}
// window.addEventListener('resize', function(){
//
//     renderer.setSize( window.innerWidth, window.innerHeight );
// });
