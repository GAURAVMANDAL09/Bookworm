import React, { useState, useEffect } from "react";
import axios from "axios";
import './profile.css'
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
    // alert("sd");
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
        distance:slidix,
        // img: imgprev,
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

  const [imgprev,setImgprev] = useState(null);
  const [imgerror,setImgerror] = useState(false);
  const handleImageChange = (e) => {
    
    const selected = e.target.files[0];
    const Allowed_Types =[ "image/png" , "image/jpeg", "image/jpg" ];
    if(selected && Allowed_Types.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
          setImgprev(reader.result);
          setImgerror(false);
      }
      reader.readAsDataURL(selected);
    } else {
      setImgerror(true);
      
    }
  }


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
        <input style= {{ display:"none" }}type = "file" id = "fileUpload" onChange= {handleImageChange} />
        
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

                {/* {imgprev && (
                  <button styles = {{height: "5"}} onClick={() => setImgprev(null)}>Change Profile Picture</button>
                  )} */}
           </div>

        </Grid>


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

          <Slider style={{ width: 850, marginTop: 35, marginLeft: 15 }} 
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
        
      </Grid>
    </Form>
  );
};

export default Profileedit;
