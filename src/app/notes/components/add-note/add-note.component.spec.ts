import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { addOrUpdateNote } from '../../state/notes.actions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';

describe('AddNoteComponent', () => {

  let store: jasmine.SpyObj<Store>;
  let fixture: ComponentFixture<AddNoteComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    // Mock Store
    store = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        AddNoteComponent, // Import the standalone component
        NoopAnimationsModule
      ],
      providers: [
        { provide: Store, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should have the "Note-Taking App" header', () => {
    const headerElement = fixture.nativeElement.querySelector('h1');
    expect(headerElement.textContent).toContain('Note-Taking App');
  });

  it('should have the "Add Note" button', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    expect(await button.getText()).toContain('Add Note');
  });

  it('should call dispatch with addNote action when form is valid', async () => {
    const title = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Title' }));
    await (await title.getControl(MatInputHarness))?.setValue('Test Title');

    const description = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Description' }));
    await (await description.getControl(MatInputHarness))?.setValue('Test Description');

    // Trigger the form submit
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();

    // Check if dispatch was called with addNote action
    expect(store.dispatch).toHaveBeenCalledWith(addOrUpdateNote({
      note: { title: 'Test Title', description: 'Test Description' }
    }));
  });

  it('should not call dispatch when form is invalid', async () => {
    const title = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Title' }));
    (await title.getControl(MatInputHarness))?.setValue('');


    const description = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'Description' }));
    (await description.getControl(MatInputHarness))?.setValue('');

    // Trigger the form submit
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();

    // Check if dispatch was not called
    expect(store.dispatch).not.toHaveBeenCalled();

    expect(await title.isControlValid()).toBeFalse();
    expect(await description.isControlValid()).toBeFalse();
  });

});
