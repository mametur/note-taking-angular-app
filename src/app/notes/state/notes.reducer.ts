import { createReducer, on } from '@ngrx/store';
import { NotesState } from '../interface/note';
import { addNote } from './notes.actions';



export const initialState: NotesState = {
  notes: [],
};

export const notesReducer = createReducer(
  initialState,
  on(addNote, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note],
  })),
);