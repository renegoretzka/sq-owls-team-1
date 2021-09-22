// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ItemStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { User, ShoppingList, Item } = initSchema(schema);

export {
  User,
  ShoppingList,
  Item,
  ItemStatus
};