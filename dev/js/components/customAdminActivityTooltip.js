import React, { Component } from 'react';

function CustomToolTip (tooltipProps) {
  // if(tooltipProps['payload'].length != 0){
  //   console.log(tooltipProps['payload'][0]['payload'])
  // }
  
  return(
    <div>
      {tooltipProps['payload'].length != 0 ?
      <div>
        {Object.keys(tooltipProps['payload'][0]['payload']).map((i)=>
            tooltipProps['payload'][0]['payload'][i] > 0 ?
            <li key ={i}>{i}: {tooltipProps['payload'][0]['payload'][i]}</li>:
            <span></span> 
        )}
      </div>
      :
      <span></span>
      }
    </div>
    )
  }

export default CustomToolTip;