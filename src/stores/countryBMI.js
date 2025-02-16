import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3001";
const baseUrl = "https://burgernomics-production.up.railway.app";

export const useCountryBMI = defineStore("countryBMI", () => {
  const state = reactive({
    countries: [],
    selectedCountryData: "",
    latestData: "",
    bigMacExchangeRate: "",
    actualExchangeRate: "",
    historicalDate: [],
    historicalBMI: [],
  });

  async function fetchCountries() {
    try {
      const { data } = await axios.get(`${baseUrl}/countries`);
      state.countries = data;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSelectedCountryData(countryCode) {
    try {
      const { data } = await axios.get(`${baseUrl}/countries/${countryCode}`);
      state.selectedCountryData = data;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchByCountry(countryCode) {
    try {
      const { data } = await axios.get(
        `${baseUrl}/big-mac-indexes/${countryCode}`
      );
      state.bigMacExchangeRate = Number(data.dataset.data[0][2]).toFixed(2);
      state.actualExchangeRate = Number(data.dataset.data[0][4]).toFixed(2);
      state.historicalDate = data.dataset.data.map((el) => el[0]).reverse();
      state.historicalBMI = data.dataset.data.map((el) => el[5]).reverse();
      state.latestData = data.dataset.data[0];
    } catch (error) {
      console.log(error);
    }
  }

  return { state, fetchCountries, fetchByCountry, fetchSelectedCountryData };
});
