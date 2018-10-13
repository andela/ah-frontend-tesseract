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
  UPDATE_AUTHOR,
  UPDATE_SLUG,
  CLEAR_MESSAGE,
  PAGINATION_DATA,
  ARTICLE_TAGS
} from "./types";
import { axiosInstance } from "../globals";
import { FetchAction } from "./authentication";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

export const createArticle = payload => {
  return {
    type: CREATE_ARTICLE,
    payload
  };
};

export const previewArticle = payload => {
  return {
    type: PREVIEW_ARTICLE,
    payload
  };
};

export const updateAuthor = payload => {
  return {
    type: UPDATE_AUTHOR,
    payload
  };
};

export const updateSlug = payload => {
  return {
    type: UPDATE_SLUG,
    payload
  };
};

export const viewArticle = payload => {
  return {
    type: VIEW_ARTICLE,
    payload
  };
};

export const updateStoreArticle = payload => {
  return {
    type: UPDATE_STORE_ARTICLE,
    payload
  };
};

export const editArticle = payload => {
  return {
    type: EDIT_ARTICLE,
    payload
  };
};

export const viewArticles = payload => {
  return {
    type: VIEW_ARTICLES,
    payload
  };
};

export const deleteAction = payload => {
  return {
    type: DELETE_ARTICLE,
    payload
  };
};

export const success = payload => {
  return {
    type: ARTICLE_SUCCESS,
    payload
  };
};

export const failure = payload => {
  return {
    type: ARTICLE_FAILURE,
    payload
  };
};

export const updateTagsList = payload => {
  return {
    type: ARTICLE_TAGS,
    payload
  };
};

const getPostData = article => {
  return {
    title: article["title"],
    body: JSON.stringify(convertToRaw(article.body.getCurrentContent())),
    description: article["description"],
    image: article['image'],
    tags: article.tagsList
      ? article.tagsList
          .map( tag => {
            return tag.value;
          } ) .join(",") : ""
  } };
export const paginationData = (pageNumber, totalPages) => {
  return {
    type: PAGINATION_DATA,
    payload: {
      totalPages,
      currentPage: pageNumber,
      hasNextPage: totalPages - pageNumber > 0,
      hasPreviousPage: pageNumber > 1,
      previousPage: pageNumber - 1,
      nextPage: pageNumber + 1,
      range: pageRange(pageNumber, totalPages)
    }
  };
};

const pageRange = (pageNumber, totalPages) => {
  if (totalPages - pageNumber >= 5) {
    return [
      pageNumber,
      pageNumber + 1,
      pageNumber + 2,
      pageNumber + 3,
      pageNumber + 4
    ];
  }
  return [
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages
  ];
};

export const clearMessage = dispatch => {
  dispatch({ type: CLEAR_MESSAGE });
};

export const publishArticle = article => async dispatch => {
  // extract data from the article in store to submit to the API
  dispatch(FetchAction(true));

  return await axiosInstance
    .post("/article/create", getPostData(article))
    .then(response => {
      dispatch(updateSlug(response.data.slug));
      const message = "Article published successfully";
      dispatch(success(message));
      dispatch(FetchAction(false));})
    .catch(error => {
      try {
        const message = "Failed to publish Article  fields [ ";
        dispatch(
          failure(
            message +
              Object.keys(error.response.data.errors) +
              " ] are required"
          ) );
        dispatch(previewArticle(true));
      } catch (e) {
        dispatch(failure("Failed to publish Article"));
        console.log(e);
      }
      dispatch(FetchAction(false));
    } ) };

export const getArticle = article_slug => async dispatch => {
  dispatch(FetchAction(true));
  return await axiosInstance
    .get(`/article/get/${article_slug}`)
    .then(response => {
      const contentState = convertFromRaw(JSON.parse(response.data.body));
      response.data["body"] = EditorState.createWithContent(contentState);
      dispatch(updateStoreArticle(response.data));
      if (
        localStorage.getItem("currentUser") === response.data.author.username
      ) {
        dispatch(updateAuthor(true));
      }
      dispatch(viewArticle(true));
      dispatch(FetchAction(false));
    })
    .catch(error => {
      const message = "Failed to get Article";
      dispatch(failure(message));
      dispatch(FetchAction(false));
    });
};

export const getArticles = pageNumber => async dispatch => {
  dispatch(FetchAction(true));
  return await axiosInstance
    .get(`/articles?page=${pageNumber}`)
    .then(response => {
      // get list if articles from API
      dispatch(previewArticle(false));
      dispatch(viewArticles(response.data.articles));
      dispatch(paginationData(pageNumber, response.data.number_of_pages));
      dispatch(FetchAction(false));
    })
    .catch(error => {
      console.log(error);
      const message = "Failed to get Articles";
      dispatch(failure(message));
      dispatch(FetchAction(false));
    });
};

export const updateArticle = article => async dispatch => {
  dispatch(FetchAction(true));

  return await axiosInstance
    .put("/article/edit/" + article["slug"], getPostData(article))
    .then(response => {
      const message = "Article updated successfully";
      const contentState = convertFromRaw(JSON.parse(response.data.body));
      response.data["body"] = EditorState.createWithContent(contentState);
      dispatch(updateStoreArticle(response.data));
      dispatch(success(message));
      dispatch(editArticle(false));
      dispatch(FetchAction(false));
    })
    .catch(error => {
      console.log(error);
      const message = "Failed to update Article";
      dispatch(failure(message));
      dispatch(FetchAction(false));
    });
};

export const deleteArticle = article_slug => async dispatch => {
  dispatch(deleteAction(true));
  return await axiosInstance
    .delete("/article/delete/" + article_slug)
    .then(response => {
      dispatch(success(response.data.message));
      dispatch(deleteAction(false));
    })
    .catch(error => {
      const message = "Failed to delete Article";
      dispatch(failure(message));
      console.log(error);
    });
};

export const getArticleTags = get => async dispatch => {
  dispatch(FetchAction(true));
  return await axiosInstance
    .get('/article/tags')
    .then(response => {
      // get list of tags from API
      dispatch(updateTagsList(response.data.tags));
      dispatch(FetchAction(false));
    })
    .catch(error => {
      console.log(error);
      dispatch(failure('Failed to get Tags'));
      dispatch(FetchAction(false));
    });
};
