<?php

namespace Repositories;

abstract class BaseRepository {
    protected $entityArray;

    function getAll() {
        return $this->entityArray;
    }

    function get($entityId) {
        $ids = array_column($this->entityArray, 'id');
        $index = array_search($entityId, $ids);

        if ($index !== false) {
            return $this->entityArray[$index];
        }

        return false;
    }
}