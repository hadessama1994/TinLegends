import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import {PropagateLoader} from "react-spinners";

export const PromiseLoader = (props) => {
const { promiseInProgress } = usePromiseTracker();

  return (
   <div class="d-flex justify-content-center pt-2">
    {
      (promiseInProgress === true) ?
        <PropagateLoader
        size={18} color={"#ffcc00"} />
      :
        null
    }
  </div>
  )
};