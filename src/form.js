import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {operatorID} from './select';
import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
import { ErrorMessage } from '@hookform/error-message';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const PayForm = () => {
	const { register, handleSubmit, getValues, control, setError,
			formState: { 
						isSubmitSuccessful,
						reset,
				 		isSubmitting,
						isValid,
						touchedFields,
						dirtyFields,
						isDirty,
						errors,
						 } 
			} = useForm({
						mode: 'onChange',
						defaultValues: {
										amount: '100',
										phone: ''
						}
			});
    console.log('is valid', isValid, 'is dirty', isDirty);

	let data = '';
    let navigate = useNavigate();
	let provider = operatorID.Provider.value;
	const [state, setState] = useState(0);
	const inputRef = React.createRef();
	const MAX_AMOUNT = 200;
	const withValueLimit = ({ floatValue }) => floatValue <= MAX_AMOUNT;
	const postData = (data) =>{
		return true
	}
    const onSubmit = async (data) => {
    	const result = await postData(data);
    	if (result == true) {
    	let adata = {carrier: provider, data: JSON.stringify(data)};
    	console.log(adata);
    	navigate('/');}
    	else {

    	}
    };

    let PhoneNum='';

    const validatePhoneNumber = (value) => {
    	const purePhone = PhoneNum + value.replace(/\+|-|_|\(|\)| /g, '');
    	console.log(purePhone);
    	if (purePhone.length == 10) {
    		return true
    	}
    	else {
    		return false
    	}
    }

    return (
    <div>
 	<h3>Selected carrier {provider} </h3>
    <div>
      	<form onSubmit={handleSubmit(onSubmit)}>
      	<section>

      	<div>
     	<label>Maximum amount is 200</label>
		</div>
		    <input id='money'	
		    	{...register('amount', {
		    		required: 'is required',
		    		pattern: { value: /^['0-9.,\b]+$/,
		    					message: 'enter number please'
		    				},
		    		min: { value: 1, message: 'minimum is 1'},
		    		max: { value: 200, message: 'maximum is 200'}
		    		}

		    	)}
		    	type='text'
		    />
			{errors?.amount && <span role='alert'>{errors?.amount?.message}</span>}
		</section>

		<p></p>
	
      	<section>
      	<div><label>Phone Number (10 digit number)</label></div>
      		<Controller
      			rules={	{ required: true },
            			{ validate: {validatePhoneNumber}, message:'phone not valid' }  
      			}
    			name='phone'
    			control={control}
    			render={({ field: { onChange, name, value } }) => (
    					<NumberFormat 
      						onChange={onChange}
      						getInputRef={inputRef} 
      						customInput={TextField}
      						placeholder='(___) ___-____'
      						format='(###) ###-####' mask='_'
      					/>

      			)}
     		/>
		{errors.phone && <span role='alert'>{errors.phone.message}</span>}

      	</section>

      	<p>
       	<input type="submit" />
       	</p>

      </form>
    </div>
	</div>
      );
};

export default PayForm