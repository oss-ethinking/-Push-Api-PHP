<?php

namespace Ethinking\EthinkingPushApiBundle\Entity;

class Settings
{
    private $settingsId;
    private $domain;
    private $username;
    private $password;
    private $clientId;

    /**
     * @param $settingsId
     * @param $domain
     * @param $username
     * @param $password
     * @param $clientId
     */
    public function __construct($settingsId, $domain, $username, $password, $clientId)
    {
        $this->settingsId = $settingsId;
        $this->domain = $domain;
        $this->username = $username;
        $this->password = $password;
        $this->clientId = $clientId;
    }

    public function getSettingsId()
    {
        return $this->settingsId;
    }

    public function getDomain()
    {
        return $this->domain;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getClientId()
    {
        return $this->clientId;
    }
}