import React, {useEffect, useState} from "react";
import {Badge, Button, Alert, Table} from "react-bootstrap";

// @ts-ignore
const ProductDetails = ({ product }) => {

    const [isFetching, setIsFetching] = useState(false);
    const [details, setDetails] = useState();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchDetails();
    }, [isFetching]);

    const fetchDetails = async() => {
        try {
            if (isFetching) {
                const response = await fetch('https://api.prod.scala-patrimoine.fr/products/'+ product._source.isincode, {method: 'GET'});
                const results = await response.json();
                await setDetails(results.data[0]);
            }
        }
        catch(err) {
            setIsError(true);
        }
    };

    const handleClick = () => {
        isFetching ? setIsFetching(false) : setIsFetching(true);
    };

    return (
        <>
            {isError &&
                <div className="Dashboard-body">
                    <h4>Une erreur est survenue ...</h4>
                </div>
            }

            {!isFetching &&
                <Button key={product._id} value={product} variant="outline-success" onClick={handleClick}>
                    <h3> {product._source.isincode}</h3>
                    <h3> {product._source.product_name}</h3>
                </Button>
            }

            {details &&
                <Alert show={isFetching} variant="info" style={{width: 1200}}>
                    <Alert.Heading>
                        <Badge style={{width: 200}} variant="light">{details._source.isincode}</Badge>
                    </Alert.Heading>
                    <br/>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <th>Nom :</th>
                                <td>{details._source.product_name}</td>
                            </tr>
                            <tr>
                                <th>Firme :</th>
                                <td>{details._source.firm_name}</td>
                            </tr>
                            <tr>
                                <th>Catégorie globale :</th>
                                <td>{details._source.category}</td>
                            </tr>
                            <tr>
                                <th>Frais en cours :</th>
                                <td>{details._source.ongoingcharge}</td>
                            </tr>
                            <tr>
                                <th>Contrats :</th>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Frais Fonds Euro</th>
                                            <th>Frais UC</th>
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
                                <th>Critères :</th>
                                <td>
                                    <ul>
                                        {details._source.criteria.map((obj: any) => (
                                            <li><strong>{obj.familyName}</strong><br/>{obj.name} : <strong>{obj.value}</strong></li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleClick} variant="outline-success">
                            Fermer
                        </Button>
                    </div>
                </Alert>
            }
            <br/>
        </>

    )
};

export default ProductDetails
