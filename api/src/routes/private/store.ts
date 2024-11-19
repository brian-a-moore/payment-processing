import { Router } from 'express';
import {
  createStoreController,
  deleteStoreController,
  getStorePrivateController,
  listStoresPrivateController,
  updateStoreController,
} from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createStoreSchema,
  deleteStoreSchema,
  getStorePrivateSchema,
  listStoresPrivateSchema,
  updateStoreSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listStoresPrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listStoresPrivateController,
);
router.get(
  '/:storeId',
  schemaValidatorMiddleware(getStorePrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getStorePrivateController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createStoreSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createStoreController,
);
router.put(
  '/:storeId',
  schemaValidatorMiddleware(updateStoreSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateStoreController,
);
router.delete(
  '/:storeId',
  schemaValidatorMiddleware(deleteStoreSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteStoreController,
);

export default router;
