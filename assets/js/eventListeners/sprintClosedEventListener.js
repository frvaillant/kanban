document.addEventListener('sprintClosed', () => {

    const doneTickets = document.querySelectorAll('app-ticket[data-status="2"]')
    doneTickets.forEach(ticket => {
        ticket.remove()
        sendMessage()
    })
})


function sendMessage() {
    const ws = new WebSocket("ws://localhost:5580/");

    ws.onopen = function(event) {
        const message = {
            'sentBy'  : document.body.dataset.user,
        }
        ws.send(JSON.stringify(message));
        ws.close();
    };
}