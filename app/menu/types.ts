export type Category = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;

  // FLAGS
  is_veg: boolean;
  is_available: boolean;
  is_recommended: boolean;
};

export type CartItem = Item & {
  qty: number;
  note?: string;
};
