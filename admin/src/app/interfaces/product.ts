import {Category} from "./category";

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    intro: string;
    date: Date;
    client: string;
    categories: [Category];
    image: string;
    images: [];
    active: boolean;
    delete: boolean;
}
