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
  const [fieldIds, setFieldIds] = useState([]);
  const [form, setForm] = useState();
  const editedOptionName = {
    id: "",
    label: "",
  };
  const editedOptionPrice = {
    id: "",
    price: "",
  };

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
      console.log(response.data);
      setForm(response.data);
      for (let i = 0; i < response.data.fields.length; i++) {
        if (response.data.fields[i].type === "option") {
          fieldOptions.push(response.data.fields[i]);
        }
      }
      setOptionFields(fieldOptions);
      setIsLoading(false);
    });
  };

  useEffect(async () => {
    await fetchOptions(props.formId);
  }, [props.formId]);

  const handleChangeName = (event, index, choice, option) => {
    event.preventDefault();
    editedOptionName = {
      id: option[index].id,
      label: event.target.value,
    };
  };

  const handleChangePrice = (event, index, choice, option) => {
    event.preventDefault();
    editedOptionPrice = {
      id: option[index].id,
      price: event.target.value,
    };
  };

  const handleSubmit = () => {
    const params = {
      consumer_key: "ck_5f706cd5ee6a48fbe7933f2601276d16942a6e9b",
      consumer_secret: "cs_b9361130487ffc3d0bd056e15f9ae5334635696c",
    };
    console.log(editedOptionName);
    console.log(editedOptionPrice);
    console.log(form.fields);
    let inputIndex = 0;
    let fieldIndex = 0;
    form.fields.forEach((field, index) => {
      if (field.type === "option") {
        if (editedOptionName.id === "") {
          if (field.id === parseInt(editedOptionPrice.id.split(".")[0])) {
            field.inputs.forEach((input, index) => {
              if (input.id === editedOptionName.id) {
                inputIndex = index;
              }
            });
            fieldIndex = index;
          }
        } else {
          if (field.id === parseInt(editedOptionName.id.split(".")[0])) {
            field.inputs.forEach((input, index) => {
              if (input.id === editedOptionName.id) {
                inputIndex = index;
              }
            });
            fieldIndex = index;
          }
        }
      }
    });
    console.log(fieldIndex, inputIndex);
    if (editedOptionName.label !== "") {
      form.fields[fieldIndex].inputs[inputIndex].label = editedOptionName.label;
      form.fields[fieldIndex].choices[inputIndex].text = editedOptionName.label;
    }
    if (editedOptionPrice.price !== "") {
      form.fields[fieldIndex].choices[inputIndex].price = editedOptionPrice.price;
    }
    console.log(form.fields[fieldIndex].inputs[inputIndex].name);
    axios
      .put(`https://www.andalelatinogrill.com/wp-json/gf/v2/forms/${props.formId}`, form, {
        params,
      })
      .then((reponse) => {
        console.log(reponse.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setEditOption(false);
  };

  const RenderViewOptions = (option) => {
    option = option.option;
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
                  onChange={(event) => handleChangeName(event, index, choice, option.inputs)}
                />
                Price:{" "}
                <TextField
                  defaultValue={choice.price}
                  variant="outlined"
                  onChange={(event) => handleChangePrice(event, index, choice, option.inputs)}
                />{" "}
              </Typography>
            </div>
          );
        })}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    );
  };

  const handleEditButtonPressed = (e) => {
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
                    <>
                      {" "}
                      <RenderViewOptions option={option} />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={(e) => handleEditButtonPressed(e)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Accordion>
              );
            })}
          <br />
        </div>
      )}{" "}
    </div>
  );
};

export default Form;
