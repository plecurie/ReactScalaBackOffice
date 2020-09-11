import React from "react";

// @ts-ignore
const Contract = ({ contract }) => {
    return (
        <>
            <td>{contract.name}</td>
            <td>{contract.euro_fees}</td>
            <td>{contract.uc_fees}</td>
        </>
    )
};

export default Contract
