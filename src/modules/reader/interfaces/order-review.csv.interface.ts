export interface OrderReviewCSV {
    review_id: string;
    order_id: string;
    review_score: number;
    review_comment_title?: string;
    review_comment_message?: string;
    review_creation_date?: Date;
    review_answer_timestamp?: Date;
}
