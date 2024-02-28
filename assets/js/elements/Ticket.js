export default class Ticket extends HTMLElement {

    static observedAttributes = ["data-status", "status"];
    constructor() {
        super();
        this.initialized = false
        this.addEventListener('dragstart', (e) => {
            this.drag(e)
        })
    }

    connectedCallback() {
        console.log("Custom element added to page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(this.initialized) {
            this.update(name, newValue)
            return
        }
        this.initialized = true
    }

    drag(e) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData("text", e.target.id);
    }

    status() {
        return this.getAttribute('data-status')
    }

    update(param, value) {
        const name = param.split('data-')[1]
        fetch('/ticket/update/' + this.dataset.id + '/' + name + '/' + value, {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                //Todo Toast
            }
        })
    }

}
