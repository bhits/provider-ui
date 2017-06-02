import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'c2s-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.scss']
})
export class SegmentationComponent implements OnInit {
  public segmentationFrom: FormGroup;

  constructor( private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.segmentationFrom = this.buildSegementationForm();
  }


  private buildSegementationForm(): FormGroup{
    return this.formBuilder.group({
      from: [null,
        []
      ],
      to: [null,
        []
      ],
      purposeOfUse: [null,
        []
      ],
      document: [null,
        []
      ],
    });
  }
}
