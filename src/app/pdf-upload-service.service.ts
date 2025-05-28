import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PdfUploadService {
  data: any;

  constructor(private http: HttpClient) {}

  set pdfData(data: any) {
    this.data = data;
  }

  get pdfData() {
    console.log(this.data);

    return this.data;
  }

  uploadPDF(file: File) {
    const formData = new FormData();
    formData.append('pdfFile', file);

    return this.http.post('http://localhost:3000/upload', formData);
  }
}
