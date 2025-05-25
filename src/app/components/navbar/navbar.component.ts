import { Component, NO_ERRORS_SCHEMA, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { QuoteModalService } from '../../services/quote-modal.service';
import { ProductService, PlasticGranule } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isProductsDropdownOpen = false;
  products: PlasticGranule[] = [];

  menuItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/products', label: 'Products', exact: false, hasDropdown: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private quoteModalService: QuoteModalService,
    private productService: ProductService
  ) {
    // Subscribe to router events to scroll to top on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.isProductsDropdownOpen = false;
    });
  }

  ngOnInit() {
    this.productService.getPlasticGranules().subscribe({
      next: (data) => {
        this.products = data.plasticGranules;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close dropdown when clicking outside
    const dropdownElement = (event.target as HTMLElement).closest('.products-dropdown');
    if (!dropdownElement) {
      this.isProductsDropdownOpen = false;
    }
  }

  toggleProductsDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu and scroll to top when navigating
  onNavigate() {
    this.isMobileMenuOpen = false;
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  openQuoteModal() {
    this.quoteModalService.open();
  }
}
