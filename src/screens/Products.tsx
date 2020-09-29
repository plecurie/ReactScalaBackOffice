import * as React from "react";
import {useEffect, useState} from "react";
import '../assets/css/Dashboard.css';
import {Button, ListGroup} from "react-bootstrap";
import ProductDetails from "../components/ProductDetails";
import {NavbarHeader} from "../components/NavbarHeader";
import {Skeleton} from "@material-ui/lab";

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

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
            return;
        setIsFetching(true);
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

            const response = await fetch('http://localhost:3100/products', options);
            const results = await response.json();

            if(results.data.length !== 0) {
                // @ts-ignore
                setProducts(prevState => [...prevState, ...results.data]);
                setLast(results.data[results.data.length - 1]._source.product_name);
            }

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
                <h2>Fonds d'investissement disponibles</h2>
                <div>
                    <div className='container'>
                        {isError &&
                            <div className="Dashboard-body">
                                <h4>Une erreur est survenue ...</h4>
                            </div>
                        }
                        <br/>
                        {isFetching
                            ? <Skeleton><Button/></Skeleton>
                            : <ListGroup style={{width: 1200}}>
                                {products.map(product => (
                                    <ProductDetails product={product}/>
                                ))}
                            </ListGroup>
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
