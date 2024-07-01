<?php


set_include_path(__ROOT__."/src/");

function my_autoload($class){
    $file = __ROOT__.'/src/' . $class . '.php';
    print("Looking for file: ".$file."\n");
    if(file_exists($file)) {
       print("Found file: ".$file."\n");
       include $file;
    }
}

spl_autoload_extensions('.php');
spl_autoload_register("my_autoload");
