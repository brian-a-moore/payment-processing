import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { DeleteUserBody, DeleteUserParams, DeleteUserQuery, DeleteUserResponse } from '../../types/api';

export const deleteUserController = async (
  req: Request<DeleteUserParams, unknown, DeleteUserBody, DeleteUserQuery>,
  res: Response<DeleteUserResponse>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    await db.user.delete({ where: { id: userId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
