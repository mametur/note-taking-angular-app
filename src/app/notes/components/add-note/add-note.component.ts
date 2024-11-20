import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNote } from '../../state/notes.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../state/note.model';
import { selectNotes } from '../../state/notes.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  noteForm: FormGroup;
  notes$: Observable<Note[]>;
  constructor(private fb: FormBuilder, private store: Store) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    // Get the current notes from the store
    this.notes$ = this.store.select(selectNotes);
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const note: Note = this.noteForm.value;
      this.store.dispatch(addNote({ note }));
      this.noteForm.reset();
      alert('Note added successfully!');
    }
  }
}