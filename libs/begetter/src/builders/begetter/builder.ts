import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BegetterBuilderSchema } from './schema';

export function runBuilder(options: BegetterBuilderSchema, context: BuilderContext): Observable<BuilderOutput> {
         return of({ success: true }).pipe(
           tap(() => {
             context.logger.info('Builder ran for begetter');
           })
         );
       }

export default createBuilder(runBuilder);
