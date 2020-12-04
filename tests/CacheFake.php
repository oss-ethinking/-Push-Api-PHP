<?php

namespace Ethinking\Test;

use Psr\Cache\InvalidArgumentException;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\CallbackInterface;
use Ethinking\EthinkingPushApiBundle\Entity\Channel;

class CacheFake implements CacheInterface
{
    public function delete(string $key): bool
    {
        return true;
    }

    public function get(string $key, callable $callback, float $beta = null, array &$metadata = null)
    {
        return $callback(new CacheItemFake());
    }
}