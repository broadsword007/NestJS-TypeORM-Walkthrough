import { NestFactory } from '@nestjs/core';
import { ManagementModule } from './management.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ManagementModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
