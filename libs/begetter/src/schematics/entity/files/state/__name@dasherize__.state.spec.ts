import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { <%= classify(name) %>State, <%= classify(name) %>StateModel } from './<%= dasherize(name) %>.state';
import { <%= classify(name) %>Action } from './<%= dasherize(name) %>.actions';

describe('<%= classify(name) %> store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([<%= classify(name) %>State])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: <%= classify(name) %>StateModel = {
      items: [{id: 1, name : "sumo", description : "demo"}]
    };
    store.dispatch(new <%= classify(name) %>Action({id: 1, name : "sumo", description : "demo"}));
    const actual = store.selectSnapshot(<%= classify(name) %>State.getState);
    expect(actual).toEqual(expected);
  });

});
