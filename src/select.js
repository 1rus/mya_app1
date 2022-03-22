import React, {createContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4f4f7f;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  outline: 1;
  text-transform: uppercase;
  margin: 20px 10px;
  cursor: pointer;
  box-shadow: 5px 7px 8px lightgray;
  transition: ease background-color 250ms;
`;
const ButtonToggle = styled(Button)`
  opacity: 0.5;
${({ active }) => active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div` 
`;
const operators = ['MTS', 'Beeline', 'Megafon'];
const operatorID = createContext();

function Select() {  
	const [active, setActive] = useState(operators[0]);
  const navigate = useNavigate();
	const handleClick = () => {
      operatorID.Provider.value = active;
      console.log(operatorID.Provider.value);
      navigate('./form');
    }
    return  (
      <><h2>Select your mobile carrier</h2>
            <ButtonGroup>
               {operators.map(type => (
               						<ButtonToggle
               							key={type}
               							active={active === type}
               							onClick={() => setActive(type)}               					
               							> {type}
               						</ButtonToggle>	
             	))}
            </ButtonGroup>
            <Button onClick={() => handleClick()}>
            Proceed to payment
            </Button>
      </>
    );
}



export default Select;
export {operatorID};