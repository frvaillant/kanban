import './bootstrap.js';
import ('./js/elements/elements')
import ('./js/eventListeners/eventListeners')

/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
*/

const ws = new WebSocket("ws://localhost:5580/");
ws.onmessage = (e) => {
    const message = JSON.parse(e.data)
    if(message.sentBy !== document.body.dataset.user) {
        alert(message)
    }
}

import './styles/app.scss';
