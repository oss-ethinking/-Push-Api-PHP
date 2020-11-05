<?php

namespace Ethinking\Test;

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase {

    public function testTwoNumberEquality()
    {
        $this->assertSame(1, 1);
    }
}
