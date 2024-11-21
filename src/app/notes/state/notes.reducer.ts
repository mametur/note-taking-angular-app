import { createReducer, on } from '@ngrx/store';
import { NotesState } from '../interface/note';
import { addOrUpdateNote } from './notes.actions';

export const initialState: NotesState = {
  notes: [],
};

export const notesReducer = createReducer(
  initialState,
  on(addOrUpdateNote, (state, { note }) => {
    const notes = [...state.notes];
    const existingNoteIndex = state.notes.findIndex(
      (n) => n.title.toLowerCase() === note.title.toLowerCase()
    );

    if (existingNoteIndex > -1) {
      notes[existingNoteIndex] = note;
      alert('Note has been updated successfully!');
    } else {
      notes.push(note);
      alert('Note added successfully!');
    }

    return {
      ...state,
      notes,
    };
  })
);
