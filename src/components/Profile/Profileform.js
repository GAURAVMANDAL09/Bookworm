import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
} from "@material-ui/core";
import { useForm, Form } from "./useForm";
import Inputgm from "./Inputgm";
import Radiogrp from "./Radiogrp";
import firebase from "firebase/app";
import Button from '@material-ui/core/Button'
// let initialFValues = {
//   userId: 0,
//   id: 0,
//   fullname: "",
//   email: "",
//   nickname: "",
//   mobile: "",
//   city: "",
//   gender: "male",
//   birthday: "",
//   distance: "",
// };



const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const Profileform = () => {
  // const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [fullname,setFullname] = useState('');
  const [email,setEmail] = useState('');
  const [nickname,setNickname] = useState('');
  const [mobile,setMobile] = useState('');
  const [city,setCity] = useState('');
  const [gender,setGender] = useState('');

  const handleSubmit = () => {

    let user = firebase.auth().currentUser;
    let userId = user.uid;
    // console.log(id, fullname, email, nickname, mobile, city,gender, birthday,dsitance);
    console.log(fullname, email, nickname,mobile,gender);
    const body = {
      user: {
        userId: userId,
        fullname: fullname,
        email: email,
        nickname: nickname,
        mobile:mobile,
        gender: gender,
        // location:,
        // tags:,
        // 
      }
    }
    axios.post('https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01' + `/user`,body)
      .then(res => alert(res))
      .catch(err => console.log(err))
  }

  return (
    <Form>
      <Grid container>
        <Grid items xs={3}>
          <Inputgm
            label="Full Name"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
          <Inputgm
            label="Email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Inputgm
            label="Nick Name"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <Inputgm
            label="Mobile"
            name="mobile"
            id="mobile"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
          
          <Inputgm
            label="City"
            name="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          <Radiogrp
            row
            name="gender"
            value={gender}
            label="Gender"
            onChange={(event) => setGender(event.target.value)}
            items={genderItems}
          ></Radiogrp>
          <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value="city"
              onChange="onChange"
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Agra</MenuItem>
              <MenuItem value={20}>Patna</MenuItem>
              <MenuItem value={30}>Begusarai</MenuItem>
              <MenuItem value={30}>Sikhoabad</MenuItem>
              <MenuItem value={30}>Asansol</MenuItem>
              <MenuItem value={30}>Lucky Sarai Jn</MenuItem>
            </Select>
          </FormControl>

          <Slider
      defaultValue={50}
      step={64}
      graduated
      progress
      min={64}
      max={1024}
      renderMark={mark => {
        if ([64, 128, 256, 512, 1024].includes(mark)) {
          return <span>{mark} GB</span>;
        }
        return null;
      }}
    />
    <Button onClick={() => handleSubmit()} variant='contained' style={{ float: 'right' }} color='primary'>
        Submit
      </Button>
        </Grid>
        <Grid items xs={6}></Grid>
      </Grid>
    </Form>
  );
};

export default Profileform;