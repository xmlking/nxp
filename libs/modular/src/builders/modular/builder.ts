import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModularBuilderSchema } from './schema';

export function runBuilder(options: ModularBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
  return of({ success: true }).pipe(
    tap(() => {
      context.logger.info('Builder ran for modular');
    })
  );
}

export default createBuilder(runBuilder);
