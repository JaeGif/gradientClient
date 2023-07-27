import React, { useContext, useEffect, useState } from 'react';

type PageCounterProps = {
  page: number;
  totalPages: number;
  pageChangeFn: Function;
  twClasses?: string;
};
function PageCounter({
  page,
  totalPages,
  pageChangeFn,
  twClasses,
}: PageCounterProps) {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <span
      className={`flex justify-center items-center text-center ${twClasses}`}
    >
      {edit ? (
        <input
          className='w-4'
          type='number'
          max={10}
          min={1}
          onBlur={toggleEdit}
          autoFocus={true}
          onChange={(e) => pageChangeFn(e)}
          defaultValue={page}
          onKeyDown={(e) => {
            if (e.key === 'Enter') toggleEdit();
          }}
        />
      ) : (
        <p onClick={toggleEdit}>{page}</p>
      )}
      {' / '} <p>{totalPages}</p>
    </span>
  );
}

export default PageCounter;
