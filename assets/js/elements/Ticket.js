import ProgressBar from "./ProgressBar";
import tippy from "tippy.js";

export default class Ticket extends HTMLElement {

    static observedAttributes = ["data-status", "status", "progression", "developer", "dev"];
    constructor() {
        super();
        this._isConnected = false
        this.addEventListener('dragstart', (e) => {
            this.drag(e)
        })
        this.progression = this.getAttribute('progression') ?? 0
        this.status = this.dataset.status
    }

    connectedCallback() {
        this._isConnected = true
        this.id = this.getAttribute('ticket')
        this.progressBar = this.querySelector('progress-bar') ?? null

        this.setAttribute('jira', '<a href=\'#\'>Lien Jira</a>')

        tippy(this.querySelector('.ticket-name'), {
            placement: 'top',
            content: this.getAttribute('description'),
            theme: 'light-border',
            animation: 'scale'
        })

        tippy(this.querySelector('.ticket-name'), {
            placement: 'bottom',
            content: this.getAttribute('jira'),
            theme: 'light-border',
            trigger: 'click',
            allowHTML: true,
            interactive: true,
            animation: 'scale'

        })

    }

    sendMessage() {
        const ws = new WebSocket("ws://localhost:5580/");
        ws.onopen = function(event) {
            const message = {
                'sentBy'  : document.body.dataset.user,
                'message' : 'ticket ' + this.id + ' has been changed'
            }
            ws.send(JSON.stringify(message));
            ws.close();
        };
    }

    attributeChangedCallback(name, oldValue, newValue) {

        this.sendMessage()

        if(this._isConnected) {
            if (name === 'progression') {

                let stade = 'end'
                if (newValue < 40) {
                    stade = 'start'
                }
                if (newValue >= 40 && newValue < 70) {
                    stade = 'half'
                }
                this.dataset.stade = stade
                return
            }

            this.appendOrRemoveProgressBar()
            if (newValue !== oldValue) {
                this.update(name, newValue, oldValue)
            }
        }
    }

    drag(e) {
        e.dataTransfer.setData("text", e.target.id);
    }

    getStatus() {
        return this.getAttribute('data-status')
    }

    appendOrRemoveProgressBar() {
        if(this.getStatus() !== '1' && this.progressBar) {
            this.progressBar.remove()
            this.progression = 0
            return
        }
        if (this.getStatus() === '1' && null === this.progressBar) {
            this.progressBar = new ProgressBar(this.id)
            this.appendChild(this.progressBar)
            this.progression = 0
        }
    }

    update(param, value, oldValue) {
        if(this.isConnected) {

            if (param === 'dev') {
                param = 'data-dev'
            }
            const name = param.split('data-')[1]

            if (value) {
                switch (name) {
                    case 'status' :

                        if (value === '0' && oldValue !== '0') {
                            this.updateTicketParamValue('progression', 0)
                            this.updateTicketParamValue('developer', null)
                            this.setAttribute('progression', 0)
                            this.setAttribute('dev', '')
                            this.setAttribute('dev-name', '')
                            this.querySelector('dev-name')?.remove()
                        }

                        if (value === '1' && oldValue !== '1') {
                            this.updateTicketParamValue('progression', 0)
                            this.dataset.stade = 'start'

                            if(oldValue === '2') {
                                this.setAttribute('progression', 0)
                            }
                            //Todo Manage Order
                        }

                        this.updateTicketParamValue(name, value)
                        break

                    case 'dev' :
                        this.updateTicketParamValue('developer', value)
                        break;
                    default:
                        break
                }
            }
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
