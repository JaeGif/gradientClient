import React, { useContext, useState } from 'react';
import { CacheContext } from '../App';
function useCustomMemo() {
  const { state, handleSetCache } = useContext(CacheContext);
  // key needs to be a custom signature, and value needs to be the result
  function addToCache(key: string, data?: any, deleteFlag: boolean = false) {
    let cacheInt;
    if (typeof state !== 'undefined') {
      cacheInt = state;
    } else {
      cacheInt = {};
    }

    if (deleteFlag && !data && state) {
      delete state[key];
      handleSetCache(state);
    }
    if (data && !deleteFlag) {
      cacheInt[key] = data;
      handleSetCache(cacheInt);
    }
    const currentFlag = cacheInt['updateFlag'];
    cacheInt['updateFlag'] = !currentFlag;
    handleSetCache(cacheInt);
  }
  return [state, addToCache];
}

export default useCustomMemo;
