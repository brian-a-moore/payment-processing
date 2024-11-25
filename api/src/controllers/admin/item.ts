import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  DeleteItemAdminBody,
  DeleteItemAdminParams,
  DeleteItemAdminQuery,
  DeleteItemAdminResponse,
  ErrorResponse,
  GetItemAdminBody,
  GetItemAdminParams,
  GetItemAdminQuery,
  GetItemAdminResponse,
  ListItemsAdminBody,
  ListItemsAdminParams,
  ListItemsAdminQuery,
  ListItemsAdminResponse,
  UpdateItemAdminBody,
  UpdateItemAdminParams,
  UpdateItemAdminQuery,
  UpdateItemAdminResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listItemsAdminController = async (
  req: Request<ListItemsAdminParams, unknown, ListItemsAdminBody, ListItemsAdminQuery>,
  res: Response<ListItemsAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;
    const { productId } = req.query;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const items = await db.item.findMany({
      where: {
        productId,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ items });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getItemAdminController = async (
  req: Request<GetItemAdminParams, unknown, GetItemAdminBody, GetItemAdminQuery>,
  res: Response<GetItemAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { itemId } = req.params;

  try {
    const item = await db.item.findUniqueOrThrow({
      where: { id: itemId },
    });

    res.status(STATUS_CODE.OKAY).json({ item });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateItemAdminController = async (
  req: Request<UpdateItemAdminParams, unknown, UpdateItemAdminBody, UpdateItemAdminQuery>,
  res: Response<UpdateItemAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const updatedItemFields = req.body;

    await db.item.update({ data: updatedItemFields, where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteItemAdminController = async (
  req: Request<DeleteItemAdminParams, unknown, DeleteItemAdminBody, DeleteItemAdminQuery>,
  res: Response<DeleteItemAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;

    await db.item.delete({ where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};