import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListItemsPublicBody, ListItemsPublicQuery, ListItemsPublicResponse } from '../../../../api/src/types/api';
import { FixedItemConfig, VariableItemConfig } from '../../../../api/src/types/itemConfigs';
import { Card, Grid } from '../../components/container';
import { Button, Stepper } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import { CartContext, TCartItem } from '../../context/CartContext';
import useApi from '../../hooks/useApi';
import { formatCurrency } from '../../utils';

type Params = {
  storeId: string;
  productId: string;
};
type Props = {};

type JsonValue = any;

export type Item = {
    id: string;
    itemTypeId: number;
    name: string;
    description: string | null;
    image: string | null;
    config: JsonValue;
    maxQuantityPerOrder: number;
    product: {
        name: string;
    };
  }

export const Items: React.FC<Props> = () => {
  const { storeId, productId } = useParams<Params>();
  const navigate = useNavigate();
  
  const { error, isLoading, response } = useApi<ListItemsPublicBody, ListItemsPublicQuery, ListItemsPublicResponse>({
    url: `/store/${storeId}/product/${productId}/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  }, { isPrivateEndpoint: false});

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return <Grid>{response?.items?.map((item) => <ItemContainer key={item.id} item={item} />)}</Grid>;
};

const ItemContainer: React.FC<{
  item: Item;
}> = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const addItemToCart = (item: TCartItem) => addItem(item);

  return (
      <Card key={item.id}>
      {item.image ? (
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={item.name}>
        {item.name}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={item.description || 'No Description'}>
        {item.description}
      </p>
      {item.itemTypeId === 1 ? 
        <FixedPriceItem item={item} addItemToCart={addItemToCart} /> :
        <VariablePriceItem item={item} addItemToCart={addItemToCart} />
      }
    </Card>
  )
};

const FixedPriceItem: React.FC<{ item: Item, addItemToCart: (item: TCartItem) => void }> = ({ item, addItemToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const config: FixedItemConfig = JSON.parse(item.config);

  // @ts-ignore
  const handleQuantityChange = (itemId: string, dir: '-' | '+') => {
    if (dir === '-' && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
    if (dir === '+' && quantity < item.maxQuantityPerOrder) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold">{formatCurrency(config.price)}</p>
        <Stepper item={{ ...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button onClick={() => {
        addItemToCart({
          id: item.id,
          name: item.name,
          product: item.product,
          price: config.price,
          quantity,
          maxQuantityPerOrder: item.maxQuantityPerOrder,
        });
        setQuantity(1);
      }}>Add to Cart</Button>
    </>
  );
};

const VariablePriceItem: React.FC<{ item: Item, addItemToCart: (item: TCartItem) => void  }> = ({ item, addItemToCart }) => {
  const [customAmount, setCustomAmount] = useState<number>(0);

  const { defaultAmount, minAmount, maxAmount, stepAmount, presetAmounts, }: VariableItemConfig = JSON.parse(item.config);

  useEffect(() => {
    if(defaultAmount && !isNaN(defaultAmount)) setCustomAmount(defaultAmount);
  }, [defaultAmount])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomAmount(value < minAmount ? minAmount : value > maxAmount ? maxAmount : value);
  };
  return(
    <>
      {presetAmounts.length ? (
        <div className='flex flex-wrap gap-2'>
          {presetAmounts.map((amount) => <Button variant='secondary' key={amount} onClick={() => setCustomAmount(amount)}>{formatCurrency(amount)}</Button>)}
        </div>
      ) : null}
      <div className='flex justify-center'>
        {'$'}<input type="number" onChange={handleChange} min={minAmount} step={stepAmount} max={maxAmount} value={customAmount} />{'.00'}
      </div>
      <Button disabled={customAmount < 1} onClick={() => {
        addItemToCart({
          id: item.id,
          name: item.name,
          product: item.product,
          price: customAmount,
          quantity: 1,
          maxQuantityPerOrder: item.maxQuantityPerOrder,
        });
        setCustomAmount(0);
      }}>Add to Cart</Button>
    </>
  )
};