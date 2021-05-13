import React from "react";
import "./Mainsxn.css";
import { Stack } from "./Stack";
import styled from "styled-components";
import { Gmcard } from "./Gmcard";

import BookImg from "../Swipe/image.png";
import { Bookdetails } from "./Bookdetails";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  margin-top: .77em;
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

export default function App() {
  const Wrapper = styled(Stack)``;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

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

  return (
    <div className="Mainsxn" >
      <Wrapper
        onVote={(item, vote) => console.log(item.props, vote)}
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.16}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <Item
          data-value="waffles"
          whileTap={{ scale: 1.15 }}
          style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
          drag
          dragElastic={0.12}
        >
            <Genre style={{ rotate: "-8deg", paddingTop: "0em" }}>Horror</Genre>
          <TopContainer>
            <BookWrapper>
              <Book
                style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
                //   drag
                dragElastic={0.12}
                whileTap={{ cursor: "grabbing" }}
              >
                <img src={BookImg} />
              </Book>
            </BookWrapper>
          </TopContainer>
            
          {/*  🥞🍩 */}
          <BottomContainer>
            <Bookdetails />
          </BottomContainer>
        </Item>
      </Wrapper>
    </div>
  );
}
