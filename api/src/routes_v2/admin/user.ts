import { Router } from 'express';
import {
  createUserAdminController,
  deleteUserAdminController,
  getUserAdminController,
  listUsersAdminController,
  updateUserAdminController,
} from '../../controllers_v2/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createUserAdminSchema,
  deleteUserAdminSchema,
  getUserAdminSchema,
  listUsersAdminSchema,
  updateUserAdminSchema,
} from '../../schemas_v2/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listUsersAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listUsersAdminController,
);
router.get(
  '/:userId',
  schemaValidatorMiddleware(getUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getUserAdminController,
);
router.delete(
  '/:userId',
  schemaValidatorMiddleware(deleteUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteUserAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createUserAdminController,
);
router.put(
  '/:userId',
  schemaValidatorMiddleware(updateUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateUserAdminController,
);

export default router;
