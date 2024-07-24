import { useState, useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="@#$&"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length,numAllowed,charAllowed,setPassword])

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current.select()
    
    window.navigator.clipboard.writeText(password)
  },[password])



  useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md bg-gray-700 shadow-md mx-auto rounded-lg my-8 py-3 px-4 text-orange-500'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Password' ref={passwordRef} readOnly></input>
          <button onClick={copyToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex gap-x-1 items-center'>
            <input type='range' min={4} max={35} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}></input>
            <label>Length:{length}</label>
          </div>
          <div className='flex gap-x-1 items-center'>
            <input type='checkbox' defaultChecked={numAllowed} id='numberInput' onChange={()=>{setNumAllowed((prev)=>!prev)}} ></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex gap-x-1 items-center'>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={()=>{setCharAllowed((prev)=>!prev)}} ></input>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
