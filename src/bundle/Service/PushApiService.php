<?php

namespace Ethinking\EthinkingPushApiBundle\Service;

use Exception;
use Ethinking\EthinkingPushApiBundle\Entity\Settings;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Psr\Log\LoggerInterface;

/**
 * Class PushApiService
 * @package EzPlatform\PushConnectorBundle\Service
 */
class PushApiService
{
    /**
     * @var HttpClientInterface
     */
    private $httpClient;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var Settings
     */
    private $settings;

    /**
     * Platforms
     */
    const FIREBASE_ANDROID = '15';
    const WEB_PUSH = '7';
    const IOS = '3';

    /**
     * @param HttpClientInterface $httpClient
     * @param LoggerInterface|null $logger
     * @throws Exception
     */
    public function __construct(HttpClientInterface $httpClient, LoggerInterface $logger)
    {
        $this->httpClient = $httpClient;
        $this->logger = $logger;
    }

    /**
     * @param Settings $settings
     * @return PushApiInstance
     */
    public function getInstance(Settings $settings)
    {
        return new PushApiInstance($this->httpClient, $this->logger, $settings);
    }
}