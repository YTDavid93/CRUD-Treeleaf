import apiClient from "./api-client";

export interface CountryName {
  name: {
    common: string;
  };
}

class countryList {
  getAllCountryName() {
    return apiClient.get<CountryName[]>("/all");
  }
}

export default new countryList();
