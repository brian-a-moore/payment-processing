import { z } from 'zod';
import { bool, empty, role, strShort, uuid } from './_presets';

export const createUserSchema = {
  body: z
    .object({
      email: strShort.email(),
      name: strShort,
      isSuperUser: bool,
      stores: z
        .array(
          z.object({
            storeId: uuid,
            roleId: role,
          }),
        )
        .min(0)
        .max(10),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const deleteUserSchema = {
  body: empty,
  params: z
    .object({
      userId: uuid,
    })
    .strict(),
  query: empty,
};

export const getUserSchema = {
  body: empty,
  params: z
    .object({
      userId: uuid,
    })
    .strict(),
  query: empty,
};

export const listUsersSchema = {
  body: empty,
  params: empty,
  query: empty,
};

export const updateUserSchema = {
  body: z
    .object({
      email: strShort.email().optional(),
      name: strShort.optional(),
      roleId: role.optional(),
    })
    .strict(),
  params: z.object({
    userId: uuid,
  }),
  query: empty,
};
