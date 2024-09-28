import { TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice.js';

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignout = async () => {
      try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
              dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
    };

  return (
    <div className='max-w-lg mx-auto p-5 w-full'>
        <h1 className='my-7 text-3xl font-semibold text-center'>Profile</h1>
        <form className='flex flex-col gap-4 '>
            <div className='w-32 h-32 self-center cursor-pointer shadow-sm overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt="UserProfile" className='rounded-full object-cover w-full h-full border-8 border-[lightgray]' />
            </div>
            <TextInput id='username' placeholder='Name...' type='text' defaultValue={currentUser.username}/>
            <TextInput id='email' placeholder='Email...' type='email' defaultValue={currentUser.email}/>
            <TextInput id='password' placeholder='Password...' type='password' defaultValue='**********'/>
        </form>
        <div onClick={handleSignout} className='flex items-center justify-center mt-3 border border-red-500 rounded-lg text-red-500 text-xl p-1 hover:bg-red-500 hover:text-white'> Sign Out</div>
    </div>
  )
}
