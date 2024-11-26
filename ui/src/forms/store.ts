import { z } from 'zod';

export type EditStoreForm = {
  name: string;
  description: string;
  website: string;
  isPublished: boolean;
};

export const EDIT_STORE_FORM_INITIAL_VALUES: EditStoreForm = {
  name: '',
  description: '',
  website: '',
  isPublished: false,
};

export const EditStoreFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    website: z.string().min(0).max(256),
    isPublished: z.boolean(),
  })
  .strict();
