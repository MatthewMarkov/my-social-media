import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.scss';

const PostForm = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="type your post here" name="post" component="textarea" />
      </div>
      <div>
        <button type="submit" className={s.btn}>Add post</button>
      </div>
    </form>
  </div>
);
const PostFormRedux = reduxForm({ form: 'postForm' })(PostForm);

export default PostFormRedux;
