import { z } from 'zod';

export type StoreAdminFormType = {
  name: string;
  description: string;
  website: string;
  isPublished: boolean;
};

export const DEFAULT_FORM_VALUES: StoreAdminFormType = {
  name: '',
  description: '',
  website: '',
  isPublished: false,
};

export const storeAdminFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    website: z.string().min(0).max(256),
    isPublished: z.boolean(),
  })
  .strict();