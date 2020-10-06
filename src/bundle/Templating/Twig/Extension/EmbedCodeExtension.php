<?php

namespace Ethinking\EthinkingPushApiBundle\Templating\Twig\Extension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig\Environment;

class EmbedCodeExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction(
                'ethinking_push_embed_code',
                [$this, 'generate'],
                [
                    'is_safe' => ['html'],
                    'needs_environment' => true
                ]
            )];
    }

    public function generate(Environment $environment, $config): string
    {
        if (empty($config)) {
            return "";
        }

        $configJson = json_encode($config);

        if ($configJson === false) {
            return "";
        }

        return <<<EOD
<script src="/webpush.js"></script>
<script type="text/javascript">
    window.addEventListener('load', () => {
        var config = $configJson;
        var push = new PushDelivery(config);

        if (push.isSupportedBrowser()) {
            var pushUI = new PushDeliveryUI(config);
            pushUI.init();
        }
    });
</script>
EOD;
    }
}
