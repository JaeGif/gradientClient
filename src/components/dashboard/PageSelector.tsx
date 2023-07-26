import React, { ReactNode, useEffect, useState } from 'react';
import PageCounter from './PageCounter';

type PageSelectorProps = {
  children?: ReactNode;
  nextPageFn: Function;
  previousPageFn: Function;
  firstPageFn: Function;
  lastPageFn: Function;
  pageChangeFn: Function;
  page: number;
  totalPages: number;
};
function PageSelector({
  children,
  firstPageFn,
  lastPageFn,
  nextPageFn,
  previousPageFn,
  pageChangeFn,
  page,
  totalPages,
}: PageSelectorProps) {
  return (
    <div className='flex justify-center items-center gap-2'>
      <span className='w-full flex justify-between items-center'>
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => firstPageFn()}
          src='/favicons/first_chevron.svg'
        />
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => previousPageFn()}
          src='/favicons/left_chevron.svg'
        />
      </span>
      <PageCounter
        page={page}
        totalPages={totalPages}
        pageChangeFn={pageChangeFn}
      />
      <span className='w-full flex justify-between items-center'>
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => nextPageFn()}
          src='/favicons/right_chevron.svg'
        />
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => lastPageFn()}
          src='/favicons/last_chevron.svg'
        />
      </span>
    </div>
  );
}

export default PageSelector;
