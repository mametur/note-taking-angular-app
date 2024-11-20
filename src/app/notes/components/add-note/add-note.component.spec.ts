import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { addNote } from '../../state/notes.actions';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule


// Mock reducer if needed or provide a dummy one
const dummyReducer = (state = { notes: [] }, action: any) => state;

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    // Mock Store
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    store.select.and.returnValue(of([])); // Returning empty array for notes

    await TestBed.configureTestingModule({
      imports: [
        AddNoteComponent, // Import the standalone component
        StoreModule.forRoot({ notes: dummyReducer }), // Provide the Store module with a dummy reducer
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the AddNoteComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the "Note-Taking App" header', () => {
    const headerElement = fixture.nativeElement.querySelector('h1');
    expect(headerElement.textContent).toContain('Note-Taking App');
  });

  it('should have the "Add Note" button', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Add Note');
  });

  it('should call dispatch with addNote action when form is valid', () => {
    component.noteForm.controls['title'].setValue('Test Title');
    component.noteForm.controls['description'].setValue('Test Description');
    
    // Trigger the form submit
    component.onSubmit();

    // Check if dispatch was called with addNote action
    expect(store.dispatch).toHaveBeenCalledWith(addNote({
      note: { title: 'Test Title', description: 'Test Description' }
    }));
  });
  
  it('should not call dispatch when form is invalid', () => {
    component.noteForm.controls['title'].setValue('');
    component.noteForm.controls['description'].setValue('');

    // Trigger the form submit
    component.onSubmit();

    // Check if dispatch was not called
    expect(store.dispatch).not.toHaveBeenCalled();
  });

});
