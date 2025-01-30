"use client";
import {OrbitProgress} from 'react-loading-indicators'
export default function Loading() {
    return (
      <div className='flex-1 flex align-middle justify-center'>
        <div className='flex self-center'>
          <OrbitProgress color="rgba(243, 94, 67,1)" size="medium"/>
        </div>
      </div>
    );
  }
  