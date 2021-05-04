export class JwtPayloadModel {
  accountId: string;
  clientToken: string;
  exp: number;
  iat: number;
}
