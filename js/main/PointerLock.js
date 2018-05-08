const DomHandler = require('../dom/DomHandler');

module.exports = class PointerLock{
    constructor(){
        this.locked = false;
        DomHandler.addEventListener('pointerlockchange', function(event){
            console.log(event);
        });
    }
    requestLock(){
        if(!this.locked){
            DomHandler.requestPointerLock();
        }
    }
    exitLock(){
        if(this.locked){
            DomHandler.exitPointerLock();
        }
    }
};
/*let PointerLock = function(){
    let hasPointerLock = 'pointerLockElement' in document;
    if(hasPointerLock){
        let pointerLocked = false;
        let element = document.body;
        let changeFunctions = [];
        let pointerLockChange = function () {
            if(document.pointerLockElement === element) {
                if(pointerLocked) return;
                pointerLocked = true;
            }else{
                if(!pointerLocked) return;
                pointerLocked = false;
            }
            for(let index in changeFunctions){
                changeFunctions[index](pointerLocked);
            }

        };
        let errorFunctions = [];
        let pointerLockError = function (event) {
            console.log('Pointer Lock Error!');
            console.log(event);
            for(let index in errorFunctions){
                errorFunctions[index](event);
            }
        };
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('pointerlockerror', pointerLockError, false);

        return{
            isSupported: function(){
                return true;
            },
            isLocked: function(){
                return pointerLocked;
            },
            requestLock: function(){
                element.requestPointerLock();
            },
            exitLock: function(){
                document.exitPointerLock();
            },
            on: function(type, fn){
                if(typeof type === 'string' && typeof fn === 'function'){
                    if(type.toLowerCase() === 'change'){
                        changeFunctions.push(fn);
                    }else if(type.toLowerCase() === 'error'){
                        errorFunctions.push(fn);
                    }
                }
            }
        }
    }else{
        return {
            isSupported: function(){
                return false;
            }
        };
    }
};*/
