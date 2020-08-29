import React, {useEffect, useState} from "react";
import {Badge, Button, Alert} from "react-bootstrap";
import Contract from "./Contract";
import Criteria from "./Criteria";

// @ts-ignore
const ProductDetails = ({ product }) => {

    const [show, setShow] = useState(false);
    const [details, setDetails] = useState();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async() => {
        try {
            const response = await fetch('https://api.prod.scala-patrimoine.fr/products/'+ product._source.isincode, {method: 'GET'});
            const results = await response.json();
            await setDetails(results.data[0]);
        }
        catch(err) {
            setIsError(true);
        }
    };

    return (
        <>
            {isError &&
                <div className="Dashboard-body">
                    <div>Something went wrong ...</div>
                </div>
            }

            {details !== undefined &&
            <Alert show={show} variant="info" style={{width: 750}}>
                <Alert.Heading>
                    <Badge variant="light">{details._source.isincode}</Badge>
                </Alert.Heading>
                <h3>Product name: {details._source.product_name}</h3>
                <h3>Firm name: {details._source.firm_name}</h3>
                <h3>Category: {details._source.category}</h3>
                <h3>Ongoing charge: {details._source.ongoingcharge}</h3>
                <h3>
                    Contracts : {details._source.contracts.map((contract: any) => (
                        <Contract contract={contract}/>
                    ))}
                </h3>
                <h3>
                    Criteria : {details._source.criteria.map((criteria: any) => (
                        <Criteria criteria={criteria}/>
                    ))}
                </h3>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
                        Close
                    </Button>
                </div>
            </Alert>
            }

            {!show &&
                <Button key={product._id} value={product} variant="outline-success" onClick={() => setShow(true)}>
                    <h3> {product._source.isincode}</h3>
                    <h3> {product._source.product_name}</h3>
                    <h3> {product._source.firm_name}</h3>
                </Button>
            }
            <br/>
        </>

    )
};

export default ProductDetails
