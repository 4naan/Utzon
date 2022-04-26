
import React, { useState } from "react";
import { Component } from "./post.js";
import { addRateList } from "./AddRemoveList.js"
import { vowelDetector } from "./VowelDetector"
import { landTax } from "./landTax"
import { v4 as uuidv4 } from 'uuid';


//rounds to 2? not entirely accurate - update one day
function roundToTwo(num) {
	return +(Math.round(num + "e+2") + "e-2");
}

//Render Component
function ExampleComponent() {
	const houseId = uuidv4();
	const [listedBuyPrice, setBuyPrice] = useState("");
	const [savedDeposit, setDeposit] = useState("");
	const [state, setstate] = useState("");
	const [dwellingType, setDwellingType] = useState("");
	const [conditionLevel, setConditionLevel] = useState("");
	const [bodyCorp, setBodyCorp] = useState("");
	const [sinkingFund, setSinkingFund] = useState("");
	const [residentType, setResidentType] = useState("");
	const handleResidentType = (e) => {
		setResidentType(e.target.value)
	};
	const handleBodyCorp = (e) => {
		setBodyCorp(e.target.value)
	};
	const handleSinkingFund = (e) => {
		setSinkingFund(e.target.value)
	};
	const changeConditionLevel = (e) => {
		setConditionLevel(e.target.value);
		//document.getElementById("listed-costs-ul").appendChild(conditionQuality); <= not sure what this is an attempt at
	}
	const changeDwellingType = (e) => {
		setDwellingType(e.target.value);
		strataBoolean = (e.target.value !== "House") ? true : false;
	}
	const handleChangeBuyPrice = (e) => {
		setBuyPrice(roundToTwo(e.target.value));
		landTaxValue = landTax(e.target.value);
		console.log(landTaxValue, e.target.value);
	}
	const handleChangeDeposit = (e) => {
		setDeposit(roundToTwo(e.target.value));
	}
	const handleStatesFound = (e) => {
		setstate(e.target.value)
	};
	const possibleCosts = [""]; //not sure what this is


	const stateStamp = { VIC: 0.07, QLD: 0.025, NSW: 0.05, WA: 0.05, SA: 0.05, ACT: 0.05, NT: 0.05, "": 0 };
	const stateList = ["VIC", "QLD", "NSW", "WA", "SA", "ACT", "NT"];
	let statesFound = stateList.filter(states => states !== state);
	const selectorElement = () => {
		if (state === "") {
			return <option value="">Please Select</option>
		} else {
			return <option value={state}>{state}</option>
		}
	}

	//LIST OF VARIABLES
	//savedDeposit

	let landTaxValue = 0;
	let strataBoolean = false;
	let LVR = savedDeposit / listedBuyPrice;
	//lenders mortgage insurance created from reverse-engineering an online calculator//needs to one day be accurately described by an actual lender 
	let LMI = (LVR >= 0.2) ? 0 : (listedBuyPrice > 1200000) ? (-593.94 * LVR ** 4 + 282.12 * LVR ** 3 - 45.64 * LVR ** 2 + 2.581 * LVR) * listedBuyPrice : // 1.2M-2M
		(listedBuyPrice > 800000) ? (-586.62 * LVR ** 4 + 274.67 * LVR ** 3 - 43.812 * LVR ** 2 + 2.4435 * LVR) * listedBuyPrice : //900K-1.1M
			(-418.55 * LVR ** 4 + 199.45 * LVR ** 3 - 32.426 * LVR ** 2 + 1.841 * LVR) * listedBuyPrice; //0-800K
	LMI = Math.round(LMI);
	let repairState = (listedBuyPrice < 0) ? 0 : (conditionLevel === "Unsalvagable") ? listedBuyPrice * 0.4 : (conditionLevel === "Poor") ? listedBuyPrice * 0.1 : (conditionLevel === "Average") ? listedBuyPrice * 0.025 : 0;
	let trueBuyPrice = listedBuyPrice + LMI + repairState + landTaxValue;//stampDutyCost +
	let stampDutyCost = roundToTwo(stateStamp[state] * trueBuyPrice);
	//END LIST OF VARIABLES


	return (<>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">UTZON</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div class="navbar-nav">
						<a class="nav-link" href="#">Quick Calculate</a>
						<a class="nav-link" href="/">Add Home</a>
						<a class="nav-link" href="#">Analysis</a>
						<a class="nav-link" href="/propertylist">Account</a>
					</div>
				</div>
			</div>
		</nav>
		<h2>Search for the property</h2>
		<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
		<button class="btn btn-outline-success" type="submit">Search</button>
		<h3>or</h3>
		<div class="container-fluid">
			<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="saleDepositEntry listedCostsEntry">Add Manually</button>
			<div class="row">
				<div class="col">
					<div class="row">
						<div class="collapse multi-collapse" id="saleDepositEntry">
							<div class="card card-body">
								<p>I am looking to purchase <span>{vowelDetector(dwellingType)}</span> <select value={dwellingType} onChange={changeDwellingType}>
									<option value='House'>House</option>
									<option value='Unit'>Unit</option>
									<option value='Apartment'>Apartment</option>
									<option value='Town House'>Town House</option>
								</select>, for the purposes of
									<select value={residentType} onChange={handleResidentType}>
										<option>Owner Occupation</option>
										<option>Investment Property</option>
									</select>. The property is in <span>{vowelDetector(conditionLevel)}</span> <select value={conditionLevel} onChange={changeConditionLevel}>
										<option value="Perfect">Perfect</option>
										<option value="Good">Good</option>
										<option value="Average">Average</option>
										<option value="Poor">Poor</option>
										<option value="Unsalvagable">Unsalvagable</option>
									</select> condititon.
								</p>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col">
							<div class="collapse multi-collapse" id="multiCollapseExample2">
								<div class="card card-body">
									<p>
										This property is listed at the price of <input min="0" step="0.01" id="listedBuyPrice" type="number" value={listedBuyPrice} onChange={handleChangeBuyPrice} />
										, and located in the state of <select id="States" value={state} onChange={handleStatesFound}>
											{selectorElement()}
											{statesFound.map(s => {
												return <option value={s}>{s}</option>
											})}
										</select >.
										I have a deposit of <input min="0" step="0.01" id="savedDeposit" type="number" value={savedDeposit} onChange={handleChangeDeposit} />.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="collapse multi-collapse" id="listedCostsEntry">
						<div class="card card-body" id="add-rate-list">
							<ul id="listed-costs-ul">
								<li className="itemised-costs">
									<select>
										<option>Council Rates</option>
										<option>Strata fees</option>
									</select>
									<input placeholder="Enter amount per month"></input>
									{strataBoolean &&
										<><li className="itemised-costs">
											<span>Body Corporate Admin</span>
											<select>
												<option>Quarterly</option>
												<option>Annual</option>
											</select>
											<input placeholder={"~$" + Math.round(listedBuyPrice * 0.00307)}
												value={bodyCorp} onChange={handleBodyCorp}></input></li>
											<li className="itemised-costs">
												<span>Sinking Fund</span>
												<select>
													<option>Quarterly</option>
													<option>Annual</option>
												</select>
												<input placeholder={"~$" + Math.round(listedBuyPrice * 0.001107)}
													value={sinkingFund} onChange={handleSinkingFund}></input></li></>}
								</li>
								{conditionLevel === "Unsalvagable" && listedBuyPrice > 0 &&
									<li><span>Repairs: ${repairState}</span></li>}
								{conditionLevel === "Poor" && listedBuyPrice > 0 &&
									<li><span>Repairs: ${repairState}</span></li>}
								{conditionLevel === "Average" && listedBuyPrice > 0 &&
									<li><span>Repairs: ${repairState}</span></li>}
							</ul>
							<button onClick={addRateList}>+ Add Cost</button>
						</div>
					</div>
				</div>
			</div>
		</div >
		<div class="container-fluid">
			<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".calculate-me" aria-expanded="false" aria-controls="trueCostDisplay">Calculate True Cost</button>
			<div class="row collapse calculate-me" id="trueCostDisplay">
				<div class="col">
					<svg
						width="350"
						height="350"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<div class="col">
					<h3>Real cost of property</h3>
					<ul>
						<li>Current Deposit: ${savedDeposit}</li>
						{LVR < 0.2 && LVR > 0.09 && <li>Lender's Mortgage Insurance (LMI): ${LMI}</li>}
						{strataBoolean &&
							<><li>Strata Admin: ${bodyCorp}</li>
								<li>Sinking Fund: ${sinkingFund}</li></>}
						<li>Water Rates: $600</li>
						<li>Council Rates: $700</li>
						<li>Land Tax: ${landTaxValue}</li>
						{state !== "" && listedBuyPrice > 0 && <li>Stamp Duty: ${stampDutyCost}</li>}
						<li>Pest Inspection: $450</li>
						<li>Building Inspection: $500</li>
						<li>Repairs and Renovations: ${repairState}</li>
					</ul>
					<h4>Buy price: ${trueBuyPrice}</h4>
					<h4>Real first year cost: ${trueBuyPrice}</h4>
					<h5>20% deposit: ${Math.round(trueBuyPrice * 0.2)}</h5>
					{Math.round(trueBuyPrice * 0.2) >= savedDeposit && <>
						<h5><span style={{ opacity: 0, height: 0 }}>20% Deposit:</span>-${savedDeposit}</h5>
						<h5>Difference remaining: ${Math.round(trueBuyPrice * 0.2 - savedDeposit)}</h5></>}
				</div>
			</div>
		</div>
		<Component
			houseId={houseId}
			listedBuyPrice={listedBuyPrice}
			trueBuyPrice={trueBuyPrice}
			trueFYCost={trueBuyPrice}
			savedDeposit={savedDeposit}
			dwellingType={dwellingType}
			residentType={residentType}
			conditionLevel={conditionLevel}
			stateLocation={state} /></>);
}
export default ExampleComponent;

/*listedBuyPrice: Number,
	trueBuyPrice: Number,
	trueFYCost: Number,
	savedDeposit: Number,
	requiredDeposit: Number,
	housingType: String,
	residentType: String,
	propertyCondition: String,
	stateLocation: String,
	costFYBreakdown: [],
	landTax: Number,
	lendersMI: Number*/