import * as React from "react";
import {NavbarHeader} from "../components/NavbarHeader";
import '../assets/css/Home.css';
import {useAppContext} from "../libs/contextLib";
import {useHistory} from "react-router";
import Color from 'color';
import {
    Typography,
    CardActionArea,
    Card,
    CardContent,
    Grid,
    makeStyles,
    Icon
} from '@material-ui/core';
// @ts-ignore
import {Search, BusinessCenter, CloudUpload, LibraryBooks} from "@material-ui/icons";
import {authService} from "../services/Authentication.service";

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
}));

const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: ({ color }) => ({
        minWidth: 100,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    }),
    content: ({ color }) => {
        return {
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        fontFamily: 'Keania One',
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
    },
}));

const CustomCard = ({ classes, icon, title, subtitle }) => {
    return (
        <CardActionArea className={classes.actionArea} style={{width: 300}}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Icon style={{ fontSize: 100 }}>{icon}</Icon>
                    <Typography className={classes.title} variant={'h2'}>
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};


export const Home = () => {

    const styles = useStyles({ color: '#282c34' });
    const styles2 = useStyles({ color: '#282c34' });
    const styles3 = useStyles({ color: '#282c34' });
    const styles4 = useStyles({ color: '#282c34' });
    const gridStyles = useGridStyles();
    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();

    return (
        <>
            <NavbarHeader/>
            <div className="Home-body">
                    <Grid classes={gridStyles} container spacing={3} >
                        <Grid item xs={2} onClick={ () => {
                            authService.logout(() => {
                                userHasAuthenticated(true);
                                history.push("/dashboard/explorer")
                            });
                        }}>
                            <CustomCard
                                classes={styles}
                                title={'Exploration'}
                                subtitle={"Rechercher un fonds d'investissement"}
                                icon={<Search style={{ fontSize: 100, color: 'white' }}/>}
                            />
                        </Grid>
                        <Grid item xs={2} onClick={ () => {
                            authService.logout(() => {
                                userHasAuthenticated(true);
                                history.push("/dashboard/products")
                            });
                        }}>
                            <CustomCard
                                classes={styles2}
                                title={'Fonds'}
                                subtitle={"Lister les fonds disponibles"}
                                icon={<LibraryBooks style={{ fontSize: 100, color: 'white' }}/>}
                            />
                        </Grid>
                        <Grid item xs={2} onClick={ () => {
                            authService.logout(() => {
                                userHasAuthenticated(true);
                                history.push("/dashboard/contracts")
                            });
                        }}>
                            <CustomCard
                                classes={styles3}
                                title={'Contrats'}
                                subtitle={"Lister les contrats disponibles"}
                                icon={<BusinessCenter style={{ fontSize: 100, color: 'white' }}/>}
                            />
                        </Grid>
                        <Grid item xs={2} onClick={ () => {
                            authService.logout(() => {
                                userHasAuthenticated(true);
                                history.push("/dashboard/import")
                            });
                        }}>
                            <CustomCard
                                classes={styles4}
                                title={"Import"}
                                subtitle={"Mettre à jour la base de données"}
                                icon={<CloudUpload style={{ fontSize: 100, color: 'white' }}/>}
                            />
                        </Grid>
                    </Grid>
                </div>
        </>
    )
};
