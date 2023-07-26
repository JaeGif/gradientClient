import { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import useNotes from '../../hooks/useNotes';
import { useAuth } from '../../utils/AuthProvider';
import PageSelector from './PageSelector';
import PageCounter from './PageCounter';

function Notes() {
  const userId = useAuth()!.user!.id;
  const notesQuery = useNotes(userId);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    totalPages: number;
  }>();
  useEffect(() => {
    console.log(notesQuery.getNotesQuery.data);
    if (notesQuery.getNotesQuery.data && notesQuery.getNotesQuery.isFetched) {
      setPageInfo({
        page: 1,
        totalPages: notesQuery.getNotesQuery.data.length || 1,
      });
    }
  }, [notesQuery.getNotesQuery.isFetched]);
  const handleDoubleClick = (e: React.MouseEvent) => {
    switch (e.detail) {
      case 1: {
        break;
      }
      case 2: {
        setEditing(true);
        break;
      }
      default: {
        break;
      }
    }
  };
  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      setText(e.target.value);
      setEditing(false);
    }
  };
  const handleNewNotePage = () => {
    setText('');
    setEditing(true);
  };
  const nextPageFn = () => {};
  const previousPageFn = () => {};
  const firstPageFn = () => {};
  const lastPageFn = () => {};
  const pageChangeFn = () => {};
  return (
    <div className='relative shadow-md w-2/3 rounded-lg p-2 min-w-[200px]'>
      <span className='flex justify-between items-center'>
        <span className='flex justify-center gap-2 items-center'>
          <h2>Notes</h2>
          <a
            href='https://www.markdownguide.org/basic-syntax/'
            rel='norefferer'
            target='_blank'
          >
            <img
              title='Markdown Guide'
              className='hover: cursor-pointer h-6'
              src='/favicons/info.svg'
              alt='markdown syntax link'
              aria-label='markdown syntax link'
            />
          </a>
        </span>
        <img
          onClick={handleNewNotePage}
          className='hover:cursor-pointer h-8'
          src='/favicons/new.svg'
          alt='start new note'
          title='New Note'
          aria-label='start new note'
        />
      </span>
      <div className=''>
        {editing ? (
          <input
            type='text'
            className='w-full outline-none p-2'
            placeholder='Keep notes written in markdown.'
            onKeyDown={(e) => handleEnterPress(e)}
            defaultValue={text}
          />
        ) : (
          <div onClick={(e) => handleDoubleClick(e)}>
            <ReactMarkdown
              className='debug p-2 w-full'
              children={text}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
      </div>
      <span className='absolute bottom-0 left-0 p-2 w-full justify-center items-center'>
        {pageInfo && (
          <PageSelector
            pageInfo={pageInfo}
            pageChangeFn={pageChangeFn}
            nextPageFn={nextPageFn}
            previousPageFn={previousPageFn}
            lastPageFn={lastPageFn}
            firstPageFn={firstPageFn}
            children={<PageCounter />}
          ></PageSelector>
        )}
      </span>
    </div>
  );
}

export default Notes;
