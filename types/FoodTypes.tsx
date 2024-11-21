export interface Table {
  entityType: string;
  guid: string;
  name: string;
  revenueCenter: any;
  serviceArea: {
    entityType: string;
    guid: string;
  };
}

export interface MenuItem {
  calories: any;
  contentAdvisories: any;
  description: string;
  guid: string;
  image: string;
  inventoryStatus: string;
  isDeferred: boolean;
  isDiscountable: boolean;
  itemTags: Array<any>;
  masterId: bigint;
  menuEntry: any;
  modifierGroupReferences: Array<any>;
  multiLocationId: string;
  name: string;
  plu: string;
  portions: Array<any>;
  prepStations: Array<any>;
  prepTime: any;
  price: number;
  pricingRules: any;
  pricingStrategy: string;
  salesCategory: any;
  sku: string;
  taxInclusion: string;
  taxInfo: Array<string>;
  unitOfMeasure: string;
  visibility: Array<string>;
}

export interface MenuGroup {
  name: string;
  guid: string;
  multiLocationId: string;
  masterId: bigint;
  description: string;
  image: string;
  visibility: Array<string>;
  itemTags: Array<any>;
  menuItems: Array<{ MenuItem }>;
}

export interface FoodLine {
  name: string;
  guid: string;
  multiLocationId: string;
  masterId: bigint;
  description: string;
  highResImage: null;
  image: string;
  visibility: Array<string>;
  availability: {
    alwaysAvailable: boolean;
  };
  menuGroups: Array<{ MenuGroup }>;
}

export interface MenuData {
  restaurantGuid: string;
  lastUpdated: string;
  restaurantTimeZone: string;
  menus: {
    [key: string]: FoodLine;
  };
  modifierGroupReferences: Object;
  modifierOptionReferences: Object;
  preModifierGroupReferences: Object;
}
