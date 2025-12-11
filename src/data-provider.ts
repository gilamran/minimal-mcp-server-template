export interface ITVProduct {
  brand: string;
  model: string;
  inches: number;
  resolution: string;
}

export async function getTVProducts(brand: string, maxInches: number, minInches: number) {
  const tvProducts: ITVProduct[] = [
    {
      brand: "Samsung",
      model: "Q80A",
      inches: 65,
      resolution: "3840x2160 4K",
    },
    {
      brand: "Samsung",
      model: "Q80B",
      inches: 75,
      resolution: "3840x2160 4K",
    },
    {
      brand: "LG",
      model: "C2",
      inches: 55,
      resolution: "1920x1080 4K",
    },
    {
      brand: "LG",
      model: "C2",
      inches: 65,
      resolution: "3840x2160 4K",
    },
  ];
  return tvProducts.filter((tv) => tv.brand === brand && tv.inches >= minInches && tv.inches <= maxInches);
}
