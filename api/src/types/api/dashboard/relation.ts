import { z } from 'zod';
import * as relationSchema from '../../../schemas/dashboard/relation';

export type AddStoreRelationDashboardBody = z.infer<
  typeof relationSchema.addStoreRelationDashboardSchema.body
>;
export type AddStoreRelationDashboardParams = z.infer<
  typeof relationSchema.addStoreRelationDashboardSchema.params
>;
export type AddStoreRelationDashboardQuery = z.infer<
  typeof relationSchema.addStoreRelationDashboardSchema.query
>;
export type AddStoreRelationDashboardResponse = { id: string };

export type UpdateStoreRelationDashboardBody = z.infer<
  typeof relationSchema.updateStoreRelationDashboardSchema.body
>;
export type UpdateStoreRelationDashboardParams = z.infer<
  typeof relationSchema.updateStoreRelationDashboardSchema.params
>;
export type UpdateStoreRelationDashboardQuery = z.infer<
  typeof relationSchema.updateStoreRelationDashboardSchema.query
>;
export type UpdateStoreRelationDashboardResponse = never;

export type DeleteStoreRelationDashboardBody = z.infer<
  typeof relationSchema.deleteStoreRelationDashboardSchema.body
>;
export type DeleteStoreRelationDashboardParams = z.infer<
  typeof relationSchema.deleteStoreRelationDashboardSchema.params
>;
export type DeleteStoreRelationDashboardQuery = z.infer<
  typeof relationSchema.deleteStoreRelationDashboardSchema.query
>;
export type DeleteStoreRelationDashboardResponse = never;
