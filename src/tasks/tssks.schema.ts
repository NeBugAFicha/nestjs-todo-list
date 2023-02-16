import Joi from 'joi';
import { SchemaType } from '../Types';
import { Type } from './tasks.type';

export const Schema: SchemaType<Type> = {
  create: {
    param: Joi.object().keys({
      task_list_id: Joi.number().positive().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .max(255)
        .required()
        .description('Название задачи'),
    }),
  },
  findById: {
    param: Joi.object().keys({
      task_list_id: Joi.number().positive().required(),
      id: Joi.number().positive().required(),
    }),
  },
  delete: {
    param: Joi.object().keys({
      task_list_id: Joi.number().positive().required(),
      id: Joi.number().positive().required(),
    }),
  },
  update: {
    param: Joi.object().keys({
      task_list_id: Joi.number().positive().required(),
      id: Joi.number().positive().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string()
        .min(1)
        .max(255)
        .required()
        .description('Название задачи'),
    }),
  },
};
