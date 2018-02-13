import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types } = mongoose.Schema;

const listOfUsers = [{ type: Types.ObjectId, ref: 'User' }];

export default function historyModel() {
  const schema = new Schema({
    user: {
      type: Types.ObjectId, ref: 'User', required: true, index: true,
    },
    playlist: { type: Types.ObjectId, ref: 'Playlist' },
    item: { type: Types.ObjectId, ref: 'PlaylistItem' },
    media: {
      media: { type: Types.ObjectId, ref: 'Media', required: true },
      artist: { type: String, index: true },
      title: { type: String, index: true },
      start: { type: Number, default: 0 },
      end: { type: Number, default: 0 },
    },
    playedAt: { type: Date, default: Date.now, index: true },
    upvotes: listOfUsers,
    downvotes: listOfUsers,
    favorites: listOfUsers,
  }, {
    collection: 'historyentries',
    minimize: false,
  });

  return (uw) => {
    uw.mongo.model('History', schema);
  };
}
