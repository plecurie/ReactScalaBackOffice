import * as React from "react";
import '../assets/css/Dashboard.css';
import {Button, Form, FormControl, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import ProductDetails from "../components/ProductDetails";
import {NavbarHeader} from "../components/NavbarHeader";


export const Products = () => {

    const [products, setProducts] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        updateProducts();
    }, []);

    const updateProducts = async () => {
        setIsError(false);
        try {
            const response = await fetch('https://api.prod.scala-patrimoine.fr/products', {method: 'POST'});
            const results = await response.json();
            setProducts(results.data);
        }
        catch(err) {
            setIsError(true);
        }
    };

    return (
        <>
            <NavbarHeader/>
            {isError &&
                <div className="Dashboard-body">
                    <div>Something went wrong ...</div>
                </div>
            }
            <div className="Dashboard-body">
                <br/>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <br/>
                <h2>All available funds</h2>
                <br/>
                <div>
                    <div className='container'>
                        <ListGroup style={{width: 750}}>
                            {products.map(product => (
                                <ProductDetails product={product}/>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </div>
        </>
    )
};
