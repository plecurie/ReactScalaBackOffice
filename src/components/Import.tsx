import React from "react";
import '../assets/css/Import.css';
// @ts-ignore
import 'react-drop-zone/dist/styles.css'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Carousel, Jumbotron} from "react-bootstrap";
import {NavbarHeader} from "./NavbarHeader";
import Dropzone from "react-dropzone";


export const Import = () => {

    const submit = () => {
        axios
            .post("http://localhost:8000/upload", "file")
            .then(() => {
                toast.success('upload succeeded')
            })
            .catch(() => {
                toast.error('upload failed')
            })
    };

    const dropContractsFile = (d: any) => {
        console.log(d);
    };

    const dropProductsFile = (d: any) => {
        console.log(d);
    };

    const dropBuylistsFile = (d: any) => {
        console.log(d);
    };

    return (
        <div>
            <NavbarHeader/>
            <head className="Import-head"><title>Importing a new database.</title></head>
            <div className="Import-body">
                <Carousel style={{minWidth: 300, maxWidth: 500, maxHeight: 500, margin: 'auto'}}>
                    <Carousel.Item>
                        <h4>Select a Products file</h4>
                        <Jumbotron style={{width:'300px', margin:'50px'}}>

                            <Dropzone onDrop={dropProductsFile} accept={['.csv',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-excel']}>
                                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragReject ? "File type not accepted, sorry!" : 'Click here or drop a file to upload!'}
                                    </div>
                                )}
                            </Dropzone>
                        </Jumbotron>
                        <br/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <h4>Select a Contracts file</h4>
                        <Jumbotron style={{width:'300px', margin:'50px'}}>
                            <Dropzone onDrop={dropContractsFile} accept={['.csv',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-excel']}>
                                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragReject ? "File type not accepted, sorry!" : 'Click here or drop a file to upload!'}
                                    </div>
                                )}
                            </Dropzone>
                        </Jumbotron>
                        <br/>
                    </Carousel.Item>

                    <Carousel.Item>
                        <h4>Select a Buylists file</h4>
                        <Jumbotron style={{width:'300px', margin:'50px'}}>
                            <Dropzone onDrop={dropBuylistsFile} accept={['.csv',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-excel']}>
                                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragReject ? "File type not accepted, sorry!" : 'Click here or drop a file to upload!'}
                                    </div>
                                )}
                            </Dropzone>
                        </Jumbotron>
                        <br/>
                    </Carousel.Item>

                    <Carousel.Item >
                        <h4>Confirm the upload.</h4>
                        <br/>
                        <Button className={'button'} onClick={() => submit()}>Submit</Button>
                        <br/><br/><br/>
                    </Carousel.Item>

                </Carousel>
                <br/>
                <ToastContainer/>
            </div>
        </div>

    );
};
