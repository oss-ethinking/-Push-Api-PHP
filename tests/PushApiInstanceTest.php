<?php

namespace Ethinking\Test;

use Ethinking\EthinkingPushApiBundle\Entity\Channel;
use Ethinking\EthinkingPushApiBundle\Entity\History;
use Ethinking\EthinkingPushApiBundle\Entity\HistoryDetails;
use Ethinking\EthinkingPushApiBundle\Service\FormDataPart;
use Ethinking\EthinkingPushApiBundle\Service\JsonPart;
use Ethinking\EthinkingPushApiBundle\Service\PushApiInstance;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
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

    public function testAddChannelAndDefaultTag_returnsTrue(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $addTagUri = "/push-admin-api/tag/add/{$clientId}";
        $addChannelUri = "/push-admin-api/app/add/{$clientId}";
        $defaultTagSourceId = "push-connector-tag-general-{$clientId}";
        $addTagResponse = $this->getResponse();
        $addChannelResponse = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->at(0))
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $addTagUri))
            ->willReturn($addTagResponse);

        $this->httpClient->expects($this->at(1))
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $addChannelUri))
            ->willReturn($addChannelResponse);

        // When
        $result = $this->pushApiService->addChannelAndDefaultTag(new Channel());

        // Then
        $this->assertTrue($result);
    }

    public function testAddChannel_returnsTrue(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/add/{$clientId}";
        $response = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->addChannel(new Channel());

        // Then
        $this->assertTrue($result);
    }

    public function testAddChannel_returnsFalse(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/add/{$clientId}";
        $response = $this->getResponse('{}', 500);

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->addChannel(new Channel());

        // Then
        $this->assertFalse($result);
    }

    public function testUpdateChannel_returnsTrue(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/update/{$clientId}";
        $response = $this->getResponse();
        $channel = new Channel();
        $channel->setId('1');

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->updateChannel($channel);

        // Then
        $this->assertTrue($result);
    }

    public function testUpdateChannel_returnsFalse(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/update/{$clientId}";
        $response = $this->getResponse('{}', 500);
        $channel = new Channel();
        $channel->setId('1');

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->updateChannel($channel);

        // Then
        $this->assertFalse($result);
    }

    public function testUpdateChannel_throwsBadRequestHttpException(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/update/{$clientId}";
        $response = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->expectException(BadRequestHttpException::class);

        // When
        $this->pushApiService->updateChannel(new Channel());
    }

    public function testDeleteChannel_returnsTrue(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $uri = "/push-admin-api/app/delete/{$clientId}";
        $response = $this->getResponse();
        $id = 'id';

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->deleteChannel($id);

        // Then
        $this->assertTrue($result);
    }

    public function testGetHistory_returnsHistory(): void
    {
        // Given
        $page = 2;
        $count = 1;
        $clientId = 'random-string';
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $uri = "/push-admin-api/history/get/{$clientId}?page={$page}&count={$count}";
        $historyJson = '[{"id":"1","userName":"2","status":"3","time":"4"}]';
        $response = $this->getResponse($historyJson);
        $expectedHistory = new History('1', '2', '3', '4');

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

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $uri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($response);

        // When
        $historyArray = $this->pushApiService->getHistory($page, $count);

        // Then
        $this->assertEquals($expectedHistory, current($historyArray));
    }

    public function testGetHistoryDetails_returnsHistoryDetails(): void
    {
        // Given
        $id = 1;
        $clientId = 'random-string';
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $uri = "/push-api/status/{$id}";
        $historyJson = '[{"key":{"id":"1","platformId":"2"},"state":"3","totalCount":"4","successCount":"5"}]';
        $response = $this->getResponse($historyJson);
        $expectedHistoryDetails = new HistoryDetails('1', '2', '3', '4', '5');

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

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $uri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($response);

        // When
        $historyDetailsArray = $this->pushApiService->getHistoryDetails($id);

        // Then
        $this->assertEquals($expectedHistoryDetails, current($historyDetailsArray));
    }

    public function testAddTag_returnsTrue(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $addTagUri = "/push-admin-api/tag/add/{$clientId}";
        $addTagResponse = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $addTagUri))
            ->willReturn($addTagResponse);

        // When
        $result = $this->pushApiService->addTag("random", "random");

        // Then
        $this->assertTrue($result);
    }

    public function testSendPushNotification_returnsTrue(): void
    {
        // Given
        $domain = 'random-domain';
        $uri = "/push-api/push";
        $response = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->sendPushNotification([]);

        // Then
        $this->assertTrue($result);
    }

    public function testSendPush_returnsTrue(): void
    {
        // Given
        $domain = 'random-domain';
        $uri = "/push-api/push";
        $response = $this->getResponse();

        $this->settings->expects($this->any())
            ->method('getDomain')
            ->willReturn($domain);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('POST'), $this->equalTo($domain . $uri))
            ->willReturn($response);

        // When
        $result = $this->pushApiService->sendPush([]);

        // Then
        $this->assertTrue($result);
    }

    public function testGetDefaultTagSourceId_returnsDefaultTagId(): void
    {
        // Given
        $clientId = 'random-string';
        $expectedDefaultTagSourceId = "push-connector-tag-general-{$clientId}";

        $this->settings->expects($this->any())
            ->method('getClientId')
            ->willReturn($clientId);

        // When
        $defaultTagSourceId = $this->pushApiService->getDefaultTagSourceId();

        // Then
        $this->assertEquals($expectedDefaultTagSourceId, $defaultTagSourceId);
    }

    public function testGetDefaultTagId_returnsDefaultTagId(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $field = 'sourceId';
        $expectedId = "push-connector-tag-general-{$clientId}";
        $uri = "/push-admin-api/tag/{$field}/{$expectedId}/{$clientId}";
        $tagJson = '{"id":"' . $expectedId . '"}';
        $response = $this->getResponse($tagJson);

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

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $uri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($response);

        // When
        $defaultTagId = $this->pushApiService->getDefaultTagId();

        // Then
        $this->assertEquals($expectedId, $defaultTagId);
    }

    public function testGetTag_returnsTag(): void
    {
        // Given
        $clientId = 'random-string';
        $domain = 'random-domain';
        $username = 'random-username';
        $password = 'random-password';
        $field = 'random-field';
        $id = '1';
        $uri = "/push-admin-api/tag/{$field}/{$id}/{$clientId}";
        $tagJson = '{"id":"1"}';
        $response = $this->getResponse($tagJson);
        $expectedTag = ['id' => '1'];

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

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with($this->equalTo('GET'), $this->equalTo($domain . $uri), $this->equalTo([
                'auth_basic' => "{$username}:{$password}"
            ]))
            ->willReturn($response);

        // When
        $tag = $this->pushApiService->getTag($field, $id);

        // Then
        $this->assertEquals($expectedTag, $tag);
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

    private function getResponse(string $content = '{}', int $statusCode = 200): ResponseInterface
    {
        $response = new class implements ResponseInterface {
            private $content;
            private $statusCode;

            public function getHeaders(bool $throw = true): array {}
            public function toArray(bool $throw = true): array {}
            public function cancel(): void {}
            public function getInfo(string $type = null) {}

            public function getStatusCode(): int {
                return $this->statusCode;
            }

            public function setStatusCode(int $statusCode) {
                $this->statusCode = $statusCode;
            }

            public function getContent(bool $throw = true): string
            {
                return $this->content;
            }

            public function setContent($content)
            {
                $this->content = $content;
            }
        };

        $response->setStatusCode($statusCode);
        $response->setContent($content);

        return $response;
    }
}
