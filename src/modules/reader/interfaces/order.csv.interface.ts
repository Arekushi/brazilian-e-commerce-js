export interface OrderCSV {
    order_id: string;
    customer_id: string;
    order_status?: string;
    order_purchase_timestamp: Date;
    order_approved_at?: Date;
    order_delivered_carrier_date?: Date;
    order_delivered_customer_date?: Date;
    order_estimated_delivery_date?: Date;
}
