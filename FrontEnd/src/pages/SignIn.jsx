import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {

  const [formData, setFormData] = useState({});
 const { loading, error: errorMessage }= useSelector(state => state.user);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if(!formData.email || !formData.password)
  { 
    return dispatch(signInFailure('Please fill out all feilds.'));
  }
  try{
    dispatch(signInStart());
   const res = await fetch('/api/auth/signin', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if(data.success === false)
   {
    dispatch(signInFailure(data.message));
   }
   if(res.ok)
   {
    dispatch(signInSuccess(data));
    navigate('/home?tab=notes');
   }
  }
  catch(error)
  {
    dispatch(signInFailure(error.message));
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md px-6 py-12 bg-white rounded-lg shadow-lg">
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 underline">Sign In</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
                ) : ('Sign In') 
              }
        </Button>
      </form>
    </div>
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        <span>Don't have an account?</span> 
        <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
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
