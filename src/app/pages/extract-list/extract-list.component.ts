import {Component, OnInit} from '@angular/core';
import {ExtractService} from "../services/extract.service";

@Component({
  selector: 'app-extract-list',
  templateUrl: './extract-list.component.html',
  styleUrls: ['./extract-list.component.scss']
})
export class ExtractListComponent implements OnInit{

  dataList: {
    Items : Array<any>,
    count: number,
    ScannedCount : number
  } = {
    Items : [],
    count: 0,
    ScannedCount: 0
  };

  isLoading = false;
  constructor(public  extractService : ExtractService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.extractService.getData().subscribe({
      next: response =>{
        this.isLoading = false;
        this.dataList = JSON.parse(response.body)
      },
      error: err => {
        this.isLoading = false;
        console.log(err)
      }
    })
  }

}
