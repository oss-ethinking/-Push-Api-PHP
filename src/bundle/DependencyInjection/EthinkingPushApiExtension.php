<?php

namespace Ethinking\EthinkingPushApiBundle\DependencyInjection;

use Symfony\Component\Config\Loader\DelegatingLoader;
use Symfony\Component\Config\Loader\LoaderResolver;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\Yaml\Yaml;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class EthinkingPushApiExtension extends Extension implements PrependExtensionInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $fileLocator = new FileLocator(__DIR__ . '/../Resources/config');

        $resolver = new LoaderResolver([
            new Loader\YamlFileLoader($container, $fileLocator),
            new Loader\DirectoryLoader($container, $fileLocator),
        ]);

        $loader = new DelegatingLoader($resolver);
        $loader->load('services.yaml');
        $loader->load('extensions.yaml');
    }

    public function prepend(ContainerBuilder $container)
    {
        // Allows an extension to prepend the extension configurations.
    }
}
