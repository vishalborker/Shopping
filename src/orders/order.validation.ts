import { IsNotEmpty, IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDTO {
    @IsArray()
    @IsNotEmpty()
    productIds: [string];

    @IsString()
    @IsNotEmpty()
    currency: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    urlOfSale: string
}
  
  
export class FindById {
    @IsString()
    @IsNotEmpty()
    id: string;
}