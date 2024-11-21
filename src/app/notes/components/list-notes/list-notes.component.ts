import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Note } from '../../interface/note';
import { selectNotes } from '../../state/notes.selectors';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-notes',
  standalone: true,
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss'],
  imports: [MatCardModule, CommonModule, AsyncPipe],
})
export class ListNotesComponent {
  notes$: Observable<Note[]>;

  constructor(private store: Store) {
    this.notes$ = this.store.select(selectNotes);
  }
}
