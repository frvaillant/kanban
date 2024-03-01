export default class UrlLauncher extends HTMLElement {

    constructor() {
        super();
        this.url = null
        this.method = 'POST'
        this.event = null
    }

    connectedCallback() {
        this.url = this.getAttribute('url')
        this.method = this.getAttribute('method')
        this.icon = this.querySelector('i')
        this.loader = document.createElement('i')
        this.loader.classList.add('fa-solid', 'fa-circle-notch', 'fa-spin')
        this.event = new CustomEvent(this.getAttribute('event'))

        this.addEventListener('click', (e) => {
            this.icon.replaceWith(this.loader)
            fetch(this.url, {
                method: this.method ?? 'POST'
            }).then(response => {
                this.loader.replaceWith(this.icon)
                if(this.event) {
                    document.dispatchEvent(this.event)
                }
            })
        })
    }
}