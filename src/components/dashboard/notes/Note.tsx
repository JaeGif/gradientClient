import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import useNotes from '../../../hooks/useNotes';
import rehypeRaw from 'rehype-raw';
type NoteProps = {
  note: {
    userId: string;
    text: string | undefined;
  };
};
function Note({ note }: NoteProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(note?.text);
  const postNotesMutation = useNotes().postNotesMutation;

  useEffect(() => {
    if (!text) setEditing(true);
  }, [text]);
  useEffect(() => {
    if (note && note.text) {
      setText(note.text);
    }
  }, [note]);
  const handleEnterPress = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setText(e.target.value);
      setEditing(false);
      submitNewNote(e.target.value);
    }
  };
  const submitNewNote = (text: string) => {
    postNotesMutation.mutate({ userId: note.userId, text: text });
  };
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
  return (
    <>
      {editing ? (
        <input
          type='text'
          className='w-full p-2'
          placeholder='Keep notes written in markdown...'
          onKeyDown={(e) => handleEnterPress(e)}
          defaultValue={text}
        />
      ) : (
        <div onClick={(e) => handleDoubleClick(e)}>
          <ReactMarkdown
            className='p-2 w-full'
            children={text ? text : ''}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </div>
      )}
    </>
  );
}

export default Note;
