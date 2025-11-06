// Types for the property filtering system

export type FilterRange = {
  _id: string;
  label: string;
  minValue: number;
  maxValue?: number;
  sortOrder: number;
  dimensionName: string;
  dimensionUnit: string;
};

export type PropertyFilters = {
  propertyTypeId?: string;
  purposeId?: string;
  budgetMin?: number;
  budgetMax?: number;
  carpetAreaMin?: number;
  carpetAreaMax?: number;
  amenityIds?: string[];
};

export type FilterDimension = {
  _id: string;
  name: string;
  slug: string;
  unit: string;
};

export type FilterScope = {
  _id: string;
  propertyType: {
    _id: string;
    name: string;
  };
  purpose: {
    _id: string;
    name: string;
  };
};

