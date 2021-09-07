// --------------------------------------------------------------------------
// Include required modules
// ---------------------------------------------------------------------------
let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// --------------------------------------------------------------------------
// Define data collection
// ---------------------------------------------------------------------------
let dataSchema = new Schema(
{
    event: { type: String,
enum: [
'start',
'finish'
] },
    horse: { type: Object },
    time: { type: Number }
},
{ timestamps: true }
)

// --------------------------------------------------------------------------
// Export the data model
// ---------------------------------------------------------------------------
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'data'.
let data = mongoose.model('data', dataSchema);
module.exports = {
  data
}