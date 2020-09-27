import React, {useState} from 'react';
import {NavbarHeader} from "../components/NavbarHeader";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Paper, StepContent, StepLabel, Step, Stepper} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {Button, Jumbotron} from "react-bootstrap";
import Dropzone from "react-dropzone";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {ColorlibConnector, ColorlibStepIcon} from "../components/IconStepper";
import Instructions from "../components/Instructions";
import {excelService} from "../services/Excel.service";

// @ts-ignore
import readXlsxFile from 'read-excel-file'

const useStyles = makeStyles((theme) => ({
    root: {

        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ["Instructions", "Fonds d'investissement", "Contrats", "Buylists"];
}

export const Import = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);
    const steps = getSteps();
    const [productsFile, setProductsFile]= useState();
    const [contractsFile, setContractsFile]= useState();
    const [buylistsFile, setBuylistsFile]= useState();
    const [missingProductHeaders, setMissingProductHeaders]= useState([]);
    const [missingContractHeaders, setMissingContractHeaders]= useState([]);
    const [missingBuylistHeaders, setMissingBuylistHeaders]= useState([]);
    const [show, setShow]=useState(false);

    const onProductsDrop = (files: any) => {
        readXlsxFile(files[0]).then((rows: any) => {
            const headers : any[] = excelService.verifyHeaders(rows[0], "products");
            if(headers.length !== 0){
                // @ts-ignore
                setMissingProductHeaders(headers);
                setShow(true);
            }
            else {
                setShow(false);
                setProductsFile(files[0]);
                setCompleted(true);
            }
        });
    };

    const onContractsDrop = (files: any) => {
        readXlsxFile(files[0]).then((rows: any) => {
            const headers : any[] = excelService.verifyHeaders(rows[0], "contracts");
            if(headers.length !== 0){
                // @ts-ignore
                setMissingContractHeaders(headers);
                setShow(true);
            }
            else {
                setShow(false);
                setContractsFile(files[0]);
                setCompleted(true)
            }
        });
    };

    const onBuylistsDrop = (files: any) => {
        readXlsxFile(files[0]).then((rows: any) => {
            const headers : any[] = excelService.verifyHeaders(rows[0], "buylists");
            if(headers.length !== 0){
                // @ts-ignore
                setMissingBuylistHeaders(headers);
                setShow(true);
            }
            else {
                setShow(false);
                setBuylistsFile(files[0]);
                setCompleted(true);
            }
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCompleted(false)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSend = () => {
        alert("Sent!")
    };

    return (
        <>
            <NavbarHeader/>
            <head className="Import-head">
                <title>Import d'une nouvelle base.</title>
            </head>
            <div className="Import-body">
                    <Stepper orientation="vertical" activeStep={activeStep} connector={<ColorlibConnector />} >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}><h1><strong>{label}</strong></h1></StepLabel>
                                <StepContent>
                                    {activeStep === 0 &&
                                        <Instructions/>
                                    }
                                    {activeStep === 1 && (
                                        <>
                                            {!productsFile && !completed ? (
                                                <Dropzone onDrop={onProductsDrop} accept={['.csv',
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                'application/vnd.ms-excel']}>
                                                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                                        <Jumbotron {...getRootProps({className: 'dropzone'})}>
                                                            <input {...getInputProps()} />
                                                            {isDragReject ? "Type de fichier non accepté !" : 'Cliquez ici ou glissez un fichier à télécharger !'}
                                                        </Jumbotron>
                                                    )}
                                                </Dropzone>
                                            )
                                            :( <li className="list-group-item list-group-item-success"> {productsFile.name} </li> )}
                                            {show && (
                                                <Alert severity="warning"><h3>Missing:</h3>
                                                    <ul>
                                                        {missingProductHeaders.map((header) =>(
                                                            <li>
                                                                {header}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Alert>
                                            )}
                                            <br/>
                                        </>
                                    )}
                                    {activeStep === 2 && (
                                        <>
                                            {!contractsFile && !completed ? (
                                                <Dropzone onDrop={onContractsDrop} accept={['.csv',
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                'application/vnd.ms-excel']}>
                                                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                                        <Jumbotron {...getRootProps({className: 'dropzone'})}>
                                                            <input {...getInputProps()} />
                                                            {isDragReject ? "Type de fichier non accepté !" : 'Cliquez ici ou glissez un fichier à télécharger !'}
                                                        </Jumbotron>
                                                    )}
                                                </Dropzone>
                                            )
                                            :( <li className="list-group-item list-group-item-success"> {contractsFile.name} </li> )}
                                            {show && (
                                                <Alert severity="warning"><h3>Missing:</h3>
                                                    <ul>
                                                        {missingContractHeaders.map((header) =>(
                                                            <li>
                                                                {header}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Alert>
                                            )}
                                            <br/>
                                        </>
                                    )}
                                    {activeStep === 3 && (
                                        <>
                                            {!buylistsFile && !completed ? (
                                                <Dropzone onDrop={onBuylistsDrop} accept={['.csv',
                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                'application/vnd.ms-excel']}>
                                                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                                        <Jumbotron {...getRootProps({className: 'dropzone'})}>
                                                            <input {...getInputProps()} />
                                                            {isDragReject ? "Type de fichier non accepté !" : 'Cliquez ici ou glissez un fichier à télécharger !'}
                                                        </Jumbotron>
                                                    )}
                                                </Dropzone>
                                            )
                                            :(<li className="list-group-item list-group-item-success"> {buylistsFile.name} </li>)}
                                            {show && (
                                                <Alert severity="warning"><h3>Missing:</h3>
                                                    <ul>
                                                        {missingBuylistHeaders.map((header) =>(
                                                            <li>
                                                                {header}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Alert>
                                            )}
                                            <br/>
                                        </>
                                    )}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                variant="light"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >Précédent</Button>
                                            {(activeStep !== 0 && activeStep !== steps.length) ?(
                                                <>
                                                    <Button
                                                        variant="success"
                                                        disabled={!completed}
                                                        color="default"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >{'Suivant'}</Button>
                                                </>
                                            )
                                            :(
                                                <>
                                                    <Button
                                                        variant="success"
                                                        color="default"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >{'Suivant'}</Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper style={{height: 200}}>
                            <Typography>Toutes les étapes ont été complétées.</Typography>
                            <br/>
                            <Button variant="success" size="lg"  onClick={handleSend}>
                                <CloudUploadIcon /> Mettre à jour la base de données
                            </Button>
                        </Paper>
                    )}
                </div>
        </>
    );
};
