const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted","rejected"],
        message: `{VALUE} is incorrect type `,
      },
    },
  },
  {
    timestamps: true,
  },
);
// componud index - eg - connectionRequest.find({fromUserId : 2737633bbssbsbs, toUserId: 27394784bbdbdbd}) now this find search will become very fast if we are searching with 2 field sthen w ehave put indexes on both fields 
connectionRequestSchema.index({fromUserId:1 , toUserId: 1})

connectionRequestSchema.pre("save", function(){
  const connectionRequest = this ;
  // check if fromuser id is same as toUserID
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannot send connection request to yourself ! ");
  }
  
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel;