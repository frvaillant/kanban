import ProgressBar from "./ProgressBar";

export default class Ticket extends HTMLElement {

    static observedAttributes = ["data-status", "status", "progression"];
    constructor() {
        super();
        this.initialized = false
        this.addEventListener('dragstart', (e) => {
            this.drag(e)
        })
        this.progression = this.getAttribute('progression') ?? 0
    }

    connectedCallback() {
        this.id = this.getAttribute('ticket')
        this.progressBar = this.querySelector('progress-bar') ?? null
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'progression') {
            if(newValue < 30) {
                this.dataset.stade = 'start'
                return
            }
            if (newValue >= 30 && newValue < 60) {
                this.dataset.stade = 'half'
                return
            }
            this.dataset.stade = 'end'
            return
        }
        this.appendOrRemoveProgressBar()
        if(this.initialized) {
            this.update(name, newValue)
            return
        }
        this.initialized = true
    }

    drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    status() {
        return this.getAttribute('data-status')
    }

    appendOrRemoveProgressBar() {
        if(this.status() !== '1' && this.progressBar) {
            this.progressBar.remove()
            this.progression = 0
            return
        }
        if (this.status() === '1' && null === this.progressBar) {
            this.progressBar = new ProgressBar(this.id)
            this.appendChild(this.progressBar)
            this.progression = 0
        }
    }

    update(param, value) {
        const name = param.split('data-')[1]
        switch (name) {
            case 'status' :
                if(value === '0') {
                    this.updateTicketParamValue('progression', 0)
                    this.updateTicketParamValue('developer', null)
                }
                if(value === '1') {
                    this.updateTicketParamValue('progression', 0)
                    //Todo Manage Order
                }
                this.updateTicketParamValue(name, value)
                break
            default:
                break
        }
    }


    updateTicketParamValue(param, value) {
        fetch('/ticket/update/' + this.dataset.id + '/' + param + '/' + value, {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                //Todo Toast
            }
        })
    }

}
