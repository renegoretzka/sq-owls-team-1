import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ItemStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}



type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShoppingListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ItemMetaData = {
  readOnlyFields;
}

export declare class User {
  readonly id: string;
  readonly username?: string;
  readonly list?: ShoppingList;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ShoppingList {
  readonly id: string;
  readonly name: string;
  readonly users?: (User | null)[];
  readonly items?: (Item | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ShoppingList, ShoppingListMetaData>);
  static copyOf(source: ShoppingList, mutator: (draft: MutableModel<ShoppingList, ShoppingListMetaData>) => MutableModel<ShoppingList, ShoppingListMetaData> | void): ShoppingList;
}

export declare class Item {
  readonly id: string;
  readonly name: string;
  readonly quantity?: string;
  readonly status: ItemStatus | keyof typeof ItemStatus;
  readonly listID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Item>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}