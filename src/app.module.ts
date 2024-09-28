import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConfigModule } from './@config/db.config';
import { GraphQLConfigModule } from './@config/gql.config';
import { RiskCategoryModule } from './risk_category/risk_category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseConfigModule,
    GraphQLConfigModule,
    RiskCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
