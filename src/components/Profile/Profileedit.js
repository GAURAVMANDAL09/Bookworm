import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
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
import Button from "@material-ui/core/Button";

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

const Profileedit = (props) => {
  // const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [fullname, setFullname] = useState(props.details.fullname);
  const [email, setEmail] = useState(props.details.email);
  const [nickname, setNickname] = useState(props.details.nickname);
  const [mobile, setMobile] = useState(props.details.mobile);
  const [location, setLocation] = useState(props.details.location);
  const [gender, setGender] = useState(props.details.gender);

  const [locdetails, setLocdetails] = useState(null);
  useEffect(() => {
    alert("sd");
  }, []);
  const getUserGeoLocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/ef6c41a0-9d3c-11eb-8f3b-e1f5536499e7"
    )
      .then((response) => response.json())
      .then((data) => setLocdetails(data));
  };

  const handleSubmit = () => {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    // console.log(id, fullname, email, nickname, mobile, city,gender, birthday,dsitance);
    console.log(
      fullname,
      email,
      nickname,
      mobile,
      gender,
      slidix,
    );
    const body = {
      user: {
        userId: userId,
        fullname: fullname,
        email: email,
        nickname: nickname,
        mobile: mobile,
        gender: gender,
        distance:slidix
        // location:,
        // tags:,
        //
      },
    };

    axios
      .post(
        "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01" +
          `/user`,
        body
      )
      .then((res) => alert(res))
      .catch((err) => console.log(err));
  };

  const [slidix, setSlidix] = useState(5);
  const changeSlidix = (event, value) => {
    setSlidix(value);
  };
  const customMarks = [
  {
    value : 5,
    label : '5 km'
  },
  {
    value : 12,
    label : '12 km'
  },
  {
    value : 20,
    label : '20 km'
  },
  {
    value : 30,
    label : '30 km'
  },
  {
    value : 50,
    label : '50 km'
  },
  {
    value : 75,
    label : '75 km'
  },
  {
    value : 100,
    label : '100 km'
  },
] 
  const getText = (value) => `${value}`

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

          <Radiogrp
            row
            name="gender"
            value={gender}
            label="Gender"
            onChange={(event) => setGender(event.target.value)}
            items={genderItems}
          ></Radiogrp>

          <Button
            variant="contained"
            color="primary"
            className={"kuch bhi"}
            endIcon={<Icon></Icon>}
            onClick={getUserGeoLocationDetails}
          >
            Location
          </Button>

          <FormControl variant="outlined">
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

          <Slider style={{ width: 900, marginTop: 35, marginLeft: 15 }} 
          min = {0}
          max={100}
          default value = {20}
          value= {slidix}
          // step = {null}
          track = {false}
          marks= {customMarks}
          onChange = {changeSlidix}
          getAriaValueText ={getText}
          valueLabelDisplay = 'auto'
          />
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            style={{ float: "right" }}
            color="primary"
          >
            Submit
          </Button>
        </Grid>
        <Grid items xs={6}></Grid>
      </Grid>
    </Form>
  );
};

export default Profileedit;
