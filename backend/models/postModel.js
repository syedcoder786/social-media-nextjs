import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ref is required"],
      ref: "User",
    },
    title: {
        type: String,
        // required: true,
    },
    post_url: {
        category:{
            type:String,
            // required: true,
        },
        url:{
            type:String,
            // required: true,
        }
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "User ref is required"],
          ref: "User",
          unique: true
        }
      }
    ],
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            // required: [true, "User ref is required"],
            ref: "User",
          },
          comment:{
              type:String,
              // required: [true, "Comment is required"],
          },
          time : { type : Date, default: Date.now }
        }
      ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;