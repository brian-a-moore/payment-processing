import { mdiBarcode, mdiBarcodeOff, mdiPlus, mdiSquareEditOutline, mdiUpdate } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetItemBody, GetItemQuery, GetItemResponse, ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse } from '../../../../api/src/types/api';
import Loader from '../../components/core/Loader';
import { Button, FloatingActionButton, Link } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

export const ItemLayout: React.FC = () => {
  return (
    <div>
      <nav className="bg-sky-900 flex gap-4 p-4">
        <Link href=".">About Item</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export const ItemHome: React.FC = () => {
  const { storeId, productId, itemId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetItemBody, GetItemQuery, GetItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const item = response?.item;

  return (
    <div>
      <H2>{item!.name}</H2>
      <Link href="..">Back</Link>
      <FloatingActionButton onClick={() => navigate('edit', { state: { item }})} path={mdiSquareEditOutline} label='Edit Item' />
    </div>
  );
};

type JsonValue = any;
type ItemState = {
    id: string;
    productId: string;
    itemTypeId: number;
    name: string;
    description: string | null;
    image: string | null;
    config: JsonValue;
    isPublished: boolean;
    maxQuantityPerOrder: number;
    createdAt: Date;
    updatedAt: Date;
  }

export const ItemEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item: ItemState | undefined = location.state?.item;

  return (
    <div>
      <H2>{item?.id ? 'Edit' : 'New'} Item</H2>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
};

export const ItemList: React.FC = () => {
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListItemsPrivateBody, ListItemsPrivateQuery, ListItemsPrivateResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const items = response?.items;

  return (
    <div className='w-full p-4'>
      <div className='flex flex-col w-full max-w-[960px] mx-auto gap-4'>
        {items?.map((item) => (
          <RouterLink className='flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md' key={item.id} to={`../item/${item.id}`}  title={`View item: ${item.name}`}>
              <p className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>{item.name}</p>
              <Icon path={item.isPublished ? mdiBarcode : mdiBarcodeOff} size={0.75} title={item.isPublished ? 'Public' : 'Unlisted'} color={item.isPublished ? '#64748B' : '#F87171'} />
              <div className='flex gap-2 items-center opacity-60' title={`Last Updated: ${new Date(item.updatedAt).toLocaleDateString()}`}>
                <Icon path={mdiUpdate} size={0.75} />
                <p className='text-sm'>{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
          </RouterLink>
        ))}
      </div>
      <FloatingActionButton path={mdiPlus} label='New Item' onClick={() => navigate('../item/new')} />
    </div>
  );
};
