import { TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { StoreModule } from '@ngrx/store';

// Mock reducer if needed or provide a dummy one
const dummyReducer = (state = { notes: [] }, action: any) => state;

describe('AddNoteComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddNoteComponent, // Import the standalone component
        StoreModule.forRoot({ notes: dummyReducer }), // Provide the Store module with a dummy reducer
      ],
    }).compileComponents();
  });

  it('should create the AddNoteComponent', () => {
    const fixture = TestBed.createComponent(AddNoteComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Note-Taking App' header`, () => {
    const fixture = TestBed.createComponent(AddNoteComponent);
    const headerElement = fixture.nativeElement.querySelector('h1');
    expect(headerElement.textContent).toContain('Note-Taking App');
  });
  it(`should have the 'Add Note' button`, () => {
    const fixture = TestBed.createComponent(AddNoteComponent);
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Add Note');
  });
  
});
