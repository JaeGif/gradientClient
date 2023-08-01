const apiURL = import.meta.env.VITE_LOCAL_API_URL;
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { Note } from '../types/Interfaces';
function useNotes(userId?: string) {
  const queryClient = useQueryClient();

  const getNotes = async (): Promise<any> => {
    const res = await fetch(`${apiURL}api/notes?user=${userId}`, {
      mode: 'cors',
    });
    const data = await res.json();
    return data.userNotes;
  };

  const getNotesQuery = useQuery<any>({
    queryKey: ['notes', { id: userId }],
    queryFn: getNotes,
    initialData: () => {
      queryClient
        .getQueryData<Note[]>(['note'])
        ?.find((el: any) => el.id === userId);
    },
  });

  const postNotesMutation = useMutation({
    mutationFn: async (note: { userId: string; text: string }) => {
      const res = await fetch(`${apiURL}api/notes`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const data = await res.json();
      return data.note;
    },
  });
  return { getNotesQuery, postNotesMutation };
}
export default useNotes;
