import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-amber-300">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const {poison, setPoison, goal, setgoal, muscles, setMuscles, updateWorkout}=props;
  const [showModal, setShowModal] = useState(false);
  
  function toggleModal(){
    setShowModal(!showModal);
  }

   function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup))
            return;
        }

        if (muscles.length > 2) {
            return;
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            setShowModal(false);
            return;
        }

        setMuscles([...muscles, muscleGroup])
        if (muscles.length === 2) {
            setShowModal(false)
        }

    }

  return (
    <SectionWrapper
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
      id={'generate'}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border-3 px-4 duration-200 hover:border-amber-700 py-3 rounded-lg " +
                (type === poison ? "border-amber-800" : "border-amber-300")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for anhnihilation"}
      />
      <div className="bg-amber-950  border border-solid border-amber-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length === 0 ? "Select Muscle Groups" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showModal && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  className={
                    "hover:text-amber-400 duration-400 " +
                    (muscles.includes(muscleGroup) ? "text-amber-400" : "")
                  }
                  key={muscleGroupIndex}
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select the your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((schemes, schemesIndex) => {
          return (
            <button
              onClick={() => {
                setgoal(schemes);
              }}
              className={
                "bg-amber-950 border-3 px-4 duration-200 hover:border-amber-600 py-3 rounded-lg " +
                (schemes === goal ? "border-amber-800" : "border-amber-300")
              }
              key={schemesIndex}
            >
              <p className="capitalize">{schemes.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={'Formulate'}/>
    </SectionWrapper>
  );
}

//whenever using map, we have to give the parent element within the return statement a key. That key needs to be unique. We preferably can give  the index as a key as there is only one instance of each index.


//{showModal && (....)} 
//In React JSX, the pattern
// { condition && <SomeComponent /> }
// means:
// If condition is true → React will render <SomeComponent /> (or whatever is on the right side of &&).
// If condition is false → React renders nothing in that spot (basically ignores the right side).



// //2️⃣ muscles.join(" ") — The .join() method

// join() is an array method in JavaScript.

// Syntax:

// array.join(separator)


// array = the array you want to turn into a string.

// separator = what you want between each element when they’re joined into a single string.