import { Controller } from '@hotwired/stimulus';
import DevName from "../js/elements/DevName";
import tippy from "tippy.js";

export default class extends Controller {
    connect() {
        const dataset = this.element.dataset

        tippy(this.element, {
            placement: dataset.placement ?? 'bottom',
            content: dataset.tooltip,
            theme: dataset.theme ?? 'light-border',
            trigger: dataset.trigger ?? 'click',
            allowHTML: true,
            interactive: dataset.interactive ? dataset.interactive === '1' : false
        })
    }
}
