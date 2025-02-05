export type Price = {
  readonly currency: string;
  readonly date: string;
  readonly price: number;
}

export type PriceList = Price[];