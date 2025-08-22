import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdfUploadService } from '../pdf-upload-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private pdfUploadService: PdfUploadService,
  ) {}

  navigateToAddEdit() {
    this.router.navigate(['reports', 'add-edit-report']);
  }

  navigateToReports() {
    this.router.navigate(['reports']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.pdfUploadService.uploadPDF(file).subscribe((data) => {
        console.log(data);
        this.pdfUploadService.pdfData = data;
      });
    }
  }
}
