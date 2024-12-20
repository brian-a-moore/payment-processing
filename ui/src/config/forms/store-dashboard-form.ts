import { z } from 'zod';

export type StoreDashboardFormType = {
  name: string;
  description: string;
  isPublished: boolean;
};

export const DEFAULT_FORM_VALUES: StoreDashboardFormType = {
  name: '',
  description: '',
  isPublished: false,
};

export const storeDashboardFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();
