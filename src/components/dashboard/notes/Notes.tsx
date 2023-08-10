import { useState, useEffect, useContext } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import useNotes from '../../../hooks/useNotes';
import { useAuth } from '../../../utils/AuthProvider';
import PageSelector from './PageSelector';
import PageCounter from './PageCounter';
import Note from './Note';
import uniqid from 'uniqid';
import { ThemeContext } from '../../../App';
function Notes() {
  const userId = useAuth()!.user!.id;
  const notesQuery = useNotes(userId);
  const theme = useContext(ThemeContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [newNote, setNewNote] = useState(false);

  useEffect(() => {
    if (notesQuery.getNotesQuery.data && notesQuery.getNotesQuery.isFetched) {
      setTotalPages(notesQuery.getNotesQuery.data.length || 1);
    }
  }, [notesQuery.getNotesQuery.isFetched]);

  const handleNewNotePage = () => {
    if (!totalPages) return;
    if (totalPages === 10) return;
    setNewNote(true);
    setTotalPages((prev) => prev + 1);
    setPage(totalPages);
  };
  const nextPageFn = () => {
    if (page === totalPages) return;
    setPage((prev) => prev + 1);
  };
  const previousPageFn = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };
  const firstPageFn = () => {
    setPage(1);
  };
  const lastPageFn = () => {
    if (!totalPages) return;
    setPage(totalPages);
  };
  const pageChangeFn = (e: any) => {
    if (!totalPages) return;
    if (e.target.value < 1 || e.target.value > totalPages) return;
    setPage(e.target.value);
  };
  return (
    <div className='dark:bg-[rgb(35,35,35)] relative shadow-md w-full sm:w-2/3 rounded-lg p-2 min-w-[200px] h-96'>
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
              src={
                theme === 'dark'
                  ? '/favicons/info-white.svg'
                  : '/favicons/info.svg'
              }
              alt='markdown syntax link'
              aria-label='markdown syntax link'
            />
          </a>
        </span>
        <img
          onClick={handleNewNotePage}
          className='hover:cursor-pointer h-8'
          src={
            theme === 'dark' ? '/favicons/new-white.svg' : '/favicons/new.svg'
          }
          alt='start new note'
          title='New Note'
          aria-label='start new note'
        />
      </span>
      <div className='p-2'>
        {notesQuery.getNotesQuery.data &&
        notesQuery.getNotesQuery.data.length &&
        page &&
        !newNote ? (
          <Note key={uniqid()} note={notesQuery.getNotesQuery.data[page - 1]} />
        ) : (
          <Note key={uniqid()} note={{ userId: userId, text: undefined }} />
        )}
      </div>
      <span className='absolute bottom-0 left-0 p-2 w-full justify-center items-center'>
        {totalPages && (
          <PageSelector
            page={page}
            totalPages={totalPages}
            pageChangeFn={pageChangeFn}
            nextPageFn={nextPageFn}
            previousPageFn={previousPageFn}
            lastPageFn={lastPageFn}
            firstPageFn={firstPageFn}
          ></PageSelector>
        )}
      </span>
    </div>
  );
}

export default Notes;
