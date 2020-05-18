<?php
namespace Ethinking\EthinkingPushApiBundle\Controller;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Class ServiceWorker
 * @package Ethinking\EthinkingPushApiBundle\Controller
 */
class ServiceWorkerController
{
    /**
     * @return BinaryFileResponse
     */
    public function indexAction()
    {
        $path = __DIR__ . '/../Resources/public/js/scripts/service-worker.js';

        return new BinaryFileResponse($path, Response::HTTP_OK, [
            'Content-Type' => 'text/javascript'
        ]);
    }
}