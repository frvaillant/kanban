import { Controller } from '@hotwired/stimulus';
import DevName from "../js/elements/DevName";

export default class extends Controller {
    connect() {
    }

    ondrop(e) {
        e.preventDefault()
        const id = e.dataTransfer.getData("text");
        const droppedElement = document.getElementById(id);
        const dropzone = e.currentTarget;
        dropzone.appendChild(droppedElement)
        dropzone.style.border='none'

        const dev = dropzone.dataset.dev
        const devName = dropzone.dataset.name

        droppedElement.setAttribute('data-status', dropzone.dataset.status)

        if(dev && devName) {
            const devElement = droppedElement.querySelector('dev-name')
            if(devElement) {
                devElement.setAttribute('dev', dev)
                devElement.setAttribute('name', devName)
            }

            droppedElement.setAttribute('dev', dev)
            droppedElement.setAttribute('dev-name', devName)
        }


        this.updateCounters()
        e.stopPropagation()
        return false
    }

    updateCounters() {
        const count = []
        const devs = document.querySelectorAll('.dev-in-list')
        devs.forEach(dev => {
            const tickets = document.querySelectorAll(`app-ticket[data-status="1"][dev="${dev.getAttribute('dev')}"]`)
            dev.querySelector('.dev-counter').innerHTML = tickets.length.toString()
        })
    }

    onDragLeave(e) {
        e.currentTarget.style.border='none'
    }

    allowDrop(e) {
        e.preventDefault();
        e.currentTarget.style.border='1px solid red'
    }

    reconnect(displaced) {
        const controllers = this.application.controllers
        console.warn(controllers.length)
    }
}
