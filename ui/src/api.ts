// A store that sells products
export type TStore = {
  id: string;
  name: string;
  website?: string;
  description: string;
  image?: string;
  heroImage?: string;
};

// A collection of related items
export type TProduct = {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  image?: string;
};

export enum DisplayItemType {
  TICKET = 'ticket',
  MERCHANDISE = 'merchandise',
  DONATION = 'donation',
}

export type TDisplayItem = TDisplayDonationItem | TDisplayMerchandiseItem | TDisplayTicketItem;

export type TDisplayTicketItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.TICKET;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type TDisplayMerchandiseItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.MERCHANDISE;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type TDisplayDonationItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.DONATION;
  name: string;
  description?: string;
  image?: string;
  maxQuantityPerOrder: number;
  amountMin: number;
  amountMax: number;
  presetAmounts: number[];
  createdAt: string;
  updatedAt: string;
};

export const getStores = async (): Promise<{ stores: TStore[] }> => {
  return {
    stores: [
      {
        id: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
        name: 'Carroll Magnet Middle School Theatre Company',
        website: 'https://www.cmmstheatre.com/',
        description:
          'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      },
    ],
  };
};

export const getStore = async (storeId: string): Promise<{ store: TStore }> => {
  return {
    store: {
      id: storeId,
      name: 'Carroll Magnet Middle School Theatre Company',
      website: 'https://www.cmmstheatre.com/',
      description:
        'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      heroImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/2_orig.png',
    },
  };
};

export const getProducts = async (
  storeId: string,
): Promise<{
  products: TProduct[];
}> => {
  return {
    products: [
      {
        id: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        storeId,
        name: 'High School Musical Jr. Admission',
        description:
          'Admission to the Carroll Magnet Middle School Theatre Company production of High School Musical Jr.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/editor/hsm-graphic.jpg?1730155750',
      },
      {
        id: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
        storeId,
        name: 'CMMS Theatre Program Fee',
        description: 'One-time program fee for participation in the Carroll Magnet Middle School Theatre Company.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      },
      {
        id: 'eb1266bf-20aa-491c-a60e-9c9898588097',
        storeId,
        name: 'CMMS Theatre Donations',
        description: 'Donations to the Carroll Magnet Middle School Theatre Company to support our productions.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      },
    ],
  };
};

export const getItems = async (productId: string): Promise<{ items: TDisplayItem[] }> => {
  const items: { [k: string]: TDisplayItem[] } = {
    'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3': [
      {
        id: '2ca926f4-25a4-4c1c-806d-7903d12ba4cd',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'General Admission - Night 1',
        description: 'General Admission ticket for the first night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '82c5c617-b23a-44b6-b898-bbcd7d867bb1',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'General Admission - Night 2',
        description: 'General Admission ticket for the second night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '8a100792-62c8-489d-9dd7-0cd05b45ea87',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'General Admission - Night 3',
        description: 'General Admission ticket for the last night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '24fdb139-0e35-4f8a-a385-66d7aec81fa2',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'Child/Student Admission - Night 1',
        description: 'Child/Student Admission ticket for the first night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '68543c72-df74-43cb-a41a-8882d5e960f1',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'Child/Student Admission - Night 2',
        description: 'Child/Student ticket for the second night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: 'f53ec257-2f46-413e-a91d-df3a2efc6648',
        productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        product: {
          name: 'High School Musical Jr. Admission',
        },
        itemType: 'ticket',
        name: 'Child/Student Admission - Night 3',
        description: 'Child/Student Admission ticket for the last night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
    ],
    '587e3cf9-cd2e-4bfb-a593-fd42c5545fab': [
      {
        id: 'f53ec257-2f46-413e-a91d-df3a2efc6658',
        productId: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
        product: {
          name: 'CMMS Theatre Program Fee',
        },
        itemType: 'merchandise',
        name: 'Student Program Fee',
        description: 'One-time program fee for participation in the Carroll Magnet Middle School Theatre Company.',
        price: 150,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 1,
      } as TDisplayMerchandiseItem,
      {
        id: 'af92a383-7bc7-4dba-ae19-06a401ef73fe',
        productId: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
        product: {
          name: 'CMMS Theatre Program Fee',
        },
        itemType: 'merchandise',
        name: 'Student Program Fee - Donation',
        description: 'Donate a program fee to help cover for kids in need.',
        price: 150,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      } as TDisplayMerchandiseItem,
    ],
    'eb1266bf-20aa-491c-a60e-9c9898588097': [
      {
        id: 'af638f78-ab9f-44ec-844e-03995aba66c7',
        productId: 'eb1266bf-20aa-491c-a60e-9c9898588097',
        product: {
          name: 'CMMS Theatre Donations',
        },
        itemType: 'donation',
        name: 'Donate to cover ticket costs for students in need',
        description: 'Donate to cover ticket costs for students in need',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        amountMin: 1,
        amountMax: 999,
        presetAmounts: [1, 5, 10, 25, 50, 100],
      } as TDisplayDonationItem,
    ],
  };
  return {
    items: items[productId],
  };
};
