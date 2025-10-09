import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseUpperTrimPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string') {
            return value.trim().toUpperCase()
        }
        if (typeof value === 'object') {
            throw new BadRequestException('Value must be a STRING')
        }
        return value;

    }
}