import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetProductPrivateBody,
  GetProductPrivateParams,
  GetProductPrivateResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';

type Props = {
  storeId?: string;
  productId?: string;
};

export const ProductForm: React.FC<Props> = ({ storeId, productId }) => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    GetProductPrivateBody,
    GetProductPrivateParams,
    GetProductPrivateResponse
  >(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/store/${storeId}/product/${productId}`,
    },
    { isAutoTriggered: !!storeId && !!productId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <form>
      <h1>Product Form</h1>
      <p>{JSON.stringify(response?.product)}</p>
    </form>
  );
};
