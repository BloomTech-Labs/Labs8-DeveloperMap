import React from 'react';
import styled from 'styled-components';
import logo from '../../images/mainlogo.png';
import planet from '../../images/planet.png';


class Intro extends React.Component{

    switchPage = () => {
        this.props.history.push('/tutorial/gettingstarted');
    }
    render() {
    return (
        <IntoContainer>
            <h1>
                Welcome to  <span><img src={logo} alt="" style={{ width: '200px' }}/></span>
            </h1>
            <p>
                MappaJob is the best way to find developer jobs in your area. Planning on 
                relocating? Search for a city or town that you are interested and see 
                how many companies and developers are currently in that area. You can favorite 
                jobs that you like as a developer, and if your a company, you can click on any 
                of the developers to see what they can offer your company! Either way, let 
                MappaJob help make your experience as a developer or employer an easier one.
            </p>
            <img src={planet} alt="" style={{ width: '300px' }}/>
            <button onClick={this.switchPage}>Next</button>
        </IntoContainer>

    );
    }
}

const IntoContainer = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1{
      margin-bottom: 35px;
      display: flex;
      align-items: center;
  }
  p{
      line-height: 1.25;
      max-width: 500px;
      margin-bottom: 10px;
  }
`;

export default Intro;