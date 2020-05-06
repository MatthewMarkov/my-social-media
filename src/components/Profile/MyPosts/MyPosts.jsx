import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form'



 const MyPosts = (props) => {
    let addPost = (value) => {
        props.addPost(value.post);
    };
    let postsElements = props.posts.map ( p => <Post message={p.message} like={p.likesCount}/> );
    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <PostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

};

 let PostForm = (props) => {
     return (
         <div >
             <form onSubmit={props.handleSubmit}>
             <div>
                <Field name={"post"} component={"textarea"}/>
             </div>
             <div>
                 <button>Add post</button>
             </div>
             </form>
         </div>
     )
 };
 let PostFormRedux = reduxForm ({form: "postForm"})(PostForm);

export default MyPosts;