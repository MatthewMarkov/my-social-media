import React from 'react';
import { connect } from 'react-redux';
import Post from './Post/Post';
import s from './MyPosts.module.scss';
import PostFormRedux from './AddPostForm';

const MyPosts = (props) => {
  const addUserPost = (value) => {
    props.ActionCreators.addPost(value.post);
  };
  const postsElements = props.posts.map((p) => <Post message={p.message} like={p.likesCount} />);
  return (
    <div className={s.postBlock}>
      {props.isOwner
        ? <div className={s.myPosts}>My posts</div>
        : <div className={s.myPosts}>User posts</div>}
      {props.isOwner && <PostFormRedux onSubmit={addUserPost} />}
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.profilePage.posts,
  newPostText: state.profilePage.newPostText,
  ActionCreators: state.profilePage.ActionCreators,
});

export default connect(mapStateToProps, null)(MyPosts);
