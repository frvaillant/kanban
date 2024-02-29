import ProgressBar from "./ProgressBar";

export default class DevName extends HTMLElement {

    static observedAttributes = ['name'];

    constructor() {
        super();
        this.name = null
    }

    connectedCallback() {
       this.name = this.innerHTML
    }

    attributeChangedCallback(name, oldValue, newValue) {

        this.innerHTML = newValue
    }

}
