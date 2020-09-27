import React from "react";
import {Table} from "react-bootstrap";

// @ts-ignore
const Instructions = () => {
    return (
        <div>
            <br/>
            <p>
                <ul>
                    <li>
                        Le fichier EXCEL d'import de FONDS D'INVESTISSEMENT doit comporter une unique SHEET qui recense TOUS les produits et leurs caractéristiques.  <br/> Les en-têtes sont en anglais. <br/> <strong>Exemple :</strong>
                        <Table striped bordered hover size="sm" style={{width: 1000, marginLeft: window.innerWidth - window.innerWidth / 2 - 600}}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>ISIN</th>
                                <th>Firm Name</th>
                                <th>KIID Ongoing Charge</th>
                                <th>Global Category</th>
                                <th>...</th>
                            </tr>
                            <tbody>
                            <tr/>
                            </tbody>
                            </thead>
                        </Table>

                        Si un mot est mal orthographié et que la casse n'est pas identique, la colonne ne sera pas reconnue par l'application.
                    </li>
                    <br/>
                    <li>
                        Le fichier EXCEL d'import de CONTRATS doit comporter une unique SHEET qui recense TOUS les contrats. <br/> <strong>Exemple :</strong>
                        <Table striped bordered hover size="sm" style={{width: 1000, marginLeft: window.innerWidth - window.innerWidth / 2 - 600}}>
                            <thead>
                            <tr>
                                <th>ID Contrat</th>
                                <th>Nom</th>
                                <th>Frais Fonds Euro</th>
                                <th>Frais UC</th>
                            </tr>
                            <tbody>
                            <tr/>
                            </tbody>
                            </thead>
                        </Table>
                    </li>
                    <br/>
                    <li>
                        Le fichier EXCEL d'import de BUYLISTS doit comporter une unique SHEET qui recense TOUS les codes ISIN de TOUS les contrats. <br/> <strong>Exemple :</strong>
                        <Table striped bordered hover size="sm" style={{width: 500, marginLeft: window.innerWidth - window.innerWidth / 2 - 300}}>
                            <thead>
                            <tr>
                                <th>ID Contrat</th>
                                <th>ISIN</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>FR0010588343</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>LU0197230542</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>LU0197230542</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>FR0010588343</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>FR0010321810</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>FR0000292278</td>
                            </tr>
                            </tbody>
                        </Table>
                    </li>
                </ul>
            </p>
            <br/>
        </div>
    )
};

export default Instructions
