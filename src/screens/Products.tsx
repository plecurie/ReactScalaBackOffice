import * as React from "react";
import '../assets/css/Dashboard.css';
import {Button, Form, FormControl, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import ProductDetails from "../components/ProductDetails";
import {NavbarHeader} from "../components/NavbarHeader";


export const Products = () => {

    const [products, setProducts] = useState([]);
    const [last, setLast] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        updateProducts();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    const fetchMoreListItems = () => {
        updateProducts();
        setIsFetching(false);
    };

    const updateProducts = async () => {
        setIsError(false);
        try {

            let last_product = {
                product_name: last
            };

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(last_product)
            };

            const response = await fetch('https://api.prod.scala-patrimoine.fr/products', options);
            const results = await response.json();

            // @ts-ignore
            setProducts(prevState => [...prevState, ...results.data]);
            setLast(results.data[results.data.length - 1]._source.product_name);
        }
        catch(err) {
            setIsError(true);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
            return;
        setIsFetching(true);
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
                        {isFetching && <h1>Fetching more list items...</h1>}
                    </div>
                </div>
            </div>
        </>
    )
};
