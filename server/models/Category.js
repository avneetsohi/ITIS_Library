const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});


module.exports = mongoose.model("Category", categorySchema);
