<?php

namespace Ethinking\Test;

use Ethinking\EthinkingPushApiBundle\Service\PushApiInstance;
use PHPUnit\Framework\TestCase;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

class PushApiInstanceTest extends TestCase
{
    private $pushApiService;
    private $httpClient;
    private $logger;
    private $settings;
    private $cache;

    protected function setUp(): void
    {
        $this->httpClient = $this->getMockBuilder('Symfony\Contracts\HttpClient\HttpClientInterface')
            ->disableOriginalConstructor()
            ->getMock();

        $this->logger = $this->getMockBuilder('Psr\Log\LoggerInterface')
            ->disableOriginalConstructor()
            ->getMock();

        $this->settings = $this->getMockBuilder('Ethinking\EthinkingPushApiBundle\Entity\Settings')
            ->disableOriginalConstructor()
            ->getMock();

        $this->cache = $this->getMockBuilder('Symfony\Contracts\Cache\CacheInterface')
            ->disableOriginalConstructor()
            ->getMock();

        $this->pushApiService = new PushApiInstance($this->httpClient, $this->logger, $this->settings, $this->cache);
    }

    public function testGetDefaultTagSourceId_returnsTag(): void
    {
        // Given
        $this->settings->expects($this->once())
            ->method('getClientId')
            ->willReturn('random-string');

        // When
        $defaultTag = $this->pushApiService->getDefaultTagSourceId();

        // Then
        $this->assertEquals('push-connector-tag-general-random-string', $defaultTag);
    }

    /**
     * @group active
     */
    public function testGetChannels_returnsChannels(): void
    {
        // Given
        $clientId = 'random-string';
        $channelsUri = "/push-admin-api/app/get/{$clientId}";
        $defaultTagUri = "/push-admin-api/tag/sourceId/push-connector-tag-general-{$clientId}/{$clientId}";
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $channelsJson = '[{"id":"1","platformId":"2","name":"3","parameters":'
            . '{"senderId":"4","pushTemplate":"5","firebaseProjectId":"6","firebaseMessagingSenderId":"7",'
            . '"firebaseApiKey":"8","firebaseAppId":"9","fallbackUrl":"10"},"apiUser":{"accessToken":"11"}}]';
        $defaultTagJson = '{"id":"1"}';

        $channelsResponse = $this->getResponse($channelsJson);
        $defaultTagResponse = $this->getResponse($defaultTagJson);

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->settings->expects($this->any())
            ->method('getUsername')
            ->willReturn($username);

        $this->settings->expects($this->any())
            ->method('getPassword')
            ->willReturn($password);

        $this->httpClient->expects($this->at(0))
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $channelsUri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($channelsResponse);

        $this->httpClient->expects($this->at(1))
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $defaultTagUri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($defaultTagResponse);

        // When
        $channels = $this->pushApiService->getChannels();

        // Then
        $this->assertCount(1, $channels);
        $this->assertEquals('1', $channels[0]->getId());
        $this->assertEquals('2', $channels[0]->getPlatformId());
        $this->assertEquals('3', $channels[0]->getAppName());
        $this->assertEquals('4', $channels[0]->getSenderId());
        $this->assertEquals('5', $channels[0]->getPushTemplate());
        $this->assertEquals('6', $channels[0]->getFirebaseProjectId());
        $this->assertEquals('7', $channels[0]->getFirebaseMessagingSenderId());
        $this->assertEquals('8', $channels[0]->getFirebaseApiKey());
        $this->assertEquals('9', $channels[0]->getFirebaseAppId());
        $this->assertEquals('10', $channels[0]->getFallbackUrl());
        $this->assertEquals('11', $channels[0]->getAccessToken());
    }

    private function getResponse(string $content): ResponseInterface
    {
        $response = new class implements ResponseInterface {
            private $content;

            public function getStatusCode(): int {}
            public function getHeaders(bool $throw = true): array {}
            public function toArray(bool $throw = true): array {}
            public function cancel(): void {}
            public function getInfo(string $type = null) {}

            public function getContent(bool $throw = true): string
            {
                return $this->content;
            }

            public function setContent($content)
            {
                $this->content = $content;
            }
        };

        $response->setContent($content);

        return $response;
    }
}
