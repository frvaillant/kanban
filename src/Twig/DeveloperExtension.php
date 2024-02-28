<?php

namespace App\Twig;

use App\Entity\Ticket;
use App\Entity\User;
use App\Repository\TicketRepository;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class DeveloperExtension extends AbstractExtension
{

    public function __construct(private TicketRepository $ticketRepository)
    {
    }

    public function getFilters()
    {
        return [
            new TwigFilter('tickets_doing_count', [$this, 'ticketsDoingCount']),
        ];
    }

    public function ticketsDoingCount(User $developer): int
    {
        $doingTickets = $this->ticketRepository->findBy([
            'developer' => $developer,
            'status' => Ticket::STATUS_IN_PROGRESS
        ]);
        return count($doingTickets);
    }
}