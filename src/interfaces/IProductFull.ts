export interface IProductFull {
    name: string;
    price: number;
    description: string;
    _links: {
        self: {
            href: string;
        };
        product: {
            href: string;
        };
    };
}
