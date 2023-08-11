import { ReactNode } from 'react';
import PageCounter from './PageCounter';
import { useTheme } from '../../../utils/ThemeProvider';

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
  const theme = useTheme().theme;
  return (
    <div className='flex justify-center items-center gap-2'>
      <span className='w-full flex justify-between items-center'>
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => firstPageFn()}
          src={
            theme === 'dark'
              ? '/favicons/first_chevron-white.svg'
              : '/favicons/first_chevron.svg'
          }
        />
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => previousPageFn()}
          src={
            theme === 'dark'
              ? '/favicons/left_chevron-white.svg'
              : '/favicons/left_chevron.svg'
          }
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
          src={
            theme === 'dark'
              ? '/favicons/right_chevron-white.svg'
              : '/favicons/right_chevron.svg'
          }
        />
        <img
          className='h-6 hover:cursor-pointer'
          onClick={() => lastPageFn()}
          src={
            theme === 'dark'
              ? '/favicons/last_chevron-white.svg'
              : '/favicons/last_chevron.svg'
          }
        />
      </span>
    </div>
  );
}

export default PageSelector;
