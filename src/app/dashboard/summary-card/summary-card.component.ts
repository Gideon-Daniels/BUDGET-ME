import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { NgIf, UpperCasePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-summary-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatProgressSpinner,
    NgIf,
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
  standalone: true,
})
export class SummaryCardComponent {
  @Input() amount!: string;
  @Input() title!: string;
}
