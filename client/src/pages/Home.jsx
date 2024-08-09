import React from 'react'
import { Link}  from 'react-router-dom';

export default function Home() {
    return (
      <div>
             <h1>Sheck Navi</h1>
             <Link to='/Exhibits'>
            <button>Welcome</button>
        </Link>
      </div> 
      
    );
  }
  