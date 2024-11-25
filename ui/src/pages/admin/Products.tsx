import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse } from '../../../../api/src/types/api';
import { Card, ColumnConfig, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

const columns: ColumnConfig[] = [{
  key: 'name',
  label: 'Product Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'storeName',
  label: 'Store Name',
  render: (value) => <p className='line-clamp-2'>{value}</p>,
},{
  key: 'isPublished',
  label: 'Status',
  render: (value) => <p>{value}</p>,
}, {
  key: 'createdAt',
  label: 'Created Date',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}, {
  key: 'updatedAt',
  label: 'Last Updated',
  render: (value) => <p>{new Date(value).toLocaleDateString()}</p>,
}];

export const ProductsAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse>({
    url: `/admin/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const products = response?.products;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Products</H4>
        </Card>
        <Card>
          {products && products.length ? (<Table columns={columns} data={products} />) : <EmptyText>No products found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
