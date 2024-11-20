import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNote, updateNote } from '../../state/notes.actions';
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
  
      this.notes$.pipe(take(1)).subscribe(notes => {
        const existingNote = notes.find((n: Note) => n.title.toLocaleLowerCase() === note.title.toLocaleLowerCase());
  
        if (!existingNote) {
          this.store.dispatch(addNote({ note }));
          alert('Note added successfully!');
        } else {
          this.store.dispatch(updateNote({ note }));
          alert('Note has been updated successfully!');
        }
        this.noteForm.reset(); 
      });
    }
  }
}