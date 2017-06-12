import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SharePurpose} from "app/consent/shared/share-purpose.model";
import {ConsentService} from "app/consent/shared/consent.service";
import {Consent} from "app/consent/shared/consent.model";
import {PurposeOfUseService} from "app/consent/shared/purpose-of-use.service";

@Component({
  selector: 'c2s-purpose-of-use',
  templateUrl: './purpose-of-use.component.html',
  styleUrls: ['./purpose-of-use.component.scss']
})
export class PurposeOfUseComponent implements OnInit {
  public purposeOfUses: SharePurpose[];
  public selectedPurposeOfUses: string[];
  private patientConsent: Consent;

  constructor(private consentService: ConsentService,
              private purposeOfUseService: PurposeOfUseService,
              private route: ActivatedRoute) {
    this.consentService.getConsentEmitter().subscribe((consent) => {
      if (consent) {
        this.patientConsent = consent;
      }
    });
  }

  ngOnInit() {
    this.purposeOfUses = this.route.snapshot.parent.data['purposeOfUses'];
    let consentPurposeOfUses: SharePurpose[] = this.purposeOfUseService.mapConsentSharePurposesToSharePurposes(this.patientConsent, this.purposeOfUses);
    this.selectedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(consentPurposeOfUses);
  }

  public selectAll() {
    this.purposeOfUseService.setPurposeOfUseStatusToChecked(this.purposeOfUses);
  }

  public deSelectAll() {
    this.purposeOfUseService.setPurposeOfUseStatusToUnChecked(this.purposeOfUses);
  }

  public updateSelectedPurposesOfUse(dialog: any) {
    dialog.close();
    this.selectedPurposeOfUses = this.purposeOfUseService.getCheckedPurposeOfUse(this.purposeOfUses);
    this.patientConsent.sharePurposes = this.purposeOfUseService.getSelectedPurposeOfUse(this.purposeOfUses);
    this.consentService.setConsentEmitter(this.patientConsent);
  }
}
