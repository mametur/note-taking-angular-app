import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../../interface/note';
import { selectNotes } from '../../state/notes.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
  imports: [MatCardModule, CommonModule],
})
export class ListNotesComponent {
  notes$: Observable<Note[]>;
  currentNotes: Note[] = [];

  constructor(private store: Store) {
    this.notes$ = this.store.select(selectNotes);
    this.notes$.subscribe((notes) => this.currentNotes = notes);
  }
}
