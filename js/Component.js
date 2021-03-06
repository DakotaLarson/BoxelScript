export default class Component{
    constructor(){
        this.children = [];
        this.parent = null;
        this.state = {};
    }
    enable = () =>{};
    disable = () => {};
    attachChild = (component) => {
        this.children.push(component);
        component.attachToParent(this);
        component.enable();
    };
    
    detachChild = (component) => {
        let index = this.children.indexOf(component);
        let detachChildren = (component) => {
            let childCount = component.children.length;
            for(let i = 0; i < childCount; i ++){
                let child = component.children[i];
                child.detachFromParent(component);
                child.disable();
                detachChildren(child);
            }
            component.children.splice(0, childCount);
        };

        if(index > -1){
            this.children.splice(index, 1);
            component.detachFromParent(this);
            component.disable();
            detachChildren(component);
        }

    };
    
    attachToParent = (component) => {
        this.parent = component;
    };

    detachFromParent = () => {
        this.parent = null;
    };

};
