import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfigModule } from './@config/db.config';
import { GraphQLConfigModule } from './@config/gql.config';
import { RiskCategoryModule } from './risk_category/risk_category.module';
import { RiskItemModule } from './risk_item/risk_item.module';
import { DataLoaderMiddleware } from './@middlewares/data-loader.middleware';
import { DataLoaderModule } from './data-loader/data-loader.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseConfigModule,
    GraphQLConfigModule,
    RiskCategoryModule,
    RiskItemModule,
    DataLoaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DataLoaderMiddleware).forRoutes('*');
  }
}
