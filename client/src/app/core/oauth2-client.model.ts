export class Oauth2Client {
  client: Client;
}

export interface Client {
  basicAuthorizationHeader: string;
}
