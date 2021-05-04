import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import fetch from 'node-fetch';

@Injectable()
export class VendorService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getByKeywords(keywords: string): Promise<string[]> {
    const apiUrl = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(keywords)}`;
    const cachedResponse = await this.cacheManager.get(apiUrl);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
    const searchResultsSet: Set<string> = new Set();
    const response = await fetch(apiUrl);
    const suggestions = await response.json();
    for (let i = 0; i < suggestions.length; i++) {
      searchResultsSet.add(suggestions[i].name);
    }
    const searchResultsArray = Array.from(searchResultsSet);
    await this.cacheManager.set(apiUrl, JSON.stringify(searchResultsArray), { ttl: 86400 });
    return searchResultsArray;
  }
}
