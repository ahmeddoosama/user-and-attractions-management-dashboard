import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@core/services/app-services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StorageService } from '@core/services/app-services/storage/storage.service';
import { IAuthModel, IAuthResponse } from '@core/interfaces/auth/auth.interface';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotificationService } from '@core/services/app-services/notification/notification.service';

const MODULES = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  form!: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.form = this.initForm();
  }

  /**
   * Initializes the login form with username and password controls
   * @returns FormGroup with validation rules for username and password
   */
  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  /**
   * Handles form submission. If form is valid, proceeds with login attempt.
   * Otherwise, marks all form fields as touched to trigger validation messages
   */
  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const model: IAuthModel = this.form.value;
      this.login(model);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  /**
   * Attempts to authenticate user with provided credentials
   * @param model - The authentication model containing username and password
   */
  private login(model: IAuthModel): void {
    this.authService.signIn(model).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (res: IAuthResponse) => {
        if(res) {
          this.storageService.setToken(res.accessToken);
          this.storageService.setAdmin(res.user);
          this.router.navigate(['/dashboard']);
          this.notification.success(`Welcome Back ${res.user.fname} ${res.user.lname} !`);
        }
      },
      error: (error) => {
        const errorMessage = error?.error?.message;
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
   * Copies demo username to clipboard and sets it in the form
   */
  copyUsername() {
    navigator.clipboard.writeText('karn.yong@melivecode.com');
    this.form.controls['username'].setValue('karn.yong@melivecode.com');
  }

  /**
   * Copies demo password to clipboard and sets it in the form
   */
  copyPassword() {
    navigator.clipboard.writeText('melivecode');
    this.form.controls['password'].setValue('melivecode');
  }

  /**
   * Getter for username form control
   * @returns FormControl for username field
   */
  get username() {
    return this.form.get('username');
  }

  /**
   * Getter for password form control
   * @returns FormControl for password field
   */
  get password() {
    return this.form.get('password');
  }
}
