import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    full_url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    qr_code: {
      type: String,
      required: false,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    expires_at: {
      type: Date,
    },
    is_privete: {
      type: Boolean,
      default: false,
    },
    open_graph_data: {
      title: String,
      description: String,
      image: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const urlSchema = mongoose.model("shortUrl", shortUrlSchema);

export default urlSchema;
