import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteModalComponent } from './components/quote-modal/quote-modal.component';
import { QuoteModalService } from './services/quote-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    QuoteModalComponent
  ]
})
export class AppComponent {
  title = 'plastic-granule';

  constructor(private quoteModalService: QuoteModalService) {}

  openQuoteModal() {
    this.quoteModalService.open();
  }
}
