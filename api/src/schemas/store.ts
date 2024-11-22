import { z } from 'zod';
import { empty, role, strLong, strShort, uuid } from './_presets';

export const addUserToStoreSchema = {
  body: z
    .object({
      userId: uuid,
      roleId: role,
    })
    .strict(),
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const createStoreSchema = {
  body: z
    .object({
      name: strShort,
      description: strLong.optional(),
      website: strShort.optional(),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const deleteStoreSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const getStorePublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const getStorePrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const listStoresPublicSchema = {
  body: empty,
  params: empty,
  query: z.object({
    page: z.string().min(1).max(6),
  }),
};

export const listStoresPrivateSchema = {
  body: empty,
  params: empty,
  query: z.object({
    page: z.string().min(1).max(6),
  }),
};

export const updateStoreSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
      website: strShort.optional(),
    })
    .strict(),
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};
