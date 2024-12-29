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
import { IUser } from '@core/interfaces/auth.interface';
import { UsersService } from '@core/services/app-services/users/users.service';

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
  user?: IUser;
}

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MODULES],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnDestroy {

  form!: FormGroup;
  isLoading: boolean = false;
  type: 'edit' | 'create' = 'create';
  user: IUser | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: DialogData
  ) {
    this.type = data?.type || 'create';
    this.user = data?.user;
    this.form = this.initForm(this.user);
  }

  /**
   * Initializes the create/edit user form
   * @returns FormGroup with validation rules
   */
  initForm(data?: IUser): FormGroup {
    return this.fb.group({
      fname: [data?.fname ?? '', [Validators.required, Validators.minLength(2)]],
      lname: [data?.lname ?? '', [Validators.required, Validators.minLength(2)]],
      username: [data?.username ?? '', [Validators.required, Validators.minLength(3)]],
      email: [data?.email ?? '', [Validators.required, Validators.email]]
    });
  }

  /**
   * Handles form submission. If form is valid, proceeds with login attempt.
   * Otherwise, marks all form fields as touched to trigger validation messages
   */
  onSubmit(): void {
    if (this.form.valid) {
      const model: IUser = this.form.value;
      if(this.type === 'create') {
        model['avatar'] = 'https://www.melivecode.com/users/cat.png';
        this.createUser(model);
      } else {
        model['id'] = this.user?.id!;
        this.updateUser(model);
      }
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  /**
   * Creates a new user
   * @param user - The user to create
   */
  createUser(user: IUser): void {
    this.isLoading = true;
    this.usersService.createUser(user).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notification.success('User created successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
        this.notification.error(errorMessage);
      }
    });
  }

  /**
   * Updates an existing user
   * @param user - The user to update
   */
  updateUser(user: IUser): void {
    this.isLoading = true;
    this.usersService.updateUser(user).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: () => {
        this.notification.success('User updated successfully');
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        const errorMessage = error?.error?.message || 'Failed to update user';
        this.notification.error(errorMessage);
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
