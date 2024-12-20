import {
  mdiBarcode,
  mdiChevronRight,
  mdiHome,
  mdiStore,
  mdiTag,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBreadcrumbDashboardQuery } from '../../../../api/src/types/api';
import { api } from '../../api';
import { Link } from '../interactive';

const LABELS = ['Go Home', 'Go to store: ', 'Go to product: ', 'Go to item: '];
const ICONS = [mdiHome, mdiStore, mdiTag, mdiBarcode];

export const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as unknown as GetBreadcrumbDashboardQuery;

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-breadcrumb-dashboard', params],
    queryFn: () => api.breadcrumb.getBreadcrumDashboard(params),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const crumbs = [{ id: '/', name: 'Home' }, ...(data?.crumbs || [])];

  const getCrumbLink = (index: number) => {
    if (index === 0) return '/dashboard';
    if (index === 1) return `/dashboard/store/${crumbs[1].id}`;
    if (index === 2)
      return `/dashboard/store/${crumbs[1].id}/product/${crumbs[2].id}`;
    if (index === 3)
      return `/dashboard/store/${crumbs[1].id}/product/${crumbs[2].id}/item/${crumbs[3].id}`;
    else return '/dashboard';
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <nav className="bg-slate-700 flex gap-4 px-4 py-2 items-center text-slate-100">
          {crumbs.map((crumb, index) => (
            <div key={index} className="flex gap-4">
              <Link
                className="text-slate-100"
                href={getCrumbLink(index)}
                title={`${LABELS[index]}${crumb.name}`}
              >
                <div className="flex gap-2 items-center">
                  <Icon path={ICONS[index]} size={0.75} color="#CBD5E1" />
                  <p className="text-sm line-clamp-1">{crumb.name}</p>
                </div>
              </Link>
              {index !== crumbs.length - 1 && (
                <Icon
                  className="opacity-60"
                  path={mdiChevronRight}
                  size={0.75}
                />
              )}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};
