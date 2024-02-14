import asyncHandler from "express-async-handler";

import Post from "../models/postModel.js";


const addPost = asyncHandler(async (req, res) => {

  // const socket = req.app.get("socket");
  // socket.emit(customerId, { test: "something" });


  try {
    let newPost = await Post.create({
      user: req.user.id,
      title: req.body.title,
      post_url: req.body.post_url,
    });

    // console.log(newPost);

    // await newPost
    //         .populate("user", { email:0, password: 0 })
    //         .populate("likes.user", { email:0, password: 0 })
    //         .populate("comments.user", { email:0, password: 0 })

    let onePost = await Post.findById(newPost._id)
            .populate("user", { email:0, password: 0 })
            .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })


    // if(newPost.likes){
    //   await newPost.likes.map(oneLike => {
    //     oneLike.populate("user")
    //   })
    // }

    // if(newPost.comments){
    //   await newPost.comments.map(oneComment => {
    //     oneComment.populate("user")
    //   })
    // }

    // console.log(onePost);

    return io.emit("addPost", onePost) // broadcast

    res.status(200).json(onePost);
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});


const addLike = asyncHandler(async (req, res) => {

  try {
    const index = req.body.index

    const likes = 
        await Post.find( { $and: [
          {_id: req.body.id},
          {"likes.user": req.user.id}
        ]})

    // console.log("check")

    // console.log(likes)

    if(likes.length > 0){

        await Post.findOneAndUpdate(
          { _id: req.body.id }, 
          { $pull: { likes: {user: req.user.id} } }
        );

        const pulldata = await Post.find({ _id: req.body.id })
              .populate("user", { email:0, password: 0 })
              .populate("likes.user", { email:0, password: 0 })
              .populate("comments.user", { email:0, password: 0 })

        console.log("Already liked")
        return res.status(200).json({data: pulldata[0], isLike: false, index})
    }

    await Post.findOneAndUpdate(
      { _id: req.body.id }, 
      { $addToSet: { likes: {user: req.user.id} } }
    );

    const data = await Post.findOne({ _id: req.body.id })
            .populate("user", { email:0, password: 0 })
            .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })

      // console.log(data)
    res.status(200).json({data: data, isLike: true, index});
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});


const addComment = asyncHandler(async (req, res) => {

  try {
    const index = req.body.index

    await Post.findOneAndUpdate(
      { _id: req.body.id }, 
      { $addToSet: { comments: {user: req.user.id, comment: req.body.comment} } }
    );

    const data = await Post.findOne({ _id: req.body.id })
            .populate("user", { email:0, password: 0 })
            .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })

      // console.log(data)
    res.status(200).json({data: data, index});
  } catch (e) {
    res.status(400).json({message:e})
    console.log(e);
  }

});

const fetchPosts = asyncHandler(async (req, res) => {
    try {
      const { page, limit } = req.body
      // console.log(page)
      // console.log(limit)
      const pageno = Number(page)
      const limitno = Number(limit)

        const postItems = await Post
            .find()
            .skip(limitno*pageno) //check for Number
            .limit(limitno) // check for Number
            .sort("-createdAt")
            // .slice('comments', 3) // for first 3 comments
            .populate("user", { email:0, password: 0 })
            .populate("likes.user", { email:0, password: 0 })
            .populate("comments.user", { email:0, password: 0 })
            
    
            // await newPost.populate("user", { email:0, password: 0 });

            // postItems.map(async (onePost) => {
            //   if(onePost.likes){
            //     await onePost.likes.map(oneLike => {
            //       oneLike.populate("user", { email:0, password: 0 })
            //     })
            //   }
          
            //   if(onePost.comments){
            //     await onePost.comments.map(oneComment => {
            //       oneComment.populate("user", { email:0, password: 0 })
            //     })
            //   }
            // })
            
        // console.log("post items")
        // console.log(postItems);
        res.status(200).json(postItems);
    } catch (error) {
        console.log(error)
        res.status(400)
    }

});

export {
  addPost,
  addLike,
  addComment,
  fetchPosts,
};
