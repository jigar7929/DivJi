import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuoteModalService } from '../../services/quote-modal.service';
import { ProductService, PlasticGranule } from '../../services/product.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-quote-modal',
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class QuoteModalComponent implements OnInit, OnDestroy {
  showModal = false;
  quoteForm: FormGroup;
  products: PlasticGranule[] = [];
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private quoteModalService: QuoteModalService,
    private productService: ProductService,
    private emailService: EmailService,
    private fb: FormBuilder
  ) {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      selectedProducts: this.fb.array([]),
      otherProduct: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.quoteModalService.open$.subscribe(() => {
      this.openModal();
    });

    this.productService.getPlasticGranules().subscribe({
      next: (data) => {
        this.products = data.plasticGranules;
        // Initialize product checkboxes
        this.products.forEach(() => {
          (this.quoteForm.get('selectedProducts') as FormArray).push(
            this.fb.control(false)
          );
        });
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.quoteForm.reset();
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.errorMessage = '';
  }

  validateProducts(): boolean {
    const selectedProducts = this.quoteForm.value.selectedProducts;
    const hasSelectedProduct = selectedProducts.some((selected: boolean) => selected);
    const hasOtherProduct = !!this.quoteForm.value.otherProduct;
    return hasSelectedProduct || hasOtherProduct;
  }

  onSubmit() {
    if (this.quoteForm.valid && this.validateProducts()) {
      this.isSubmitting = true;

      // Get selected products
      const selectedProducts = this.quoteForm.value.selectedProducts
        .map((checked: boolean, i: number) => checked ? this.products[i].type : null)
        .filter((v: string | null) => v !== null);

      if (this.quoteForm.value.otherProduct) {
        selectedProducts.push(this.quoteForm.value.otherProduct);
      }

      const emailData = {
        name: this.quoteForm.value.name,
        email: this.quoteForm.value.email,
        phone: this.quoteForm.value.phone,
        products: selectedProducts.join(', '),
        message: this.quoteForm.value.message,
        subject: 'New Quote Request'
      };

      this.emailService.sendEmail(emailData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.closeModal();
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.closeModal();
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error sending email:', error);
          this.showErrorMessage = true;
          this.errorMessage = 'Failed to send quote request. Please try again later.';
        }
      });
    }
  }

  get selectedProducts() {
    return this.quoteForm.get('selectedProducts') as FormArray;
  }
}
