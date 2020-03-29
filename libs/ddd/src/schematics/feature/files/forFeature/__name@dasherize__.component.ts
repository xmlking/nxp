import { Component, OnInit} from '@angular/core';
import { <%=classify(name)%>State } from '<%=workspaceName%>/<%=dasherize(domain)%>/domain';

@Component({
  selector: '<%=dasherize(domain)%>-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.scss']
})
export class <%=classify(name)%>Component implements OnInit {

<% if (entity) { %>
    <%=camelize(entity)%>List$ = this.<%=camelize(name)%>State.<%=camelize(entity)%>List$;
<% } %>

    constructor(private <%=camelize(name)%>State: <%=classify(name)%>State) {
    }

<% if (entity) { %>
    ngOnInit() {
        this.load();
    }

    load(): void {
        this.<%=camelize(name)%>State.load();
    }
<% } else { %>
    ngOnInit() {
    }
<% } %>
}

