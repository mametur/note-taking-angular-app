import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from './note.model';

export const selectNotesState = createFeatureSelector<NotesState>('notes');

export const selectNotes = createSelector(
  selectNotesState,
  (state: NotesState) => state.notes
);