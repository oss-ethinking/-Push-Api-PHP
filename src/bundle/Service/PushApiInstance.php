<?php

namespace Ethinking\EthinkingPushApiBundle\Service;

use Exception;
use Ethinking\EthinkingPushApiBundle\Entity\Channel;
use Ethinking\EthinkingPushApiBundle\Entity\History;
use Ethinking\EthinkingPushApiBundle\Entity\HistoryDetails;
use Ethinking\EthinkingPushApiBundle\Entity\Settings;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

/**
 * Class PushApiInstance
 * @package EzPlatform\PushConnectorBundle\Service
 */
class PushApiInstance
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
     * @var CacheInterface
     */
    private $cache;

    const DEFAULT_CHANNEL_TAG = 'General';
    const DEFAULT_CHANNEL_CACHE_KEY = 'ethinking_web_push_default_channel';
    const DEFAULT_CHANNEL_CACHE_EXP_SEC = 3600;

    /**
     * @param HttpClientInterface $httpClient
     * @param LoggerInterface|null $logger
     * @param Settings $settings
     */
    public function __construct(
        HttpClientInterface $httpClient,
        LoggerInterface $logger,
        Settings $settings,
        CacheInterface $cache
    ) {
        $this->httpClient = $httpClient;
        $this->logger = $logger;
        $this->settings = $settings;
        $this->cache = $cache;
    }

    /**
     * @return Channel[]
     */
    public function getChannels(): array
    {
        $channels = [];
        $uri = "/push-admin-api/app/get/{$this->settings->getClientId()}";
        $items = $this->get($uri);

        if (empty($items)) {
            return [];
        }

        foreach ($items as $item) {
            $channel = new Channel();
            $channel->setAppName($item['name']);
            $channel->setPlatformId($item['platformId']);

            if (array_key_exists('id', $item)) {
                $channel->setId($item['id']);
            }

            if (array_key_exists('parameters', $item)) {
                if (array_key_exists('senderId', $item['parameters'])) {
                    $channel->setSenderId($item['parameters']['senderId']);
                }

                if (array_key_exists('pushTemplate', $item['parameters'])) {
                    $channel->setPushTemplate($item['parameters']['pushTemplate']);
                }

                if (array_key_exists('firebaseMessagingSenderId', $item['parameters'])) {
                    $channel->setFirebaseMessagingSenderId($item['parameters']['firebaseMessagingSenderId']);
                }

                if (array_key_exists('firebaseProjectId', $item['parameters'])) {
                    $channel->setFirebaseProjectId($item['parameters']['firebaseProjectId']);
                }

                if (array_key_exists('firebaseApiKey', $item['parameters'])) {
                    $channel->setFirebaseApiKey($item['parameters']['firebaseApiKey']);
                }

                if (array_key_exists('firebaseAppId', $item['parameters'])) {
                    $channel->setFirebaseAppId($item['parameters']['firebaseAppId']);
                }

                if (array_key_exists('fallbackUrl', $item['parameters'])) {
                    $channel->setFallbackUrl($item['parameters']['fallbackUrl']);
                }

                $channel->setApiUrl($this->settings->getDomain());
            }
            if (array_key_exists('apiUser', $item) && array_key_exists('accessToken', $item['apiUser'])) {
                $channel->setAccessToken($item['apiUser']['accessToken']);
            }

            $channel->setConnectedTagIds($this->getConnectedTagIds());

            $channels[] = $channel;
        }

        return $channels;
    }

    /**
     * @param int $id
     * @return Channel|null
     */
    public function getChannel(int $id): ?Channel
    {
        $channels = $this->getChannels();

        foreach ($channels as $channel) {
            if ($channel->getId() == $id) {
                return $channel;
            }
        }

        return null;
    }

    /**
     * Returns first channel with WEB_PUSH platform from cache
     * @return Channel|null
     */
    public function getDefaultWebPushChannel(): ?Channel
    {
        return $this->cache->get(self::DEFAULT_CHANNEL_CACHE_KEY, function (ItemInterface $item) {
            $item->expiresAfter(self::DEFAULT_CHANNEL_CACHE_EXP_SEC);

            $channels = $this->getChannels();

            foreach ($channels as $channel) {
                if ($channel->getPlatformId() == PushApiService::WEB_PUSH) {
                    return $channel;
                }
            }

            return null;
        });
    }

    /**
     * Clears default channel cache
     * @return bool
     */
    public function clearDefaultWebPushChannel(): bool
    {
        return $this->cache->delete(self::DEFAULT_CHANNEL_CACHE_KEY);
    }

    /**
     * @param Channel $channel
     * @return bool
     */
    public function addChannelAndDefaultTag(Channel $channel)
    {
        $this->addTag(self::DEFAULT_CHANNEL_TAG, $this->getDefaultTagSourceId());
        return $this->addChannel($channel);
    }

    /**
     * @param Channel $channel
     * @return bool
     */
    public function addChannel(Channel $channel)
    {
        $uri = "/push-admin-api/app/add/{$this->settings->getClientId()}";
        return $this->post($uri, $this->getChannelFormData($channel), false);
    }

    /**
     * @param Channel $channel
     * @return bool
     */
    public function updateChannel(Channel $channel)
    {
        $uri = "/push-admin-api/app/update/{$this->settings->getClientId()}";
        return $this->post($uri, $this->getChannelFormData($channel, false), false);
    }

    /**
     * @param string $id
     * @return bool
     */
    public function deleteChannel(string $id)
    {
        $uri = "/push-admin-api/app/delete/{$this->settings->getClientId()}";
        return $this->post($uri, ['id' => $id]);
    }

    /**
     * @param int $page
     * @param int $count
     * @return History[]
     */
    public function getHistory($page = 1, $count = 20): array
    {
        $historyArray = [];
        $uri = "/push-admin-api/history/get/{$this->settings->getClientId()}?page={$page}&count={$count}";
        $items = $this->get($uri);

        if (empty($items)) {
            return [];
        }

        foreach ($items as $item) {
            $history = new History($item['id'], $item['userName'], $item['status'], $item['time']);
            $historyArray[] = $history;
        }

        return $historyArray;
    }

    /**
     * @param int $id
     * @return HistoryDetails[]
     */
    public function getHistoryDetails($id): array
    {
        $detailsArray = [];
        $uri = "/push-api/status/${id}";
        $items = $this->get($uri);

        if (empty($items)) {
            return [];
        }

        foreach ($items as $item) {
            $details = new HistoryDetails(
                $item['key']['id'],
                $item['key']['platformId'],
                $item['state'],
                $item['totalCount'],
                $item['successCount']
            );

            $detailsArray[] = $details;
        }

        return $detailsArray;
    }

    /**
     * @param Channel $channel
     * @param bool $isNewChannel
     * @return array
     * @throws BadRequestHttpException
     */
    private function getChannelFormData(Channel $channel, bool $isNewChannel = true)
    {
        $data = [
            'name' => $channel->getAppName(),
            'platformId' => $channel->getPlatformId(),
            'parameters' => [
                'senderId' => $channel->getSenderId(),
                'pushTemplate' => $channel->getPushTemplate(),
            ],
            'tags' => [
                [
                    'sourceId' => $this->getDefaultTagSourceId()
                ]
            ]
        ];

        if (!$isNewChannel) {
            $data['id'] = $channel->getId();

            if (intval($data['id']) === 0) {
                $this->logger->error("Could not update channel without id");
                throw new BadRequestHttpException();
            }
        }

        if ($channel->isWebPush()) {
            $data['parameters']['firebaseMessagingSenderId'] = $channel->getFirebaseMessagingSenderId();
            $data['parameters']['firebaseProjectId'] = $channel->getFirebaseProjectId();
            $data['parameters']['firebaseApiKey'] = $channel->getFirebaseApiKey();
            $data['parameters']['firebaseAppId'] = $channel->getFirebaseAppId();
            $data['parameters']['fallbackUrl'] = $channel->getFallbackUrl();
        }

        return $data;
    }

    /**
     * @param string $name
     * @param string $sourceId
     * @return bool
     */
    public function addTag(string $name, string $sourceId)
    {
        $uri = "/push-admin-api/tag/add/{$this->settings->getClientId()}";
        $tags = [
            'tags' => [
                [
                    "name" => $name,
                    'sourceId' => $sourceId
                ]
            ]
        ];

        return $this->post($uri, $tags);
    }

    /**
     * @param array $payload
     * @return bool
     */
    public function sendPushNotification(array $payload)
    {
        $data = [
            'tagSourceIds' => [$this->getDefaultTagSourceId()],
            'payload' => json_encode($payload, true)
        ];
        return $this->sendPush($data);
    }

    /**
     * @param array $data
     * @return bool
     */
    public function sendPush(array $data)
    {
        $uri = "/push-api/push";
        return $this->post($uri, $data);
    }

    /**
     * @return string
     */
    public function getDefaultTagSourceId()
    {
        return "push-connector-tag-general-{$this->settings->getClientId()}";
    }

    /**
     * @return mixed|null
     */
    public function getDefaultTagId()
    {
        $item = $this->getTag('sourceId', $this->getDefaultTagSourceId());

        if (!array_key_exists('id', $item)) {
            return null;
        }

        return $item['id'];
    }

    /**
     * @param string $field
     * @param string $id
     * @return mixed|null
     */
    public function getTag(string $field, string $id)
    {
        $uri = "/push-admin-api/tag/{$field}/{$id}/{$this->settings->getClientId()}";
        return $this->get($uri);
    }

    /**
     * @return array
     */
    private function getConnectedTagIds()
    {
        $connectedTagIds = [];
        array_push($connectedTagIds, $this->getDefaultTagId());
        return $connectedTagIds;
    }


    /**
     * @param string $uri
     * @return mixed|null
     */
    private function get(string $uri)
    {
        $data = null;

        try {
            $response = $this->httpClient->request('GET', $this->settings->getDomain() . $uri, [
                'auth_basic' => "{$this->settings->getUsername()}:{$this->settings->getPassword()}"
            ]);

            $json = $response->getContent(true);
            $data = json_decode($json, true);
        } catch (TransportExceptionInterface | ClientExceptionInterface
        | RedirectionExceptionInterface | ServerExceptionInterface $e) {
            $this->logger->warning("GET request for $uri failed. {$e->getMessage()}");
            return null;
        }

        return $data;
    }

    /**
     * @param string $uri
     * @param array $data
     * @param bool $hasJsonBody
     * @return bool
     */
    private function post(string $uri, array $data, bool $hasJsonBody = true)
    {
        $options = [
            'auth_basic' => "{$this->settings->getUsername()}:{$this->settings->getPassword()}",
        ];

        if ($hasJsonBody) {
            $options['headers'] = ['Content-Type' => 'application/json'];
            $options['json'] = $data;
        } else {
            $formData = new FormDataPart(['data' => new JsonPart($data)]);
            $options['headers'] = $formData->getPreparedHeaders()->toArray();
            $options['body'] = $formData->bodyToIterable();
        }

        try {
            $response = $this->httpClient->request('POST', $this->settings->getDomain() . $uri, $options);
            if ($response->getStatusCode() != Response::HTTP_OK) {
                $this->logger->warning("POST request for $uri failed. Wrong http code {$response->getStatusCode()}");
                return false;
            }
        } catch (TransportExceptionInterface $e) {
            $this->logger->warning("POST request for $uri failed. {$e->getMessage()}");
            return false;
        }

        return true;
    }
}