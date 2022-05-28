export interface OrderItemCSV {
    order_id: string;
    order_item_id: string;
    product_id: string;
    seller_id: string;
    shipping_limit_date: Date;
    price: number;
    freight_value: number;
}
