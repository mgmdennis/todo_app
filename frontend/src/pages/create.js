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
                <Form.Select
                    aria-label="Select Sheldon Grade"
                    plaintext
                    onChange={(e) => {
                        setGrade(e.target.value);
                    }}
                >
                    <option value="">Select Sheldon Grade</option>
                    <option value="MS-70">MS-70</option>
                    <option value="MS-69">MS-69</option>
                    <option value="MS-68">MS-68</option>
                    <option value="MS-67">MS-67</option>
                    <option value="MS-66">MS-66</option>
                    <option value="MS-65">MS-65</option>
                    <option value="MS-64">MS-64</option>
                    <option value="MS-63">MS-63</option>
                    <option value="MS-62">MS-62</option>
                    <option value="MS-61">MS-61</option>
                    <option value="MS-60">MS-60</option>
                    <option value="UNC">UNC (Uncirculated)</option>
                    <option value="AU">AU (About Uncirculated)</option>
                    <option value="AU-55">AU-55</option>
                    <option value="AU-50">AU-50</option>
                    <option value="EF+">EF+ (Extremely Fine Plus)</option>
                    <option value="EF">EF (Extremely Fine)</option>
                    <option value="EF-45">EF-45</option>
                    <option value="EF-40">EF-40</option>
                    <option value="VF+">VF+ (Very Fine Plus)</option>
                    <option value="VF">VF (Very Fine)</option>
                    <option value="VF-30">VF-30</option>
                    <option value="VF-20">VF-20</option>
                    <option value="F+">F+ (Fine Plus)</option>
                    <option value="F">F (Fine)</option>
                    <option value="F-15">F-15 (Fine 15)</option>
                    <option value="F-12">F-12 (Fine 12)</option>
                    <option value="VG+">VG+ (Very Good Plus)</option>
                    <option value="VG">VG (Very Good)</option>
                    <option value="VG-10">VG-10 (Very Good 10)</option>
                    <option value="VG-8">VG-8 (Very Good 8)</option>
                    <option value="G+">G+ (Good Plus)</option>
                    <option value="G">G (Good)</option>
                    <option value="G-6">G-6 (Good 6)</option>
                    <option value="G-4">G-4 (Good 4)</option>
                    <option value="AG+">AG+ (About Good Plus)</option>
                    <option value="AG">AG (About Good)</option>
                    <option value="AG-3">AG-3 (About Good 3)</option>
                    <option value="Proof">Proof</option>
                    <option value="Specimen">Specimen</option>
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
                    as="textarea"
                    rows={2}
                    className={"label denomination" + (denomination.length > 15 ? " narrow" : "")}
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
                    placeholder="Grade Details"
                    aria-label="Grade Details"
                    value={gradeDetails}
                    plaintext
                    className="label grade-details"
                    onChange={(e) => setGradeDetails(e.target.value)}
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
                    rows={6}
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
                    className={"label composition " + (composition.length > 30 ? " narrow" : "")}>
                    {composition}
                </p>
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