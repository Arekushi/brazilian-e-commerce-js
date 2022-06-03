export interface OrderPaymentCSV {
    order_id: string;
    payment_sequential: number;
    payment_type: string;
    payment_installments: number;
    payment_value: number;
}
