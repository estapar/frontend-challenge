export type Garage = {
    code: string;
    name: string;
    address: string;
    cityUf: string;
    regional: string;
};

export type GarageApiItem = {
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    region: string;
    subsidiary: string;
};

export type GaragePaginatedList = {
    countRecords: number;
    currentPage: number;
    pageSize: number;
    hasNextPage: number;
    hasPreviousPage: number;
    data: GarageApiItem[];
};
