import { CustomError } from 'ts-custom-error'
export class HttpError extends CustomError {
  public constructor(
  
    public statusCode:string,
    public isOperational:boolean,
    message?: string,
  ) {
    super(message)
  }

}
