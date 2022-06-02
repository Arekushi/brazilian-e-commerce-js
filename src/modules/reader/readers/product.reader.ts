import { Injectable } from '@nestjs/common';
import { ProductCSV } from '@reader/interfaces/product.csv.interface';
import { ReaderCSV } from '@reader/classes/reader-csv.class';


@Injectable()
export class ProductReader extends ReaderCSV<ProductCSV> {

    constructor() {
        super({
            filename: 'olist_products_dataset.csv',
            columns: {
                product_id: 'STRING',
                product_category_name: 'STRING',
                product_name_lenght: 'INT',
                product_description_lenght: 'INT',
                product_photos_qty: 'INT',
                product_weight_g: 'INT',
                product_length_cm: 'INT',
                product_height_cm: 'INT',
                product_width_cm: 'INT'
            }
        });
    }
}
