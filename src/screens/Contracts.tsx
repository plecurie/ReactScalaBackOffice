import * as React from "react";
import {NavbarHeader} from "../components/NavbarHeader";
import '../assets/css/Dashboard.css';
import {useState} from "react";
import {useEffect} from "react";
import {ListGroup} from "react-bootstrap";
import Contract from "../components/Contract";

export const Contracts = () => {

    const [contracts, setContracts] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        updateContracts();
    }, []);

    const updateContracts = async () => {
        setIsError(false);
        try {

            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            };

            const response = await fetch('https://api.prod.scala-patrimoine.fr/contracts', options);
            const results = await response.json();

            setContracts(results.data);

        }
        catch(err) {
            setIsError(true);
        }
    };

    return (
        <>
            <NavbarHeader/>
            <div className="Dashboard-body">
                <br/>
                <h2>Contrats disponibles</h2>
                <div>
                    <div className='container'>
                        {isError &&
                        <div className="Dashboard-body">
                            <h4>Une erreur est survenue ...</h4>
                        </div>
                        }
                        <br/>
                        <ListGroup style={{width: 750}}>
                            {contracts.map(contract => (
                                <Contract contract={contract}/>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </div>
        </>
    )

};
