import React, {useState} from "react";
import {Badge, Button, Alert, Table} from "react-bootstrap";

// @ts-ignore
const Contract = ({ contract }) => {

    const [show, setShow] = useState(false);

    return (
        <>

        <Alert show={show} variant="info" style={{width: 750}}>
            <Alert.Heading>
                <Badge style={{width: 200}} variant="light">{contract._source.contract_name}</Badge>
            </Alert.Heading>
            <br/>
            <Table responsive>
                <tbody>
                    <tr>
                        <th>Frais Fonds Euro</th>
                        <td>
                            {contract._source.euro_fees} %
                        </td>
                    </tr>
                    <tr>
                        <th>Frais Fonds UC</th>
                        <td>
                            {contract._source.uc_fees} %
                        </td>
                    </tr>
                    <tr>
                        <th>Buylist:</th>
                        <ul>
                        {contract._source.products.map((product: any) => (
                            <li>{product.isincode}</li>
                        ))}
                        </ul>
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
        <Button key={contract._id} value={contract} variant="outline-success" onClick={() => setShow(true)}>
            <h3> {contract._source.contract_name}</h3>
        </Button>
    }
    </>

)
};

export default Contract
