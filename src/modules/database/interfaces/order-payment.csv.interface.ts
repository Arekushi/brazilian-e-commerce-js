export interface OrderPaymentCSV {
    order_id: string;
    payment_sequential: number;
    payment_type: string;
    payment_installments: string;
    payment_value: number;
}
