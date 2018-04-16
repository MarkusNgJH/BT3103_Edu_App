import React, { Component } from 'react';

function CustomToolTip (tooltipProps) {
  // if(tooltipProps['payload'].length != 0){
  //   console.log(tooltipProps['payload'][0]['payload'])
  // }
  
  return(
    <div>
      {tooltipProps['payload'].length != 0 ?
      <div style={{backgroundColor: "white", border: '1px solid gray', padding: '5px'}}>
        {Object.keys(tooltipProps['payload'][0]['payload']).map((i)=>
            tooltipProps['payload'][0]['payload'][i] > 0 ?
            <li key ={i}>{i}: {tooltipProps['payload'][0]['payload'][i]}</li>
            :
            <span></span> 
        )}
      </div>
      :
      <div>No Activity</div>
      }
    </div>
    )
  }

export default CustomToolTip;