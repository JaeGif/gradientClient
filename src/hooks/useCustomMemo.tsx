import React, { useContext, useState } from 'react';
import { CacheContext } from '../App';
function useCustomMemo() {
  const { state, handleSetCache } = useContext(CacheContext);
  // key needs to be a custom signature, and value needs to be the result
  function addToCache(key: string, data?: any, deleteFlag: boolean = false) {
    if (deleteFlag && !data && state) {
      delete state[key];
      handleSetCache(state);
    }
    if (data && !deleteFlag) {
      let cacheInt;
      if (typeof state !== 'undefined') {
        cacheInt = state;
      } else {
        cacheInt = {};
      }
      cacheInt[key] = data;
      handleSetCache(cacheInt);
    }
  }
  return [state, addToCache];
}

export default useCustomMemo;
