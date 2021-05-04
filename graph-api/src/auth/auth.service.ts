import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';

import { JwtModel } from './models/jwt.model';
import { JwtPayloadModel } from './models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly accountService: AccountService) {}

  async signToken(accountId: string, passwordHash: string): Promise<JwtModel> {
    const clientToken = passwordHash.substring(0, 10);
    const token = await this.jwtService.signAsync({ accountId, clientToken });
    const payload = await this.verifyToken(token);
    return {
      exp: payload.exp,
      iat: payload.iat,
      token,
    };
  }

  async signInWithEmail(email: string, plainPassword: string): Promise<JwtModel> {
    const account = await this.accountService.getByEmail(email);
    if (account && (await this.accountService.verifyPassword(plainPassword, account.passwordHash))) {
      const { id, passwordHash } = account;
      return this.signToken(id, passwordHash);
    }
    throw new UnauthorizedException();
  }

  async verifyToken(token: string): Promise<JwtPayloadModel> {
    return this.jwtService.verifyAsync(token);
  }
}
