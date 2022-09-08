import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { InputAdornment, TextField, OutlinedInput, CircularProgress } from "@mui/material";

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [optionFields, setOptionFields] = useState([]);
  const fieldOptions = [];
  const [editOption, setEditOption] = useState(false);
  const [editedChoice, setEditedChoice] = useState({
    text: "",
    price: "",
  });
  const [editedOption, setEditedOption] = useState({
    label: "",
  });
  const fetchOptions = async (id) => {
    if (!id) return;
    const options = {
      url: `https://www.andalelatinogrill.com/wp-json/gf/v2/forms/${id}`,
      params: {
        consumer_key: "ck_5f706cd5ee6a48fbe7933f2601276d16942a6e9b",
        consumer_secret: "cs_b9361130487ffc3d0bd056e15f9ae5334635696c",
      },
    };

    await axios(options).then((response) => {
      for (let i = 0; i < response.data.fields.length; i++) {
        if (response.data.fields[i].type === "option") {
          fieldOptions.push(response.data.fields[i]);
        }
      }
      console.log(fieldOptions);
      setOptionFields(fieldOptions);
      setIsLoading(false);
    });
  };

  useEffect(async () => {
    await fetchOptions(props.formId);
  }, [props.formId]);

  const handleChange = (event, index, choice, option) => {
    console.log("Text: " + choice.text);
    console.log("Price: " + choice.price);
    console.log("Option Index: " + index);
    console.log("Option Id: " + option[index].id);
    console.log("Option Name: " + option[index].label);
    console.log("Edited Value: " + event.target.value);
    console.log(editedChoice);
  };
  const RenderViewOptions = (option) => {
    option = option.option;
    console.log(option);
    return (
      <div>
        {option.choices.map((choice) => {
          return (
            <div key={choice.text}>
              <Typography>Name: {choice.text}</Typography>
              <Typography>Price: {choice.price} </Typography>
            </div>
          );
        })}
      </div>
    );
  };

  const RenderEditOptions = (option) => {
    option = option.option;
    // console.log(option.id);
    return (
      <div>
        {option.choices.map((choice, index) => {
          return (
            <div key={index}>
              <Typography>
                Name:{" "}
                <TextField
                  defaultValue={choice.text}
                  variant="outlined"
                  onChange={(event) => handleChange(event, index, choice, option.inputs)}
                />
                Price:{" "}
                <TextField
                  defaultValue={choice.price}
                  variant="outlined"
                  onChange={(event) => handleChange(event, index, choice, option)}
                />{" "}
              </Typography>
            </div>
          );
        })}
      </div>
    );
  };

  const handleEdit = (e) => {
    setEditOption(!editOption);
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {optionFields &&
            optionFields.map((option) => {
              return (
                <Accordion key={option.id}>
                  <AccordionSummary aria-controls="panel2a-content" expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{option.label} </Typography>
                  </AccordionSummary>
                  {editOption ? (
                    <RenderEditOptions option={option} />
                  ) : (
                    <RenderViewOptions option={option} />
                  )}
                  <Button color="primary" variant="contained" onClick={(e) => handleEdit(e)}>
                    Edit
                  </Button>
                </Accordion>
              );
            })}
          <br />
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </div>
      )}{" "}
    </div>
  );
};

export default Form;
