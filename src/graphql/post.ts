import gql from "graphql-tag";

const ADD_POST = gql`
  mutation addPost($post: AddPostInput!){
    addPost(Post: $post){
      title,
      _id
    }
  }
`;

const GET_POSTS = gql`
  query getPosts{
    fetchAllPost{
        title,
        _id
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($postID: Float!, $post: AddPostInput!){
      updatePost(PostID: $postID, Post: $post){
        title,
        _id
      }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postID: Float!){
    deletePost(PostID: $postID)
  }
`;

export {ADD_POST, GET_POSTS, UPDATE_POST, DELETE_POST}