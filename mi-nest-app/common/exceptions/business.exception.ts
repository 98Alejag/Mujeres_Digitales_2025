import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string) {
        super({ error: 'BusinessError', message }, HttpStatus.BAD_REQUEST)
    }
}