import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import ArticleForm from "../CreateArticle";
import ArticlePreview from "../ArticlePreview";
import store from "../../../store";
import ArticlesView from "../ArticlesView";
import ArticleView from "../ArticleView";

Enzyme.configure({adapter: new Adapter() });

describe('Article Tests', () => {

    let articlesComponent;

    beforeEach(() => {
        articlesComponent=mount(<ArticlesView store={store}  />);
  });

    it('should render article form without crashing', function () {
        shallow(<ArticleForm article onEdit updateArticle onChange handleInputChange preview/>);
    });

    it('should render article preview without crashing', function () {
        shallow(<ArticlePreview article={{title: "title",slug:"sample_slug",body:"body"}}/>);
    });

    it('should render articleviews without crashing', function () {
        mount(<ArticlesView store={store} articles={{title:"title",body:"body",slug:"sample_slug"}} />);
    })

    it('should render articleview without crashing', function () {
        shallow(<ArticleView store={store} articles={{title:"title",body:"body",slug:"sample_slug"}} />);
    })

});