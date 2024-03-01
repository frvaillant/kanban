document.addEventListener('sprintClosed', () => {

    const doneTickets = document.querySelectorAll('app-ticket[data-status="2"]')
    doneTickets.forEach(ticket => {
        ticket.remove()
    })
})