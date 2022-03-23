
export const responseToSchema = (response) => {
  const {data} = response;
  return {
    date: data.Date,
    items: Object.keys(data.Valute).map(g => ({
      numCode: data.Valute[g].NumCode,
      nominal: data.Valute[g].Nominal,
      name: data.Valute[g].Name,
      value: data.Valute[g].Value,
      charCode: data.Valute[g].CharCode,
      percentage: (((data.Valute[g].Value - data.Valute[g].Previous) / data.Valute[g].Value) * 100).toFixed(3),
    })),
  };
};

export const getPrevUrlFromResponse = response => response.data.PreviousURL;
