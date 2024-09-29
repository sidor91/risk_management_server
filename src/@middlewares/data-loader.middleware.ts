import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataLoaderService } from 'src/data-loader/data-loader.service';

@Injectable()
export class DataLoaderMiddleware implements NestMiddleware {
  constructor(private readonly dataLoaderService: DataLoaderService) {}

  use(req: Request, _: Response, next: NextFunction) {
    req['loaders'] = this.dataLoaderService;
    next();
  }
}
