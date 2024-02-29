import { Controller } from '@hotwired/stimulus';
import DevName from "../js/elements/DevName";

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
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

        if(dev && devName) {
            const devElement = droppedElement.querySelector('dev-name')
            if(devElement) {
                devElement.setAttribute('dev', dev)
                devElement.setAttribute('name', devName)
            }
            droppedElement.setAttribute('dev', dev)
            droppedElement.setAttribute('dev-name', devName)
            const DevName = document.createElement('dev-name')
            DevName.dev = dev
            DevName.name = devName
            droppedElement.appendChild(DevName)
        }

        droppedElement.setAttribute('data-status', dropzone.dataset.status)

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
