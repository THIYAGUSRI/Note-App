import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSlider() {
    const location = useLocation();
  const [ tab, setTab ] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if(tabFromUrl)
    {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/home?tab=notes'>
                <Sidebar.Item active={tab === 'notes'} className='mb-2'>
                    view Notes
                </Sidebar.Item>
                </Link>
                <Link to='/home?tab=create'>
                <Sidebar.Item active={tab === 'create'} className='mb-2' >
                    Create Note
                </Sidebar.Item>
                </Link>
                <Link to='/home?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} className='mb-2'>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item onClick={handleSignout} className='cursor-pointer'>
                   Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
