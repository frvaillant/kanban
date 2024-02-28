import { Controller } from '@hotwired/stimulus';

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

        droppedElement.setAttribute('data-status', dropzone.dataset.status)

        e.stopPropagation()
        return false
    }

    onDragLeave(e) {
        e.currentTarget.style.border='none'
    }

    drag(e) {
        console.log('drag')
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData("text", e.target.id);
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
