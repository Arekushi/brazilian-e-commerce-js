import { Command } from 'nestjs-command';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { Injectable } from '@nestjs/common';

import { SellerCommander } from '@cli/commanders/seller.commander';
import { ProductCommander } from '@cli/commanders/product.commander';
import { OrderCommander } from '@cli/commanders/order.commander';
import { OrderReviewCommander } from '@cli/commanders/order-review.commander';
import { OrderPaymentCommander } from '@cli/commanders/order-payment.commander';
import { OrderItemCommander } from '@cli/commanders/order-item.commander';
import { GeolocationCommander } from '@cli/commanders/geolocation.commander';
import { CustomerCommander } from '@cli/commanders/customer.commander';
import { DatasetsCommander } from '@cli/commanders/datasets.commander';
import { execShellCommand } from '@core/utils/exec.util';


@Injectable()
export class MainCommander extends Commander {

    commanders: Commander[];

    constructor(
        datasets: DatasetsCommander,
        customer: CustomerCommander,
        geolocation: GeolocationCommander,
        orderItem: OrderItemCommander,
        orderPayment: OrderPaymentCommander,
        orderReview: OrderReviewCommander,
        order: OrderCommander,
        product: ProductCommander,
        seller: SellerCommander
    ) {
        super('main');

        this.commanders = [
            datasets,
            geolocation,
            customer,
            seller,
            product,
            order,
            orderItem,
            orderPayment,
            orderReview
        ];
    }

    @Command({
        command: 'init:main',
        describe: 'Download CSV, Read all CSV and insert each one',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async init(): Promise<void> {
        await execShellCommand('npm run prisma:migrate');

        for (const commander of this.commanders) {
            await commander.init();
        }
    }
}
