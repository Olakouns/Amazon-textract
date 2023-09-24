import {Component, OnInit} from '@angular/core';
import {ExtractService} from "../services/extract.service";

@Component({
  selector: 'app-load-card-page',
  templateUrl: './load-card-page.component.html',
  styleUrls: ['./load-card-page.component.scss']
})
export class LoadCardPageComponent implements OnInit {

  acceptType = 'image/*';
  loadFileText = "Attach file";
  base64String: string | null = "";
  isLoading = false;

  result : any

  constructor(public extractService: ExtractService) {
  }

  ngOnInit(): void {
  }

  loadFile(event: any) {
    const file = event[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64String = reader.result as string;
      this.base64String = this.base64String.split(',')[1];
      this.sendImageFIle();
    };
  }

  sendImageFIle() {
    if (this.base64String) {
      this.isLoading = true;
      this.extractService.launchExtraction(this.base64String).subscribe({
        next: response => {
          this.isLoading = false;
          this.result = {
            body : {
              S : response?.body
            }
          }
        },
        error: err => {
          this.isLoading = false;
        }
      })
    }
  }
}
