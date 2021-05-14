import React,{useEffect} from "react";
import "./Mainsxn.css";
import firebase from "firebase/app";
import { Stack } from "./Stack";
import styled from "styled-components";
import axios from 'axios'
// import { Gmcard } from "./Gmcard";

import BookImg from "../Swipe/boo/1.jpg";
// import { Bookdetails } from "./Bookdetails";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const CardWrapper = styled.div`
  width: 100%;
  perspective: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled(motion.div)`
  width: 300px;
  height: 490px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #1d1f21;
  color: #fff;
  position: relative;
  cursor: grab;
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-top-right-radius: 25px;
`;

const Circle = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  top: -4.2em;
  right: -10em;
  z-index: 5;
  background-color: #fa87ce;
  border-radius: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1.2;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 0em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 1.2;
  margin-top: 0.77em;
  //   padding-bottom: 4rem
`;

const Genre = styled(motion.h1)`
  color: #fff;
  text-transform: uppercase;
  z-index: 10;
  font-size: 65px;
  font-weight: 900;
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 2em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Book = styled(motion.div)`
  width: auto;
  height: 400px;
  z-index: 99;
  user-select: none;
  margin-right: 0em;
  margin-top: 3em;
  img {
    width: auto;
    height: 85%;
    user-select: none;
  }
`;

export default function App(props) {
  const Wrapper = styled(Stack)``;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const [cnt,setCnt] = useState(-1);
  const [tmp,setTmp] = useState(false);

  //   width: 200px;
  //   height: 250px;

  const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    //text-shadow: 0 10px 10px #d1d5db;

    width: 315px;
    height: 520px;
    flex-direction: column;
    border-radius: 25px;
    box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
    background-color: #1d1f21;
    color: #fff;
    cursor: grab;
    transform: ${() => {
      let rotation = Math.random() * 0;
      return `rotate(${rotation}deg)`;
    }};
  `;

  const SmallText = styled.span`
    font-size: 11px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  `;
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  const DetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2.6em 6px 0 6px;
    line-height: 1.4;
  `;

  const MediumText = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: 800;
    text-transform: uppercase;
  `;
  const UltraSmall = styled.span`
    font-size: 10px;
    color: #fff;
    font-weight: 800;
    margin-bottom: 1.2em;
    text-transform: uppercase;
  `;

  const SmalText = styled.span`
    font-size: 15px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
  `;

  const SpacedHorizontalContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  //XXXXXXXXXXXXXXX Hooks XXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const [people, setPeople] = useState([]);
  useEffect(()=>{
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    axios.get(`https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01/get-recommended-books?userId=${userId}&recommendationType=top-books`)
    .then(res=> {
      console.log(res.data)
      setPeople(res.data['top-books'])
    })
  },[])
  
  const sendKey = (item,response) => {
    if(response){
      var key = item.key;
      key = key.substring(1);
      key = parseInt(key);
      if(key==0){
        setTmp(true);
      }
      console.log(people[key]);
    }
  }
  return (
    <div className="Mainsxn">
      {tmp ? <h1>NO BOOKS </h1>
      :
      <Wrapper
        onVote={(item, vote) => {
          // setCnt(cnt+1);
          sendKey(item,vote);    
          
          console.log(item, vote);
        }}
        style={{ x, y, rotateX, rotateY, z: 100, background: "#fff" }}
        drag
        dragElastic={0.16}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* <Genre style={{ rotate: "-0deg", paddingBottom: "8.75em",   color: "white" }}>{niche}</Genre> */}

        {people.map(person => {
          return (
            <Item
            data-value="waffles"
            whileTap={{ scale: 1.15 }}
            style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
            drag
            dragElastic={0.12}
          >
            <TopContainer>
              <BookWrapper>
                <Book
                  style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
                  //   drag
                  dragElastic={0.12}
                  whileTap={{ cursor: "grabbing" }}
                >
                  {/* <div style = {{backgroundImage: 'img'}}></div> */}
                  <img src={person.img || BookImg} />
                </Book>
              </BookWrapper>
            </TopContainer>
  
            {/*  🥞🍩 */}
            <BottomContainer>
              <DetailsContainer>
                <SmalText style={{ color: "#ff17a3" }}>
                  {person.distance} KM Far
                </SmalText>
                <SpacedHorizontalContainer>
                  <MediumText style={{ color: "orange" }}>{person.title}</MediumText>
                </SpacedHorizontalContainer>
                <SmalText style={{ color: "white" }}>{person.author}</SmalText>
                <UltraSmall style={{ color: "#d6d6d6" }}>
                  Description - '{person.description}'
                </UltraSmall>
              </DetailsContainer>
              {/* <Bookdetails /> */}
            </BottomContainer>
          </Item>
          )
        })   } 
        
 
      </Wrapper>
}
    </div>
  );
}




/**{
      title: "Harry Potter Deathly Hallows",
      author: "JK Rowling",
      img: "",
      distance: "55",
      description: "blah blah hla jiol lasl asdad",
    },
    {
      title: "Sherlock Holmes",
      author: "Arthur conan doyle",
      img: "",
      distance: "23",
      description: "blah Sherlock blah hla jiol lasl asdad",
    },
    {
      title: "Games of Thrones",
      author: "George Raymond",
      img: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      distance: "2",
      description: "blah blah hla jiol lasl asdad",
    },
    {
      title: "DSA3",
      author: "Narsgima",

      distance: "87",
      description: "blah blah hla jiol lasl asdad",
    },
    {
      title: "DSA2",
      author: "Narsgima",

      distance: "87",
      description: "blah blah hla jiol lasl asdad",
    },
    {
      title: "DSA1",
      author: "Narsgima",

      distance: "87",
      description: "blah blah hla jiol lasl asdad",
    }, */