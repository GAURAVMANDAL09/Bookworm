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
  { id: "Male", title: "Male" },
  { id: "Female", title: "Female" },
  { id: "other", title: "Other" },
];

const Profileshow = (props) => {
  // const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [fullname, setFullname] = useState(props.details.fullname);
  const [email, setEmail] = useState(props.details.email);
  const [nickname, setNickname] = useState(props.details.nickname);
  const [mobile, setMobile] = useState(props.details.mobile);
  const [location, setLocation] = useState(props.details.location);
  const [gender, setGender] = useState(props.details.gender);

  const [locdetails, setLocdetails] = useState(null);
  useEffect(() => {
    console.log(props);
  }, []);
  const getUserGeoLocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/ef6c41a0-9d3c-11eb-8f3b-e1f5536499e7"
    )
      .then((response) => response.json())
      .then((data) => setLocdetails(data));
  };
  
  const handleSubmit = () => {
      console.log('changing bvalue')
        props.changeFunc('EDIT');
  };

  const [imgprev,setImgprev] = useState(null);
  const [imgerror,setImgerror] = useState(false);

  return (
    <Form>
      <Grid container>
      <Grid items xs={4}>
        <div className = "Picmerror">
          {imgerror && <p className = "imgerrormsg">File Format Unsupported</p>}
        </div>
        <div className="userxpic">
          <div className="imgPreview"
            style = {{background : imgprev ? `url("${imgprev}") no-repeat center/cover`: "#131313"}}
          >
            {!imgprev && (
            <>
              <p  style={{color: "white"}}>Update Profile Picture</p>
              <label htmlFor="fileUpload" className="customFileUpload"> Choose Upload</label>
              <span  style={{color: "grey"}}>( jpg, jpeg, png )</span>
            </>)}
        {/* <input style= {{ display:"none" }}type = "file" id = "fileUpload" onChange= {handleImageChange} /> */}
        
          </div>
          </div>
          <div className = "Picchange">
          {imgprev && (
                  <Button
                  onClick={() => setImgprev(null)}
                  variant="contained"
                  style={{ float: "right" }}
                  color="primary"
                >
                Change Profile Picture
                </Button>
                  )}
           </div>

        </Grid>


        <Grid items xs={3}>
          <Inputgm
            label="Full Name"
            id="fullname"
            name="fullname"
            value={fullname}
            disabled={true}
            onChange={(event) => setFullname(event.target.value)}
          />
          <Inputgm
            label="Email"
            name="email"
            id="email"
            value={email}
            disabled={true}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Inputgm
            label="Nick Name"
            name="nickname"
            id="nickname"
            value={nickname}
            disabled={true}
            onChange={(event) => setNickname(event.target.value)}
          />
          <Inputgm
            label="Mobile"
            name="mobile"
            id="mobile"
            value={mobile}
            disabled={true}
            onChange={(event) => setMobile(event.target.value)}
          />

          <Inputgm
            label="Gender"
            name="gender"
            id="gender"
            value={gender}
            disabled={true}
            onChange={(event) => setMobile(event.target.value)}
          />


          {/* <FormControl variant="outlined">
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
          </FormControl> */}

        
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            style={{ float: "right" }}
            color="primary"
          >
            Edit
          </Button>
        </Grid>
        
      </Grid>
    </Form>
  );
};

export default Profileshow;
