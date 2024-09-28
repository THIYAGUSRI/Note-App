import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if(!formData.username || !formData.email || !formData.password)
  { 
    return setErrorMessage('Please fill out all feilds.')
  }
  try{
    setLoading(true);
    setErrorMessage(null);
   const res = await fetch('/api/auth/signup', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if(data.success === false)
   {
    return setErrorMessage(data.message);
   }
   setLoading(false);
   if(res.ok)
   {
    navigate('/');
   }
  }
  catch(error)
  {
    setErrorMessage(error.message);
    setLoading(false);
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md px-6 py-12 bg-white rounded-lg shadow-lg">
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 underline">Sign Up</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput 
            id="username" 
            type="text" 
            className="w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter the Name..." 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-4">
          <TextInput 
            id="email" 
            type="email" 
            className="w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter the Email..." 
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <TextInput 
            id="password" 
            type="password" 
            className="w-full px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Enter the Password..." 
            onChange={handleChange}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full rounded-md text-white "
          gradientDuoTone='purpleToBlue'
          disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>loading...</span>
                  </>
                ) : ('Sign Up') 
              }
        </Button>
      </form>
    </div>
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
       <span>Already have an account?</span> 
        <Link to="/" className="text-blue-500 hover:underline"> Sign In</Link>
      </p>
    </div>
          {
            errorMessage &&(
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
  </div>
</div>
  )
}
