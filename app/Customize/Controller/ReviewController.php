<?php

namespace Customize\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Routing\Annotation\Route;

use Eccube\Controller\AbstractController;

class ReviewController extends AbstractController
{
    /**
     * @Route("/reviews", name="review_list")
     * @Template("Review/index.twig")
     */
    public function review()
    {
        return [];
    }
}
