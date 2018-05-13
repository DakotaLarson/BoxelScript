const DomHandler = require('../dom/DomHandler');
let locked = false;
let changeFunctions = [];
let errorFunctions = [];

function handlePointerLockChange(){
    if(DomHandler.getPointerLockElement()){
        locked = true;
    }else{
        locked = false;
    }
    for(let i = 0; i < changeFunctions.length; i ++){
        changeFunctions[i](locked);
    }
}
function handlePointerLockError(event){
    for(let i = 0; i < errorFunctions.length; i ++){
        errorFunctions[i](event);
    }
}

module.exports.addChangeFunction = function(cb){
    changeFunctions.push(cb);
};
module.exports.removeChangeFunction = function(cb){
    let index = this.changeFunctions.indexOf(cb);
    if(cb > -1){
        changeFunctions.splice(index, 1);
    }
};
module.exports.addErrorFunction = function(cb){
    errorFunctions.push(cb);
};
module.exports.removeErrorFunction = function(cb){
    let index = this.errorFunctions.indexOf(cb);
    if(cb > -1){
        errorFunctions.splice(index, 1);
    }
};
module.exports.requestLock = function(){
    if(!locked){
        DomHandler.requestPointerLock();
        locked = true;
    }
};
module.exports.exitLock = function(){
    if(locked){
        DomHandler.exitPointerLock();
        locked = false;
    }
};
module.exports.isLocked = function(){
    return locked;
};

(function(){
    DomHandler.addEventListener('pointerlockchange', handlePointerLockChange);
    DomHandler.addEventListener('pointerlockerror', handlePointerLockError);
})();