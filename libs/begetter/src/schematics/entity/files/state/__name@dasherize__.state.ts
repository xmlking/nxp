import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { <%= classify(name) %>Action } from './<%= dasherize(name) %>.actions';
import { <%=classify(name)%> } from '../entities/<%=dasherize(name)%>.interface';

export interface <%= classify(name) %>StateModel {
  items: <%=classify(name)%>[];
}

@State<<%= classify(name) %>StateModel>({
  name: '<%= camelize(name) %>',
  defaults: {
    items: []
  }
})
@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>State {

  @Selector()
  public static getState(state: <%= classify(name) %>StateModel) {
    return state;
  }

  @Action(<%= classify(name) %>Action)
  public add(ctx: StateContext<<%= classify(name) %>StateModel>, { payload }: <%= classify(name) %>Action) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }
}
