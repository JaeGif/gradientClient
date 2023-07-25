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
    <div className='shadow-md w-1/4 rounded-lg p-2 min-w-[200px]'>
      <h2>Notes</h2>
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
            <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
