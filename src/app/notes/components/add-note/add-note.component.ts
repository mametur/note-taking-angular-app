import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addOrUpdateNote } from '../../state/notes.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../interface/note';
import { selectNotes } from '../../state/notes.selectors';
import { Observable, take } from 'rxjs';


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

  constructor(private fb: FormBuilder, private store: Store) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.noteForm.valid) return;

    const note: Note = this.noteForm.value;

    this.store.dispatch(addOrUpdateNote({ note }));
    this.noteForm.reset();
  }
}