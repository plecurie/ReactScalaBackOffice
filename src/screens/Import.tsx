import React, {useState} from 'react';
import {useHistory} from "react-router";
import readHeaders from '../services/parser/readHeaders'
import verifyHeaders from '../services/parser/verifyHeaders'
import {ColorlibConnector, ColorlibStepIcon} from "../components/IconStepper";
import Instructions from "../components/Instructions";
import {NavbarHeader} from "../components/NavbarHeader";
import {useAppContext} from "../libs/contextLib";
import {Button, Jumbotron} from "react-bootstrap";
import Dropzone from "react-dropzone";
import {House} from "@material-ui/icons";
import {Typography, Paper, StepContent, StepLabel, Step, Stepper, Snackbar, makeStyles} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
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
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({1: false, 2: false, 3: false});
    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();
    const steps = getSteps();
    const [productsFile, setProductsFile]= useState();
    const [contractsFile, setContractsFile]= useState();
    const [buylistsFile, setBuylistsFile]= useState();
    const [missingHeaders, setMissingHeaders]= useState([]);
    const [show, setShow]=useState(false);
    const [loading, setLoading]=useState(false);
    const [updated, setUpdated]=useState(false);
    const [open, setOpen] = React.useState(false);

    const onProductsDrop = async (files: any) => {
        setLoading(true);
        const readedHeaders = await readHeaders(files[0]);
        const missingHeaders = await verifyHeaders(readedHeaders, "products");
        handleMissingHeaders(files[0], missingHeaders);
    };

    const onContractsDrop = async (files: any) => {
        setLoading(true);
        const readedHeaders = await readHeaders(files[0]);
        const missingHeaders = await verifyHeaders(readedHeaders, "contracts");
        handleMissingHeaders(files[0], missingHeaders);
    };

    const onBuylistsDrop = async (files: any) => {
        setLoading(true);
        const readedHeaders = await readHeaders(files[0]);
        const missingHeaders = await verifyHeaders(readedHeaders, "buylists");
        handleMissingHeaders(files[0], missingHeaders);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

    const handleMissingHeaders = (file: File, missingHeaders: any[]) => {
        setLoading(false);
        if (missingHeaders.length !== 0) {
            // @ts-ignore
            setMissingHeaders(missingHeaders);
            setShow(true);
        } else {
            switch (activeStep) {
                case 1: { setProductsFile(file); break; }
                case 2: { setContractsFile(file); break; }
                case 3: { setBuylistsFile(file); break; }
                default: break
            }
            setShow(false);
            handleComplete()
        }
    };

    const handleSend = async () => {
        const data = new FormData();

        data.append('files', productsFile, 'InputProducts.xlsx');
        data.append('files', contractsFile, 'InputContracts.xlsx');
        data.append('files', buylistsFile, 'InputBuylists.xlsx');

        const response = await fetch('http://localhost:3100/products/_updatedb', {
            method: 'POST',
            body: data,
        });

        const results = await response.json();

        if(results.updated){
            setOpen(true);
            setUpdated(true);
        }

    };

    const goHome = () => {
        userHasAuthenticated(true);
        history.push("/home")
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
                                            {!completed[activeStep] ? (
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
                                            <br/>
                                        </>
                                    )}
                                    {activeStep === 2 && (
                                        <>
                                            {!completed[activeStep] ? (
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
                                            <br/>
                                        </>
                                    )}
                                    {activeStep === 3 && (
                                        <>
                                            {!completed[activeStep] ? (
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
                                            <br/>
                                        </>
                                    )}
                                    {loading && (<h3 style={{marginBottom: 50}}><strong>Vérification en cours ...</strong></h3>) }
                                    {show && (
                                        <Alert severity="warning">
                                            <h3>En-têtes manquants :</h3>
                                            <ul>
                                                {missingHeaders.map((header) =>(
                                                    <li>{header}</li>
                                                ))}
                                            </ul>
                                        </Alert>
                                    )}
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                variant="light"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >Précédent</Button>
                                            <Button
                                                variant="success"
                                                disabled={activeStep !== 0 && activeStep !== steps.length && !completed[activeStep]}
                                                color="default"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >{'Suivant'}</Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper style={{height: 200}}>
                            <Typography style={{marginLeft: 90}}>Toutes les étapes ont été complétées.</Typography>
                            <br/>

                                {updated ? (
                                    <Button variant="info" style={{marginLeft: 90}} size="lg" onClick={goHome}>
                                        <div>
                                            <House/> Retourner à l'accueil
                                        </div>
                                    </Button>
                                ) : (
                                    <Button variant="success" style={{marginLeft: 90}} size="lg" onClick={handleSend}>
                                        <div>
                                            <CloudUploadIcon /> Mettre à jour la base de données
                                        </div>
                                    </Button>
                                )}

                        </Paper>
                    )}
                    <div>
                        <Snackbar style={{marginLeft: 30}} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" variant="filled">
                                Fichiers envoyés avec succès !
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
        </>
    );
};
