import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";

export default function Radiogrp(props) {
  const { name, label, value, onChange, items } = props;
  return (
      <FormControl>
          {label} 
    <RadioGroup
      row
      name={name}
      value={value}
      onChange={onChange}
      >   
      <FormControlLabel
        value="male"
        control={<Radio />}
        label="Male"
        ></FormControlLabel>
      <FormControlLabel
        value="female"
        control={<Radio />}
        label="Female"
        ></FormControlLabel>
      <FormControlLabel
        value="other"
        control={<Radio />}
        label="Other"
        ></FormControlLabel>
    </RadioGroup>
        </FormControl>
  );
}
