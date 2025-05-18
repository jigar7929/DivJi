import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  categories = [
    'All Products',
    'HDPE Granules',
    'LDPE Granules',
    'Recycled Granules',
    'Custom Solutions'
  ];

  selectedCategory = 'All Products';

  products = [
    {
      id: 1,
      name: 'HDPE Natural Granules',
      category: 'HDPE Granules',
      description: 'High-density polyethylene granules ideal for blow molding and injection molding applications.',
      features: [
        'Excellent impact strength',
        'High tensile strength',
        'Good chemical resistance',
        'FDA approved'
      ],
      applications: [
        'Bottles and containers',
        'Industrial packaging',
        'Pipes and fittings',
        'Storage tanks'
      ],
      specifications: {
        'Density': '0.941-0.965 g/cm³',
        'Melt Flow Rate': '0.2-20 g/10min',
        'Tensile Strength': '20-40 MPa',
        'Shore Hardness': '60-70D'
      }
    },
    {
      id: 2,
      name: 'LDPE Clear Granules',
      category: 'LDPE Granules',
      description: 'Low-density polyethylene granules perfect for film and flexible packaging applications.',
      features: [
        'High clarity',
        'Good flexibility',
        'Excellent processability',
        'Food grade available'
      ],
      applications: [
        'Film packaging',
        'Agricultural films',
        'Shrink wrap',
        'Flexible containers'
      ],
      specifications: {
        'Density': '0.910-0.925 g/cm³',
        'Melt Flow Rate': '1-20 g/10min',
        'Tensile Strength': '8-20 MPa',
        'Shore Hardness': '40-50D'
      }
    },
    {
      id: 3,
      name: 'Recycled HDPE Granules',
      category: 'Recycled Granules',
      description: 'High-quality recycled HDPE granules for sustainable manufacturing solutions.',
      features: [
        'Eco-friendly',
        'Cost-effective',
        'Consistent quality',
        'Multiple colors available'
      ],
      applications: [
        'Non-food packaging',
        'Industrial products',
        'Construction materials',
        'Automotive parts'
      ],
      specifications: {
        'Density': '0.940-0.960 g/cm³',
        'Melt Flow Rate': '0.5-15 g/10min',
        'Tensile Strength': '15-35 MPa',
        'Shore Hardness': '55-65D'
      }
    },
    {
      id: 4,
      name: 'Custom Color Masterbatch',
      category: 'Custom Solutions',
      description: 'Customized color masterbatch solutions for specific application requirements.',
      features: [
        'Custom color matching',
        'Consistent color delivery',
        'UV stabilized options',
        'High dispersion'
      ],
      applications: [
        'Brand-specific packaging',
        'Consumer products',
        'Specialty items',
        'Designer products'
      ],
      specifications: {
        'Carrier': 'PE/PP/PS',
        'Pigment Loading': '15-60%',
        'Heat Stability': 'Up to 300°C',
        'Light Fastness': '7-8 Blue Wool Scale'
      }
    }
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.selectedCategory === 'All Products'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }
}
