import { Service } from '@core/classes/service.class';
import { Body, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';


export abstract class BaseController {

	constructor(
        protected service: Service
    ) { }

	@Post()
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
	@ApiResponse({ status: 403, description: 'Forbidden.'})
	@ApiResponse({ status: 400, description: 'Bad Request.'})
	async create(@Body() entity: any): Promise<any> {
		// return await this.service.create(entity);
	}
}
