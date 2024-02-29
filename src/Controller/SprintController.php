<?php

namespace App\Controller;

use App\Entity\Ticket;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SprintController extends AbstractController
{
    #[Route('/sprint', name: 'app_sprint')]
    public function index(TicketRepository $ticketRepository, UserRepository $userRepository): Response
    {
        $users   = $userRepository->findAll();
        $tickets = [];
        $todo = $ticketRepository->findBy(['status' => Ticket::STATUS_TO_DO], ['name' => 'ASC']);
        $done = $ticketRepository->findBy(['status' => Ticket::STATUS_DONE], ['name' => 'ASC']);
        foreach ($users as $user) {
            $inProgress = $ticketRepository->findBy(['status' => Ticket::STATUS_IN_PROGRESS, 'developer' => $user], ['name' => 'ASC']);
            $tickets[$user->getName()] = $inProgress;
        }

        return $this->render('sprint/index.html.twig', [
            'todo' => $todo,
            'tickets' => $tickets,
            'done' => $done,
            'users'   => $users,
        ]);
    }
}
