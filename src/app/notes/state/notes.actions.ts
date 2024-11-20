import { createAction, props } from '@ngrx/store';
import { Note } from './note.model';

export const addNote = createAction(
  '[Note Form] Add Note',
  props<{ note: Note }>() //payload
);