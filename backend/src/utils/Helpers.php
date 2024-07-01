<?php

namespace Utils;

class Helpers {
    static function destructureUriComponents() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );

        $mainRoute = $uri[2] ?? null;
        $entityId = $uri[3] ?? null;
        $childRoute = $uri[4] ?? null;

        return [$mainRoute, $entityId, $childRoute];
    }
}