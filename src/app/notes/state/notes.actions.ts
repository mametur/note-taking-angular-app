import { createAction, props } from '@ngrx/store';
import { Note } from '../interface/note';

export const addOrUpdateNote = createAction(
  '[Note Form] Add/Update Note',
  props<{ note: Note }>()
);
