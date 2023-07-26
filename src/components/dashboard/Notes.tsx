import { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

function Notes() {
  const [text, setText] = useState('Heading');
  const [editing, setEditing] = useState(false);
  const handleDoubleClick = (e: React.MouseEvent) => {
    console.log(e.detail);
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
  return (
    <div className='shadow-md w-2/3 rounded-lg p-2 min-w-[200px]'>
      <span className='flex justify-between items-center'>
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
      <div className=''>
        {editing ? (
          <input
            type='text'
            placeholder='Keep notes written in markdown.'
            onKeyDown={(e) => handleEnterPress(e)}
            defaultValue={text}
          />
        ) : (
          <div onClick={(e) => handleDoubleClick(e)}>
            <ReactMarkdown
              className='debug p-2'
              children={text}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
