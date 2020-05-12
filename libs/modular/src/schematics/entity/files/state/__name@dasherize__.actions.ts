import { <%=classify(name)%> } from '../entities/<%=dasherize(name)%>.interface';

export class <%= classify(name) %>Action {
  public static readonly type = '[<%= classify(name) %>] Add item';
  constructor(public payload: <%= classify(name) %>) { }
}
