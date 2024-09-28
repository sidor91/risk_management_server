import { Module } from '@nestjs/common';
import { RiskItemService } from './risk_item.service';
import { RiskItemResolver } from './risk_item.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Risk, RiskItemSchema } from './risk_item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskItemSchema }]),
  ],
  providers: [RiskItemResolver, RiskItemService],
})
export class RiskItemModule {}
