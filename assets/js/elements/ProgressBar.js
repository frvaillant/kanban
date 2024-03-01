export default class ProgressBar extends HTMLElement {

    static observedAttributes = ["progression"];
    constructor(ticketId = null) {
        super();
        this.ticket = ticketId ?? this.getAttribute('ticket')
        this.progression = this.dataset.progression ?? 0
        this.dataset.ticket = this.ticket
        this.progressionElement = document.createElement('div')
        this.progressionElement.classList.add('progression')
        this.progressionElement.style.width = this.progression + '%'
        this.progressionElement.dataset.progression = this.progression
        this.appendChild(this.progressionElement)

        this.addEventListener('click', (e) => {
            this.updateProgression(e)
        })
    }

    connectedCallback() {
        this.ticketId = this.dataset.ticketId
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.progressionElement.style.width = newValue + '%'
        this.updateTicketValue(name, newValue)
    }

    updateProgression(e) {
        const realPosition = e.clientX - this.getBoundingClientRect().left
        this.progression = Math.floor(realPosition * 100 / this.getBoundingClientRect().width)
        this.progression = Math.round(this.progression / 5) * 5;
        this.parentElement.setAttribute('progression', this.progression)
        this.setAttribute('progression', this.progression)
        this.progressionElement.dataset.progression = this.progression

    }

    updateTicketValue(name, value) {
        fetch('/ticket/update/' + this.dataset.ticket + '/' + name + '/' + value, {
            method: 'POST'
        }).then(response => {
            if (response.status === 200) {
                //Todo Toast
            }
        })
    }

}
