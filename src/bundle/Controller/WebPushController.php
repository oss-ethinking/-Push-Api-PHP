<?php
namespace Ethinking\EthinkingPushApiBundle\Controller;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Class WebPushController
 * @package Ethinking\EthinkingPushApiBundle\Controller
 */
class WebPushController
{
    /**
     * @return BinaryFileResponse
     */
    public function indexAction()
    {
        $path = __DIR__ . '/../Resources/public/js/scripts/webpush.js';

        return new BinaryFileResponse($path, Response::HTTP_OK, [
            'Content-Type' => 'text/javascript'
        ]);
    }
}