import { model } from "mongoose";

// Virtuals :
import { age_virtual, userName_virtual } from "./Virtuals/User.virtuals.js";

// User Schema :
import userSchema from "./Schema/User.schema.js";

// Hooks Funcs :
import {
  post_findOneAndDelete,
  pre_findOneAndUpdate,
  pre_save,
} from "./Hooks/User.hooks.js";

// Virtuals :

/* Full Name */
userSchema.virtual("userName").get(userName_virtual);

/* BirthDate */
userSchema.virtual("birthDate").set(age_virtual);

// userSchema.virtual("allPosts", {
//   ref: "post",
//   localField: "_id",
//   foreignField: "owner",
// });

// Hooks :

/* Pre Save */
userSchema.pre("save", pre_save);

/* Pre Update */
userSchema.pre("findOneAndUpdate", pre_findOneAndUpdate);

/* Post Delete */
userSchema.post("findOneAndDelete", post_findOneAndDelete);

// Model Definetion :
const User = model("User", userSchema);

export default User;
