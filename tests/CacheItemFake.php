<?php

namespace Ethinking\Test;

use Psr\Cache\CacheException;
use Psr\Cache\InvalidArgumentException;
use Symfony\Contracts\Cache\ItemInterface;

class CacheItemFake implements ItemInterface
{
    public function getKey() {}
    public function get() {}
    public function isHit() {}
    public function set($value) {}
    public function expiresAt($expiration) {}
    public function expiresAfter($time) {}
    public function tag($tags): ItemInterface {}
    public function getMetadata(): array {}
}