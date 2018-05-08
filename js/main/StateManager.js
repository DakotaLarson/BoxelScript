const states = [];

module.exports.attach = function(appState){
    if(states.indexOf(appState) === -1){
        states.push(appState);
        appState.enable();
    }
};
module.exports.detach = function(appState){
    let index = states.indexOf(appState);
    if(index !== -1){
        states.splice(index, 1);
        appState.disable();
    }
};
module.exports.update = function(delta){
    for(let i = 0; i < states.length; i ++){
        states[i].update(delta);
    }    
};