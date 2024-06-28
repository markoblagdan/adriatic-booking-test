<?php

set_include_path(get_include_path() . PATH_SEPARATOR . '../src/');

spl_autoload_extensions('.php');
spl_autoload_register();
