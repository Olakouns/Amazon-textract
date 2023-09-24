import {Component, Input, OnInit} from '@angular/core';
import {ExtractService} from "../../services/extract.service";

@Component({
  selector: 'app-extract-items',
  templateUrl: './extract-items.component.html',
  styleUrls: ['./extract-items.component.scss']
})
export class ExtractItemsComponent implements OnInit{
    @Input() data : {
      body : {
        S : string
      }
    };
    refactorData: any = {}

    constructor(public extractService: ExtractService) {
    }

  ngOnInit(): void {
      if (this.data?.body){
        this.refactorData = this.extractService.refactorData(this.data?.body.S);
      }
  }
}
