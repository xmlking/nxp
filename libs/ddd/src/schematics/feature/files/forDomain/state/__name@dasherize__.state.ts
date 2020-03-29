import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
<% if (entity) { %>
import { <%=classify(entity)%> } from '../entities/<%=dasherize(entity)%>';
import { <%=classify(entity)%>Service } from '../services/<%=dasherize(entity)%>.service';
<% } %>

@Injectable({ providedIn: 'root' })
export class <%=classify(name)%>State {
<% if (entity) { %>
    private <%=camelize(entity)%>ListSubject = new BehaviorSubject<<%=classify(entity)%>[]>([]);
    <%=camelize(entity)%>List$ = this.<%=camelize(entity)%>ListSubject.asObservable();

    constructor(private <%=camelize(entity)%>Service: <%=classify(entity)%>Service) {
    }

    load(): void {
        this.<%=camelize(entity)%>Service.load().subscribe(
            <%=camelize(entity)%>List => {
                this.<%=camelize(entity)%>ListSubject.next(<%=camelize(entity)%>List)
            },
            err => {
                console.error('err', err);
            }
        );
    }
<% } %>
}
