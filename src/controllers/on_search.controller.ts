import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { RetailService } from '../retail/retail.service';

@Controller('on_search')
export class OnSearchController {
  constructor(private readonly retailService: RetailService) {}

  @Post()
  @HttpCode(200)
  async handleOnSearch(@Body() body: any): Promise<any> {
    const context = body.context;
    const searchParams = body.message.intent;

    // Fetch data from the database using the RetailService
    const items = await this.retailService.fetchServices(searchParams);

    // Format the response
    const response = this.retailService.formatOnSearchResponse(context, items);

    return response;
  }
}