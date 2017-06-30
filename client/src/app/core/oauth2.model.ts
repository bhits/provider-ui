export class Oauth2 {
  client: Client;
}

export interface Client {
  basicAuthorizationHeader: string;
}
