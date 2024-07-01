<?php


set_include_path(__ROOT__."/src/");

function my_autoload($class) {
    $segments = explode('\\', $class);
    $segments[0] = strtolower($segments[0]);
    $path = implode(DIRECTORY_SEPARATOR, $segments);
    $file = __ROOT__."/src/{$path}.php";

    if (file_exists($file)) {
        require_once $file;
    }
}

spl_autoload_extensions('.php');
spl_autoload_register("my_autoload");
