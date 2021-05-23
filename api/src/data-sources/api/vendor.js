import { DataSource } from 'apollo-datasource';
import fetch from 'node-fetch';

export default class VendorDataSource extends DataSource {
  initialize(config) {
    this.cache = config.cache;
    this.context = config.context;
  }

  async search(name) {
    const query = encodeURIComponent(name).toLowerCase();
    const url = new URL(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`);
    let vendors = await this.cache.get(url.href);
    if (vendors) {
      return vendors;
    }
    const response = await fetch(url);
    vendors = await response.json();
    vendors = Array.from(new Set(vendors.map(vendor => vendor.name))).sort();
    await this.cache.set(url.href, vendors);
    return vendors;
  }
}
