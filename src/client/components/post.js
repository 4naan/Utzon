import React from "react";

function Component(props) {

    var jsonData =
    {
        "house": {
            "houseId": props.houseId,
            "listedBuyPrice": props.listedBuyPrice,
            "trueBuyPrice": props.trueBuyPrice,
            //"trueFYCost": props.trueFYCost,
            "savedDeposit": props.savedDeposit,
            //requiredDeposit: props.requiredDeposit,
            "dwellingType": props.dwellingType,
            "residentType": props.residentType,
            "conditionLevel": props.conditionLevel,
            "stateLocation": props.stateLocation,
            //landTax: props.landTax,
            //lendersMI: props.lendersMI
        }
    };

    function handleClick() {

        // Send data to the backend via POST
        fetch('http://localhost:3000/save', {  // Enter your IP address here

            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(jsonData), // body data type must match "Content-Type" header
            headers: { "Content-Type": "application/json" }
        })

    }

    return (
        <button onClick={handleClick} style={{
            textAlign: 'center',
            width: '100px',
            border: '1px solid gray',
            borderRadius: '5px'
        }}>
            Send data to backend
        </button>
    );

}

export { Component };