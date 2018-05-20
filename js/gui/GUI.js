import Component from 'Component';
import DomHandler from 'DomHandler';

export default class GUI extends Component {

    constructor(){
        super();
        this.element = DomHandler.getElement('.gui');
    }

    enable = () => {
        console.log(this.element);
        this.element.style.display = 'block';
    };

    disable = () => {

    };
}
