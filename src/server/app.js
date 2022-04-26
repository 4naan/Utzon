const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const STATIC_ASSETS_PATH = path.resolve(`${__dirname}/../../static`);
const mongoose = require('mongoose');
const bodyParser = require('body-parser')



main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://localhost:27017/UtzonWeb')
	try {
		console.log("success")
	} catch {
		console.log("fail")
	}
}

const savedPropertySchema = new mongoose.Schema({
	houseId: String,
	listedBuyPrice: Number,
	trueBuyPrice: Number,
	trueFYCost: Number,
	savedDeposit: Number,
	requiredDeposit: Number,
	dwellingType: String,
	residentType: String,
	propertyCondition: String,
	stateLocation: String,
	//costFYBreakdown: [],
	landTax: Number,
	lendersMI: Number
})
const SavedProperty = mongoose.model('SavedProperty', savedPropertySchema);

// Serve front end assets which have been built by webpack
app.use("/static", express.static(STATIC_ASSETS_PATH));
app.get("*", (request, response) => {
	response.sendFile(path.resolve('./src/client', 'index.html'))
});

app.use(bodyParser.json())

app.post('/save', async (request, response) => {
	try {
		console.log(request.body);      // your JSON
		response.send(request.body);    // echo the result back
		const NewHouse = new SavedProperty({
			houseId: request.body.house.houseId,
			listedBuyPrice: request.body.house.listedBuyPrice,
			trueBuyPrice: request.body.house.trueBuyPrice,
			//trueFYCost: request.body.house.trueFYCost,
			dwellingType: request.body.house.dwellingType,
			savedDeposit: request.body.house.savedDeposit,
			residentType: request.body.house.residentType,
			conditionLevel: request.body.house.conditionLevel,
			stateLocation: request.body.house.stateLocation
		})
		const ret = await NewHouse.save()
	} catch (error) {
		console.error(error);
	}
});

app.post('/propertylist', async (req, res) => {
	try {
		const findResult = await mongoose.savedproperties.find();
		console.log(findResult);
	} catch (error) {
		console.error(error);
	}
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`))

