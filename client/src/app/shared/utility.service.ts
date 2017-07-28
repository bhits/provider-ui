import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {BrowserService} from "./browser.service";

@Injectable()
export class UtilityService {

  constructor(private browserService: BrowserService,
              private datePipe: DatePipe,
              private router: Router) {
  }

  public navigateTo(url: string) {
    this.router.navigate([url]);
  }

  redirectInSameTab(path: string) {
    let url:string = this.composeUrl().concat(path);
    window.location.replace(url);
  }

  private composeUrl():string{
    let protocol:string = window.location.protocol;
    let host:string = window.location.host;
    let port:string = window.location.port;
    return protocol.concat("//").concat(host).concat( port? ":".concat(port).concat("/"): "/");
  }

  public formatZipCode(zipCode: string): string {
    if (zipCode.length > 5) {
      zipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
    }
    return zipCode;
  }

  public formatDate(aDate: Date, dateFormat: string) {
    return this.datePipe.transform(aDate, dateFormat);
  }

  public convertJsonObjToStrMap(jsonStr) {
    const strMap = new Map();
    for (let k of Object.keys(jsonStr)) {
      strMap.set(k, jsonStr[k]);
    }
    return strMap;
  }

  public downloadFile(content, filename, fileFormat): void {
    const file = this.base64StringtoBlob(content, fileFormat);
    if (this.browserService.isIE()) {
      filename = filename + '.pdf';
      window.navigator.msSaveBlob(file, filename);
    } else if (this.browserService.isFireFox()) {
      filename = filename + '.pdf';
      this.saveFileToDiskInChromeAndFF(file, filename);
    } else if (this.browserService.isChrome() || this.browserService.isSafari()) {
      this.saveFileToDiskInChromeAndFF(file, filename);
    }
  }

  public isPastDate(date: Date): boolean {
    if (date != null) {
      let today = new Date();
      today.setHours(0, 0, 0, 0); // Reset Time
      return date < today;
    }
  }

  public isFirstDateBeforeSecondDate(firstDate: Date, secondDate: Date): boolean {
    return firstDate < secondDate;
  }

  public getFullName(person: any): string {
    return UtilityService.filterNullValueInName(person, 'firstName').concat(' ').concat(UtilityService.filterNullValueInName(person, 'middleName')).concat(' ').concat(UtilityService.filterNullValueInName(person, 'lastName'));
  }

  private base64StringtoBlob(b64Data, contentType, sliceSize ?): Blob {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  private saveFileToDiskInChromeAndFF(blobFile, filename): void {
    const blobURL = (window.URL || (<any>window).webkitURL).createObjectURL(blobFile);
    const anchor = <any>document.createElement("a");
    anchor.style = "display: none";
    anchor.download = filename;
    anchor.href = blobURL;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(function () {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  }

  getSupportedLocaleCode(supportedLocales: any) {
    let localeCode: string [] = [];
    supportedLocales.forEach(locale => {
      localeCode.push(locale.code);
    });
    return localeCode;
  }

  private static filterNullValueInName(person: any, key: string): string {
    if (person !== null && person[key]) {
      return person[key];
    }
    return ''
  }

  public toTitleCase(fullName: string): string {
    return fullName.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
