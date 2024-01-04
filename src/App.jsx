import { useState,useCallback,useEffect } from "react";

function App() {
  const [length,setLength] = useState(8);
  const [isNumber,setIsNumber] = useState(false);
  const [isChar,setIsChar] = useState(false);
  const [password,setPassword] =  useState('');
  const [copyMessage,setCopyMessage] = useState('');

  const passwordGenerator = ()=>{
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber){
      string = string + "1234567890";
    }
    if(isChar){
      string = string + "@#$%&";
    }
    for(let i=0;i<length;i++){
      password = password + string.charAt(Math.floor(Math.random()*string.length));
    }
    setPassword(password);
  }

  useEffect(()=>{
    passwordGenerator();
  },[length,isChar,isNumber]);

  const copyToClipBoard = ()=>{
    navigator.clipboard.writeText(password);
    setCopyMessage('copied to clipboard');
    setTimeout(()=>{
      setCopyMessage('');
    },3000)
}

  return (
    <>
    <div className="w-full h-screen bg-blue-950 flex flex-col justify-center">
      <div>
      <h1 className="text-white text-2xl text-center py-4">Random password generator</h1>
      <form className="text-white text-xl flex flex-col gap-2 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="length">password length:- {length}</label>
          <input value={length} type="range" name="length" id="length" min={6} max={30} onChange={(e)=>setLength(e.target.value)}/>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="isNumber">Numbers</label>
          <input checked={isNumber} onChange={(e)=>setIsNumber(e.target.checked)} type="checkbox" name="isNumber" id="isNumber"/>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="isChar">Characters</label>
          <input checked={isChar} onChange={(e)=>setIsChar(e.target.checked)} type="checkbox" name="isChar" id="isChar" />
        </div>
      </form>
      <div className="flex  justify-center text-black my-4 text-xl bg-white p-2 rounded-lg gap-4 items-center border-2 border-blue-500 mx-auto w-1/2">
        <p>password:- {password} </p>
        <button className=" bg-green-300 p-2 rounded-lg" onClick={copyToClipBoard}>copy password</button>
      </div>
      <p className="text-green-200 text-center">{copyMessage}</p>
      </div>
    </div>
    </>
  )
}

export default App
