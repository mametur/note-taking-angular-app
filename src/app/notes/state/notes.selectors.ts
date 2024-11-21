import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from '../interface/note';

const selectNotesState = createFeatureSelector<NotesState>('notes');

export const selectNotes = createSelector(
  selectNotesState,
  (state: NotesState) => state.notes
);