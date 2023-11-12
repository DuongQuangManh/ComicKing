export type TVipTicket = {
  price: number;
  duration: number;
  coinExtraDaily: number;
  expExtraDaily: number;
  coinExtra: number;
  expExtra: number;
  currency: string;
  image: string;
  name: string;
};

export type TCoinPackage = {
  price: number;
  exp: number;
  coin: number;
  currency: string;
  image: string;
  suggest: boolean;
};
