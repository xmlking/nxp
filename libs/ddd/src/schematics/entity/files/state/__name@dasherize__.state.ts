import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { <%=classify(name)%> } from '../entities/<%=dasherize(name)%>.interface';
import { <%=classify(name)%>Service } from '../services/<%=dasherize(name)%>.service';

@Injectable({ providedIn: 'root' })
export class <%=classify(name)%>State {
    private <%=camelize(name)%>ListSubject = new BehaviorSubject<<%=classify(name)%>[]>([]);
    <%=camelize(name)%>List$ = this.<%=camelize(name)%>ListSubject.asObservable();

    constructor(private <%=camelize(name)%>Service: <%=classify(name)%>Service) {
    }

    load(): void {
        this.<%=camelize(name)%>Service.load().subscribe(
            <%=camelize(name)%>List => {
                this.<%=camelize(name)%>ListSubject.next(<%=camelize(name)%>List)
            },
            err => {
                console.error('err', err);
            }
        );
    }
}
