export default class Ticket extends HTMLElement {

    static observedAttributes = ["data-status"];
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Custom element added to page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(
            `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
    }

    // Element functionality written in here
}
