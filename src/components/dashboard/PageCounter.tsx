import React, { useContext, useEffect, useState } from 'react';
import { PageChangeContext } from './PageSelector';

type PageCounterProps = {
  twClasses?: string;
};
function PageCounter({ twClasses }: PageCounterProps) {
  const { pageInfo, pageChangeFn } = useContext(PageChangeContext)!;
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <span
      className={`flex justify-center items-center text-center ${twClasses}`}
    >
      <input
        className='w-4'
        type='number'
        max={10}
        min={1}
        onChange={(e) => pageChangeFn(e)}
        defaultValue={pageInfo.page}
        onKeyDown={(e) => {
          if (e.key === 'Enter') toggleEdit();
        }}
      />
      {' / '} <p>{pageInfo.totalPages}</p>
    </span>
  );
}

export default PageCounter;
