import React, {useEffect, useState} from "react";
import {Badge, Button, Alert, Table} from "react-bootstrap";
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
                <Table responsive>
                    <tbody>
                        <tr>
                            <th>Product_name:</th>
                            <td>{details._source.product_name}</td>
                        </tr>
                        <tr>
                            <th>Firm_name:</th>
                            <td>{details._source.firm_name}</td>
                        </tr>
                        <tr>
                            <th>Global_Category:</th>
                            <td>{details._source.category}</td>
                        </tr>
                        <tr>
                            <th>Ongoing_charge:</th>
                            <td>{details._source.ongoingcharge}</td>
                        </tr>
                        <tr>
                            <th>Contracts:</th>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Frais_Fonds_Euro</th>
                                        <th>Frais_UC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {details._source.contracts.map((contract: any) => (
                                    <tr>
                                        <td>{contract.name}</td>
                                        <td>{contract.euro_fees}</td>
                                        <td>{contract.uc_fees}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </tr>
                        <tr>
                            <th>Criteria:</th>
                            {details._source.criteria.map((criteria: any) => (
                                <td>
                                    <Criteria criteria={criteria}/>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
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
                </Button>
            }
            <br/>
        </>

    )
};

export default ProductDetails
