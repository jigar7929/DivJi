import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, PlasticGranule } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductsComponent implements OnInit {
  plasticGranules: PlasticGranule[] = [];
  selectedGranule: PlasticGranule | null = null;
  searchTerm: string = '';
  selectedType: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadPlasticGranules();
  }

  loadPlasticGranules() {
    this.isLoading = true;
    this.error = null;
    
    this.productService.getPlasticGranules().subscribe({
      next: (data) => {
        this.plasticGranules = data.plasticGranules;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading plastic granules:', error);
        this.error = 'Failed to load products. Please try again.';
        this.isLoading = false;
      }
    });
  }

  retryLoading() {
    this.loadPlasticGranules();
  }

  selectGranule(granule: PlasticGranule) {
    this.selectedGranule = granule;
  }

  clearSelection() {
    this.selectedGranule = null;
  }

  get filteredGranules(): PlasticGranule[] {
    return this.plasticGranules.filter(granule => {
      const matchesSearch = this.searchTerm === '' || 
        granule.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        granule.fullForm.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = this.selectedType === '' || granule.type === this.selectedType;
      
      return matchesSearch && matchesType;
    });
  }

  get uniqueTypes(): string[] {
    return [...new Set(this.plasticGranules.map(granule => granule.type))];
  }
}
