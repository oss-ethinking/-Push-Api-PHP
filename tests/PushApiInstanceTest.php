<?php

namespace Ethinking\Test;

use Ethinking\EthinkingPushApiBundle\Entity\Channel;
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

        $this->cache = new CacheFake();

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

    public function testGetChannels_returnsChannels(): void
    {
        // Given
        $this->expectChannels();

        // When
        $channels = $this->pushApiService->getChannels();

        $expectedChannel = new Channel();
        $expectedChannel->setId('1');
        $expectedChannel->setPlatformId('7');
        $expectedChannel->setAppName('3');
        $expectedChannel->setSenderId('4');
        $expectedChannel->setPushTemplate('5');
        $expectedChannel->setFirebaseProjectId('6');
        $expectedChannel->setFirebaseMessagingSenderId('7');
        $expectedChannel->setFirebaseApiKey('8');
        $expectedChannel->setFirebaseAppId('9');
        $expectedChannel->setFallbackUrl('10');
        $expectedChannel->setAccessToken('11');
        $expectedChannel->setApiUrl('random-domain');
        $expectedChannel->setConnectedTagIds(['1']);

        // Then
        $this->assertCount(1, $channels);
        $this->assertEquals($expectedChannel, current($channels));
    }

    public function testGetChannel_returnsChannel(): void
    {
        // Given
        $this->expectChannels();

        // When
        $channel = $this->pushApiService->getChannel('1');

        $expectedChannel = new Channel();
        $expectedChannel->setId('1');
        $expectedChannel->setPlatformId('7');
        $expectedChannel->setAppName('3');
        $expectedChannel->setSenderId('4');
        $expectedChannel->setPushTemplate('5');
        $expectedChannel->setFirebaseProjectId('6');
        $expectedChannel->setFirebaseMessagingSenderId('7');
        $expectedChannel->setFirebaseApiKey('8');
        $expectedChannel->setFirebaseAppId('9');
        $expectedChannel->setFallbackUrl('10');
        $expectedChannel->setAccessToken('11');
        $expectedChannel->setApiUrl('random-domain');
        $expectedChannel->setConnectedTagIds(['1']);

        // Then
        $this->assertEquals($expectedChannel, $channel);
    }

    public function testGetChannel_returnsNull(): void
    {
        // Given
        $this->expectChannels();

        // When
        $channel = $this->pushApiService->getChannel('2');

        // Then
        $this->assertNull($channel);
    }

    public function testGetDefaultWebPushChannel_returnsDefaultChannel(): void
    {
        // Given
        $this->expectChannels();

        $expectedChannel = new Channel();
        $expectedChannel->setId('1');
        $expectedChannel->setPlatformId('7');
        $expectedChannel->setAppName('3');
        $expectedChannel->setSenderId('4');
        $expectedChannel->setPushTemplate('5');
        $expectedChannel->setFirebaseProjectId('6');
        $expectedChannel->setFirebaseMessagingSenderId('7');
        $expectedChannel->setFirebaseApiKey('8');
        $expectedChannel->setFirebaseAppId('9');
        $expectedChannel->setFallbackUrl('10');
        $expectedChannel->setAccessToken('11');
        $expectedChannel->setApiUrl('random-domain');
        $expectedChannel->setConnectedTagIds(['1']);

        // When
        $defaultWebPushChannel = $this->pushApiService->getDefaultWebPushChannel();

        // Then
        $this->assertEquals($expectedChannel, $defaultWebPushChannel);
    }

    public function testClearDefaultWebPushChannel_returnsTrue(): void
    {
        // When
        $clearCacheResult = $this->pushApiService->clearDefaultWebPushChannel();

        // Then
        $this->assertTrue($clearCacheResult);
    }

    private function expectChannels()
    {
        $webPushPlatformId = '7';
        $clientId = 'random-string';
        $channelsUri = "/push-admin-api/app/get/{$clientId}";
        $defaultTagUri = "/push-admin-api/tag/sourceId/push-connector-tag-general-{$clientId}/{$clientId}";
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $defaultTagJson = '{"id":"1"}';
        $channelsJson = '[{"id":"1","platformId":"' . $webPushPlatformId . '","name":"3","parameters":'
            . '{"senderId":"4","pushTemplate":"5","firebaseProjectId":"6","firebaseMessagingSenderId":"7",'
            . '"firebaseApiKey":"8","firebaseAppId":"9","fallbackUrl":"10"},"apiUser":{"accessToken":"11"}}]';

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
