import {NavbarHeader} from "../components/NavbarHeader";
import '../assets/css/Dashboard.css';
import * as React from "react";
import {Button, Col, FormGroup, ListGroup} from "react-bootstrap";
import {useState} from "react";
import {useEffect} from "react";
import ProductDetails from "../components/ProductDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {TextField} from "@material-ui/core";


export const Explorer = () => {

    const [products, setProducts] = useState([]);
    const [input, setInput] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        updateProducts();
    }, [input]);

    useEffect(() => {
        if (!isFetching) return;
        fetchListItems();
    }, [isFetching]);

    const fetchListItems = () => {
        updateProducts();
        setIsFetching(false);
    };

    const updateProducts = async() => {
        try {
            if (isFetching) {
                const response = await fetch('https://api.prod.scala-patrimoine.fr/products/suggest/'+ input, {method: 'GET'});
                const results = await response.json();
                if (results.data[0].length !== 0) {
                    // @ts-ignore
                    setProducts(prevState => [...prevState, ...results.data]);
                }
            }
        }
        catch(err) {
            setIsError(true);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsFetching(true);
    };

    return (
        <>
            <NavbarHeader/>
            <div className="Dashboard-body">
                <br/>
                <Form inline>
                    <Form.Group>
                        <Form.Row className="align-items-center">
                            <Col sm={7}>
                                <TextField id="outlined-basic" label="Entrer code ISIN" type="search" variant="outlined" onChange={(e) => setInput(e.target.value)}/>
                            </Col>
                            <Col xs="auto">
                                <Button variant="info" color="secondary" type="submit" size='lg' onClick={(e: any) => handleSubmit(e)}>Rechercher</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
                {isError &&
                    <div className="Dashboard-body" style={{marginLeft: window.innerWidth - window.innerWidth /2}}>
                        <h4>Une erreur est survenue ...</h4>
                    </div>
                }

                {products.length !== 0 &&
                    <ListGroup style={{width: 1200}}>
                        {products.map(product => (
                            <ProductDetails product={product}/>
                        ))}
                    </ListGroup>
                }
            </div>
        </>
    )
};
