const eventListeners = {};
const eventTitles = ['resize', 'mousemove', 'click'];

let displayDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
};
module.exports.init = function(domElement){
    domElement.id = 'game-canvas';
    document.body.appendChild(domElement);
    module.exports.addEventListener('resize', function(){
        displayDimensions.width = window.innerWidth;
        displayDimensions.height = window.innerHeight;
    });
};
module.exports.getDisplayDimensions = function(){
    return displayDimensions;
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
for(let i = 0; i < eventTitles.length; i ++){
    window.addEventListener(eventTitles[i], function(event){
        if(eventListeners.hasOwnProperty(eventTitles[i])){
            let callbackList = eventListeners[eventTitles[i]];
            for(let i = 0; i < callbackList.length; i ++){
                callbackList[i](event);
            }
        }
    });
}
// window.addEventListener('resize', function(){
//
//     renderer.setSize( window.innerWidth, window.innerHeight );
// });