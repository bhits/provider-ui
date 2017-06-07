export class ProviderRequestQuery {
  state?: string;
  city?: string;
  zipCode?: string;
  lastName?: string;
  firstName?: string;
  genderCode?: string;
  phone?: string;
  orgName?: string;

  constructor(state: string,
              city: string,
              zipCode: string,
              lastName: string,
              firstName: string,
              genderCode: string,
              phone: string,
              orgName: string) {
    this.state = state;
    this.city = city;
    this.zipCode = zipCode;
    this.lastName = lastName;
    this.firstName = firstName;
    this.genderCode = genderCode;
    this.phone = phone;
    this.orgName = orgName;
  }
}
