import React, { useState } from 'react';

type MemoStateObject = { [key: string]: any };

function useCustomMemo() {
  // key needs to be a custom signature, and value needs to be the result
  const [storage, setStorage] = useState<MemoStateObject>({});
  function addToCache(key: string, data?: any, deleteFlag: boolean = false) {
    if (deleteFlag && !data) {
      delete storage[key];
      setStorage(storage);
    }
    if (data && !deleteFlag) {
      let storageInt = storage;
      storageInt[key] = data;
      setStorage(storageInt);
    }
  }
  return [storage, addToCache];
}

export default useCustomMemo;
