import { EditorState } from "draft-js";
import {
    CREATE_ARTICLE,
    PREVIEW_ARTICLE,
    VIEW_ARTICLE,
    EDIT_ARTICLE,
    DELETE_ARTICLE,
    VIEW_ARTICLES,
    ARTICLE_SUCCESS,
    ARTICLE_FAILURE,
    UPDATE_STORE_ARTICLE,
    FETCHING,
    UPDATE_AUTHOR,
    UPDATE_SLUG,
    CLEAR_MESSAGE,
    PAGINATION_DATA,
    ARTICLE_TAGS
} from "../actions/types";

export const articleState = {
  apiArticle: {},
  title: "",
  body: EditorState.createEmpty(),
  description: "",
  onPreview: false,
  onView: false,
  onEdit: false,
  onDelete: false,
  slug: "",
  showList: false,
  fetchStatus: false,
  isOwner: false,
  message: "",
  articlesList: [],
    paginationData:{
        totalPages:0
    },
  apiTags: [],
  tagsList: [] // These are form tags
};

export const articleReducer = (state = articleState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      const payload = action.payload;
      const tagsList = action.payload.tagsList
        ? action.payload.tagsList.map(tag => {
            return { label: tag, value: tag };
          })
        : state.tagsList;

      return { ...state, ...payload, tagsList: tagsList };
    case PREVIEW_ARTICLE:
      return { ...state, onPreview: action.payload };
    case VIEW_ARTICLE:
      return { ...state, onView: action.payload };
    case EDIT_ARTICLE:
      return { ...state, onEdit: action.payload };
    case DELETE_ARTICLE:
      return { ...state, onDelete: action.payload };
    case VIEW_ARTICLES:
      return { ...state, articlesList: action.payload , showList: true };
    case ARTICLE_SUCCESS:
      return { ...state, message: action.payload };
    case UPDATE_STORE_ARTICLE:
      return { ...state, apiArticle: action.payload };
    case ARTICLE_FAILURE:
      return { ...state, message: action.payload };
    case UPDATE_AUTHOR:
      return { ...state, isOwner: action.payload };
    case FETCHING:
      return { ...state, fetchStatus: action.payload };
    case UPDATE_SLUG:
      return { ...state, slug: action.payload };
    case CLEAR_MESSAGE:
      return {...state, message: ""};
    case PAGINATION_DATA:
      return {...state, paginationData: action.payload};
    case ARTICLE_TAGS:
      return { ...state, apiTags: action.payload };

    default:
      return { ...state };
  }
};
