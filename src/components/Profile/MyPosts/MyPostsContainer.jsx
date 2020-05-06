import React from 'react';
import {addPost} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};


const myPostsContainer = connect (mapStateToProps, {addPost}) (MyPosts);

export default myPostsContainer;