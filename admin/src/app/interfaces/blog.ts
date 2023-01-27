export interface Blog {
    _id: string;
    name: string;
    slug: string;
    intro: string;
    description: string;
    image: string;
    images: [];
    date: Date;
    delete: boolean;
    active: boolean;
}
