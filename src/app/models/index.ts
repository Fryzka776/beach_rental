export type Role = 'admin' | 'user';

export type EquipmentType = 'ręcznik' | 'parasol' | 'leżak' | 'parawan';

export interface User {
    id: string;
    username: string;
    password: string;
    role: Role;
}

export interface Equipment {
    id: string;
    type: EquipmentType;
    name: string;
    stock: number;
    available: number;
    pricePerDay: number;
    img: string;
}

export interface CartItem {
    equipmentId: string;
    name: string;
    pricePerDay: number;
    qty: number;
    stock?: number;
}

export interface Rental {
    userId: string;
    items: CartItem[];
    startDate: string; 
}
