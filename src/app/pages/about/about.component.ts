import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'DivJiPoly was established with a vision to provide high-quality plastic granules to the manufacturing industry.'
    },
    {
      year: '2013',
      title: 'Expansion of Production',
      description: 'Increased our production capacity and introduced new product lines to meet growing market demands.'
    },
    {
      year: '2016',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2015 certification, demonstrating our commitment to quality management systems.'
    },
    {
      year: '2019',
      title: 'Sustainable Initiative',
      description: 'Launched our recycled granules line and implemented eco-friendly manufacturing processes.'
    },
    {
      year: '2022',
      title: 'Technology Upgrade',
      description: 'Invested in state-of-the-art machinery and automated quality control systems.'
    }
  ];

  values = [
    {
      title: 'Quality Excellence',
      description: 'Maintaining the highest standards in every granule we produce.',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    },
    {
      title: 'Innovation',
      description: 'Continuously evolving and adopting new technologies.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Sustainability',
      description: 'Committed to environmentally responsible practices.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Customer Focus',
      description: 'Dedicated to meeting and exceeding client expectations.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    }
  ];
}
