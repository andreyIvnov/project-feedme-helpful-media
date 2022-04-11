import React from 'react';
import {Rings} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Rings
        color="#ea580c"
        height={80}
        width={230}
        className="m-5"
      />
      <br/>
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;