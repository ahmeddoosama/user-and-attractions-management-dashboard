import { Component, Inject, Optional, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { finalize } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '@core/services/app-services/notification/notification.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IAttraction } from '@core/interfaces/attraction.interface';
import { AttractionsService } from '@core/services/app-services/attractions/attractions.service';
import { Utilities } from '@shared/utilities/utilities.class';

const MODULES = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule
]

interface DialogData {
  type: 'edit' | 'create';
  attraction?: IAttraction;
}

@Component({
  selector: 'app-create-edit-attraction',
  standalone: true,
  imports: [MODULES],
  templateUrl: './create-edit-attraction.component.html',
  styleUrl: './create-edit-attraction.component.scss'
})
export class CreateEditAttractionComponent implements OnDestroy {

  form!: FormGroup;
  isLoading: boolean = false;
  type: 'edit' | 'create' = 'create';
  attraction: IAttraction | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private attractionsService: AttractionsService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<CreateEditAttractionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: DialogData
  ) {
    this.type = data?.type || 'create';
    this.attraction = data?.attraction;
    this.form = this.initForm(this.attraction);
  }

  initForm(data?: IAttraction): FormGroup {
    return this.fb.group({
      name: [data?.name ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      detail: [data?.detail ?? '', [Validators.required, Validators.minLength(2)]],
      latitude: [data?.latitude ?? '', [
        Validators.required
      ]],
      longitude: [data?.longitude ?? '', [
        Validators.required
      ]]
    });
  }

  _keyPress(event: KeyboardEvent): boolean {
    return new Utilities().validateNumericInput(event);
  }

  /**
   * Handles form submission. If form is valid, proceeds with login attempt.
   * Otherwise, marks all form fields as touched to trigger validation messages
   */
  onSubmit(): void {
    if (this.form.valid) {
      const model: IAttraction = this.form.value;
      if(this.type === 'create') {
        model['coverimage'] = 'https://www.melivecode.com/attractions/12.jpg';
        this.createAttraction(model);
      } else {
        model['id'] = this.attraction?.id!;
        this.updateAttraction(model);
      }
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  /**
   * Creates a new attraction
   * @param attraction - The attraction to create
   */
  createAttraction(attraction: IAttraction): void {
    this.isLoading = true;
    this.attractionsService.createAttraction(attraction).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notification.success('Attraction created successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }

  /**
   * Updates an existing attraction
   * @param attraction - The attraction to update
   */
  updateAttraction(attraction: IAttraction): void {
    this.isLoading = true;
    this.attractionsService.updateAttraction(attraction).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notification.success('Attraction updated successfully');
        this.dialogRef.close(true);
      }
    });
  }

   /**
   * Recursively marks all controls in a form group as touched
   * @param formGroup - The form group whose controls need to be marked as touched
   */
   private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Closes the dialog without saving changes
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Unsubscribes from all subscriptions when the component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
