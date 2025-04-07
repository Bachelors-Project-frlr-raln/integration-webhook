
import { Injectable } from "@nestjs/common";
import * as InitResponse from "./response/response.init.json";
import * as ConfirmResponse from "./response/response.confirm.json";
import * as SelectResponse from "./response/response.select.json";
import * as StatusResponse from "./response/response.status.json";
import * as UpdateResponse from "./response/response.update.json";
import * as SupportResponse from "./response/response.support.json";
import * as CancelResponse from "./response/response.cancel.json";
import * as TrackResponse from "./response/response.track.json";
import * as RatingResponse from './response/response.rating.json';
import { ConfigService } from "@nestjs/config";
import { connectToDatabase } from "../db";


@Injectable()
export class RetailService {
    bpp_id: string;
    bpp_uri: string;
    constructor(private readonly configService: ConfigService) {
        this.bpp_id = this.configService.get<string>('BPP_ID');
        this.bpp_uri = this.configService.get<string>('BPP_URI');
    }
    async search(request_DTO: any): Promise<any> {
        const { context, message } = request_DTO;
        console.log("context", context);
        console.log("message", message);

        const searchParams = message.intent;

        // Fetch data from the database
        const items = await this.fetchServices(searchParams);

        // Format the response dynamically based on the fetched data
        const response = this.formatOnSearchResponse(context, items);

        return response;
    }

    select = (request_DTO: any) => {
        SelectResponse.context.bpp_id = this.bpp_id;
        SelectResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return SelectResponse;
    };
    init = (request_DTO: any) => {
        InitResponse.context.bpp_id = this.bpp_id;
        InitResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return InitResponse;
    };
    confirm = (request_DTO: any) => {
        ConfirmResponse.context.bpp_id = this.bpp_id;
        ConfirmResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return ConfirmResponse;
    };
    status = (request_DTO: any) => {
        StatusResponse.context.bpp_id = this.bpp_id;
        StatusResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return StatusResponse;
    };
    cancel = (request_DTO: any) => {
        CancelResponse.context.bpp_id = this.bpp_id;
        CancelResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return CancelResponse;
    };
    update = (request_DTO: any) => {
        UpdateResponse.context.bpp_id = this.bpp_id;
        UpdateResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return UpdateResponse;
    };
    support = (request_DTO: any) => {
        SupportResponse.context.bpp_id = this.bpp_id;
        SupportResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return SupportResponse;
    };
    rating = (request_DTO: any) => {
        RatingResponse.context.bpp_id = this.bpp_id;
        RatingResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return RatingResponse;
    };
    track = (request_DTO: any) => {
        TrackResponse.context.bpp_id = this.bpp_id;
        TrackResponse.context.bpp_uri = this.bpp_uri;
        //Business logic goes here
        //We are returning the fixed the json which can be overwritten by actual business to fetch data
        return TrackResponse;
    };

    async fetchServices(searchParams: any): Promise<any[]> {
        try {
            const db = await connectToDatabase();
            const location = searchParams.fulfillment?.start?.location;
        
            if (!location) {
              throw new Error('Location is required');
            }
        
            const items = await db.collection('services').find({ location }).toArray();
            return items;
          } catch (error) {
            console.error('Error fetching services:', error);
            throw new Error('Failed to fetch services');
        }
      }

      formatOnSearchResponse(context: any, items: any[]): any {
        return {
          context,
          message: {
            catalog: {
              items: items.map(item => ({
                id: item._id,
                descriptor: {
                  name: item.name,
                  short_desc: item.short_desc,
                  long_desc: item.long_desc,
                },
                price: item.price,
                location_ids: [item.location_id],
              })),
            },
          },
        };
      }
}

