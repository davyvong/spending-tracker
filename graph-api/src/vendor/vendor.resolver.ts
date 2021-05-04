import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { VendorService } from './vendor.service';

@Resolver()
export class VendorResolver {
  constructor(private readonly vendorService: VendorService) {}

  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  async searchVendors(@Args('keywords') keywords: string): Promise<string[]> {
    return this.vendorService.getByKeywords(keywords);
  }
}
