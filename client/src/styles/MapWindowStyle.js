import styled from 'styled-components';

export const MapWindow = styled.div`
   input{
     height: 30px;
     width: 300px;  
     border-radius: 20px;
     border: none;
     padding-left: 8px;
     &:focus {
       outline: none;
     }
   }
   .suggestions{
     background-color: rgb(232,232,232);
     border-radius: 4px;
     padding-inline-start: 20px;
     li{
       list-style-type: none;
       margin: 2px 0;
       cursor: pointer;
       &:hover{
         color: rgb(54,154,255);
       }
     }
     .active{
      color: rgb(119,187,255);
    }
   }
   .mapboxgl-control-container{
     width: 100%;

     .mapboxgl-ctrl-top-right{
      margin-left: 3%;
      margin-top: 6px;
      right: initial;
      top: initial;
      left: initial;
    }
   }
   .geocoder-pin-right{
     display: none;
   }
   
`;