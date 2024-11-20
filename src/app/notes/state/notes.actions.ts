import { createAction, props } from '@ngrx/store';
import { Note } from '../interface/note';

export const addNote = createAction(
  '[Note Form] Add Note',
  props<{ note: Note }>() //payload
);