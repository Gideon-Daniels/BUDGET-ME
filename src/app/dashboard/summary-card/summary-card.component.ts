import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
  standalone: true,
})
export class SummaryCardComponent {
  @Input() amount!: string;
  @Input() title!: string;
}
