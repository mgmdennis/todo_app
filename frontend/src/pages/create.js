import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const BASE_URL = "http://localhost:5000/api";

const Create = () => {
    const {numistaNumber} = useParams();
    const [numistaDetails, setNumistaDetails] = useState({});

    useEffect(() => {
        getNumistaDetails();
      }, []);

    const getNumistaDetails = () => {
        axios
          .get(`${BASE_URL}/numista/${numistaNumber}`)
          .then((res) => setNumistaDetails(res.data))
          .catch((err) => console.error(err));
      };

    return (
        <div>
            <h1>Create</h1>
            <h2>{numistaNumber}</h2>
            <div classNameame="numista-details">
                {!numistaDetails ? (
                    <h2>No Details {JSON.stringify(numistaDetails)}, {numistaDetails.length}</h2>) : (
                        <p>{JSON.stringify(numistaDetails, null, 2)}</p>
                    )
                }
                <Form.Select aria-label="Default select example">
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
            </div>
        </div>
    );
}
  
export default Create;