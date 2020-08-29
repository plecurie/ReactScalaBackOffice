import React from "react";

// @ts-ignore
const Contract = ({ contract }) => {
    return (
        <>
            <h3>
                <h4>Name: {contract.name}</h4>
                <h4>Euro fees: {contract.euro_fees}</h4>
                <h4>UC fees: {contract.uc_fees}</h4>
            </h3>
        </>
    )
};

export default Contract
