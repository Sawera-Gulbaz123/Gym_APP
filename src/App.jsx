
import { useState } from 'react'
import Generator from './components/Generator'
import Hero from './components/Hero'
import Workout from './components/Workout'
import './index.css'
import { generateWorkout } from './utils/functions'

function App() {
  const [workout, setWorkout]=useState(null);
  const [poison, setPoison]=useState('individual');
  const [muscles, setMuscles]=useState([]);
  const [goal, setgoal]=useState('strength_power');

  function updateWorkout(){
    if (muscles.length<1){
      return;
    }
    let newWorkout=generateWorkout({poison, muscles, goal});
    setWorkout(newWorkout);
    window.location.href='#workout';
  }

 return (
   <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
     <Hero />
     <Generator
       poison={poison}
       muscles={muscles}
       goal={goal}
       setgoal={setgoal}
       setPoison={setPoison}
       setMuscles={setMuscles}
       updateWorkout={updateWorkout}
     />
     {workout && (<Workout workout={workout} />)}
   </main>
 );
}

export default App
