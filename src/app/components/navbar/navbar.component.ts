import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  menuItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/products', label: 'Products', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Subscribe to router events to scroll to top on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu and scroll to top when navigating
  onNavigate() {
    this.isMobileMenuOpen = false;
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
