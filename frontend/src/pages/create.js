import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import {QRCode} from "react-qr-code";
import axios from "axios";


import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const BASE_URL = "http://localhost:5000/api";

const Create = () => {
    const {numistaNumber} = useParams();
    const [numistaDetails, setNumistaDetails] = useState({});

    const [year, setYear] = useState("");
    const [details, setDetails] = useState("");
    const [denomination, setDenomination] = useState("");
    const [grade, setGrade] = useState("");
    const [gradeDetails, setGradeDetails] = useState("");   
    const [issuer, setIssuer] = useState("");
    const [reference, setReference] = useState("");
    const [mintage, setMintage] = useState("");
    const [composition, setComposition] = useState("");
    const [mass, setMass] = useState("");
    const [diameter, setDiameter] = useState("");
    const [orientation, setOrientation] = useState("");
    const [dateAdded, setDateAdded] = useState("");

    var updateNumistaDetails = (jsonData) => {

        console.log("Numista Details: ", jsonData);

        setNumistaDetails(jsonData);
        setDenomination(jsonData.denomination);
        setIssuer(jsonData.issuer);
        setComposition(jsonData.composition);
        setMass(jsonData.mass);
        if (jsonData.diameter.length > 0) {
            setDiameter("⌀ " + jsonData.diameter);
        }
        
        
        if (jsonData.variations && jsonData.variations.length > 0) {
            updateFillOutDateAndDetails(jsonData.variations[0]);
        }

        if (jsonData.references && jsonData.references.length > 0) {
            setReference(jsonData.references[0]);
        }
    }

    var updateFillOutDateAndDetails = (variation) => {
        setYear(variation.date);

        if (variation.mintage.length > 0) {
            setMintage("m. " + variation.mintage);
        } else {
            setMintage("");
        }
        
        var comments = variation.comment;

        if(comments.includes("Proof")) {
            setGrade("Proof")
            comments.replace("Proof", "");
            setDetails(comments);
        } else {
            setGrade("");
            setDetails(comments);
        }
    }


    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.toLocaleString('default', { month: 'short' }).toUpperCase()}-${String(currentDate.getDate()).padStart(2, '0')}`;
        setDateAdded(formattedDate);
        getNumistaDetails();
      }, []);

    const getNumistaDetails = () => {
        axios
          .get(`${BASE_URL}/numista/${numistaNumber}`)
          .then((res) => updateNumistaDetails(res.data))
          .catch((err) => console.error(err));
      };
    
    
    return (
        <div>
            <h1>Create</h1>
            <h2>{numistaNumber}</h2>
            <div className="numista-details">
                <Form.Select
                    aria-label="Default select example"
                    plaintext
                    onChange={(e) => {
                        const selectedIndex = e.target.selectedIndex;
                        console.log("Selected Index:", selectedIndex);

                        updateFillOutDateAndDetails(numistaDetails.variations[selectedIndex]);
                    }}>
                    {
                        (numistaDetails && numistaDetails.variations && numistaDetails.variations.length > 0) ? (
                            numistaDetails.variations.map((variation, index) => (
                                <option key={index} value={variation.date}>
                                    {variation.date} {variation.comment && `(${variation.comment})`}
                                </option>
                            ))
                        ) : (
                            <option value="0">No Variations</option>
                        )
                    }
                </Form.Select>
                <Form.Select
                    aria-label="Default select example"
                    plaintext
                    onChange={(e) => {
                        setReference(e.target.value);
                    }}>
                    {
                        (numistaDetails && numistaDetails.references && numistaDetails.references.length > 0) ? (
                            numistaDetails.references.map((ref, index) => (
                                <option key={index} value={ref}>
                                    {ref}
                                </option>
                            ))
                        ) : (
                            <option value="0">No References</option>
                        )
                    }
                </Form.Select>
            </div>
            <div className="parent-label-large">
                <Form.Control
                    placeholder="Year"
                    aria-label="Year"
                    value={year}
                    plaintext
                    className="label date"
                    onChange={(e) => setYear(e.target.value)}
                />
                <Form.Control
                    placeholder="Issuer"
                    aria-label="Issuer"
                    value={issuer}
                    plaintext
                    className="label issuer"
                    onChange={(e) => setIssuer(e.target.value)}
                />
                <Form.Control
                    placeholder="Denomination"
                    aria-label="Denom"
                    value={denomination}
                    plaintext
                    className="label denomination"
                    onChange={(e) => setDenomination(e.target.value)}
                />
                <Form.Control
                    placeholder="Grade"
                    aria-label="Grade"
                    value={grade}
                    plaintext
                    className="label grade"
                    onChange={(e) => setGrade(e.target.value)}
                />
                <Form.Control
                    placeholder="Mintage"
                    aria-label="Mintage"
                    value={mintage}
                    plaintext
                    className="label mintage"
                    onChange={(e) => setMintage(e.target.value)}
                />
                <Form.Control
                    placeholder="Details"
                    aria-label="Details"
                    value={details}
                    plaintext
                    className="label details"
                    as="textarea"
                    rows={3}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <Form.Control
                    placeholder="Ref"
                    aria-label="Ref"
                    value={reference}
                    plaintext
                    className="label reference"
                    onChange={(e) => setReference(e.target.value)}
                />
            </div>
            <p />
            <div className="parent-label-large">
                <p
                    className="label composition">{composition}</p>
                <Form.Control
                    placeholder="Mass"
                    aria-label="Mass"
                    value={mass}
                    plaintext
                    className="label mass"
                    onChange={(e) => setMass(e.target.value)}
                />
                <Form.Control
                    placeholder="Diameter"
                    aria-label="Diameter"
                    value={diameter}
                    plaintext
                    className="label diameter"
                    onChange={(e) => setDiameter(e.target.value)}
                />
                <Form.Control
                    placeholder="Date Added"
                    aria-label="Date Added"
                    value={dateAdded}
                    plaintext
                    className="label date-added"
                    onChange={(e) => setDateAdded(e.target.value)}
                />
                
                <div className="qr-code">
                    <QRCode
                        value={`https://numista.com/catalogue/pieces${numistaNumber}.html`}
                     />
                     <p className="label numista-number">{`(N# ${numistaNumber})`}</p>
                </div>
            </div>
            
        </div>
    );
}
  
export default Create;