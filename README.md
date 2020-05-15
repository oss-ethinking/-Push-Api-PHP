# Push API

Push.Delivery service wrapper which makes it possible to send Push Notifications via various channels to many subscribers and in high speed

## Installation

The easiest and recommended way to install this utility is as a composer package:

```php
composer require ethinking/push-api
```

## Usage
Add to your service the next code:
```yaml
Ethinking\EthinkingPushApiBundle\Service\PushApiService:
    arguments:
        - '@Symfony\Contracts\HttpClient\HttpClientInterface'
        - '@logger'
```

Initialize in your class:
```php
use Ethinking\EthinkingPushApiBundle\Service\PushApiService;
use Ethinking\EthinkingPushApiBundle\Entity\Settings;

public function __construct(PushApiService $pushApiService)
{
    settings = new Settings(
        $this->getSettingsId(),
        $this->getDomain(),
        $this->getUsername(),
        $this->getPassword(),
        $this->getClientId()
    );
    
    $pushApiService->setSettings($settings);
}
```

## Dependencies

```json
{
    "symfony/dependency-injection": "^5.0",
    "symfony/http-kernel": "^5.0",
    "symfony/http-foundation": "^4.4|^5.0",
    "symfony/http-client": "^4.3|^5.0",
    "symfony/http-client-contracts": "^1.1.8|^2",
    "symfony/validator": "^3.4.30|^4.3.3|^5.0",
    "symfony/mime": "^4.3|^5.0"
}
```