export const currencySymbol = (curr: string) =>
  ({
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "CHF",
  })[curr] ?? curr;
