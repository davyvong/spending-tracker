import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AccountService } from 'src/account/account.service';

import { JwtPayloadModel } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadModel, done: VerifiedCallback) {
    const account = await this.accountService.getById(payload.accountId);
    if (!account || !account.passwordHash.startsWith(payload.clientToken)) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, account, payload.iat);
  }
}
