import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationRules} from "app/shared/validation-rules.model";

@Component({
  selector: 'c2s-consent-search',
  templateUrl: './consent-search.component.html',
  styleUrls: ['./consent-search.component.scss']
})
export class ConsentSearchComponent implements OnInit {
  public consentSearchFrom: FormGroup;
  public purposeOfUses = [
    {value: 'TREAT', display: 'Treatment'},
    {value: 'HPAYMT', display: 'Healthcare Payment'},
    {value: 'HRESCH', display: 'Healthcare Research'}
  ];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.consentSearchFrom = this.initConsentSearchFormGroup();
  }

  private initConsentSearchFormGroup() {
    return this.formBuilder.group({
      fromProvider: [null,
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH),
          Validators.required
        ]
      ],
      toProvider: [null,
        [
          Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NORMAL_MAX_LENGTH)
        ]
      ],
      purposeOfUse: [null, Validators.required],
    });
  }
}
