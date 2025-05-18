import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    EmailService,
    { provide: HttpClient, useClass: HttpClient }
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  // Phone number regex pattern for Indian numbers (with or without +91)
  private phonePattern = /^(\+91[\-\s]?)?[6789]\d{9}$/;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(this.phonePattern),
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter methods for form controls
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get phone() { return this.contactForm.get('phone'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  // Error message getters
  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['pattern'] && field === 'phone') return 'Please enter a valid Indian phone number';
    if ((errors['minlength'] || errors['maxlength']) && field === 'phone') {
      return 'Phone number must be 10 digits (or 13 with +91)';
    }
    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters`;
    }
    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${maxLength} characters`;
    }
    return '';
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    try {
      await this.emailService.sendEmail(this.contactForm.value).toPromise();
      this.submitSuccess = true;
      this.contactForm.reset();
      // Reset touched state after successful submission
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.setErrors(null);
        control?.markAsUntouched();
      });
    } catch (error) {
      this.submitError = 'Failed to send message. Please try again later.';
      console.error('Email send error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
