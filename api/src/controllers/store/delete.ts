import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { DeleteStoreBody, DeleteStoreParams, DeleteStoreQuery, DeleteStoreResponse } from '../../types/api';

export const deleteStoreController = async (
  req: Request<DeleteStoreParams, unknown, DeleteStoreBody, DeleteStoreQuery>,
  res: Response<DeleteStoreResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;

    await db.store.delete({ where: { id: storeId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
