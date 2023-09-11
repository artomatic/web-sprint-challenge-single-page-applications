import './App.css'
import React, { useEffect, useState } from "react";
import {Link, Routes, Route} from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'
import Form from './Components/Form'
import Home from './Components/Home'

const errorsList = {
  nameRequired: 'please enter your name',
  nameMax: 'name must be at least 2 characters',
  sizeRequired: 'you must select a size',
}

const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(errorsList.nameRequired)
    .min(2, errorsList.nameMax),
  size: Yup
   .string()
   .oneOf(['1', '2', '3'], errorsList.sizeRequired),
  olives: Yup.bool(),
  bacon: Yup.bool(),
  tomatoes: Yup.bool(),
  peppers: Yup.bool(),
  specialInstructions: Yup
    .string()
})

const NavBar = styled.div `
  font-weight: 800;
  background-color: lightgray;
  height: 100%;
  padding: 25px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
  color: black;
`
const HomeButton = styled.div `
  align-self: left;
  color: black;
  padding: 2%;
  margin: 0;

`

const OrderButton = styled.div `
  align-self: right;
  padding: 2%;
  margin: 0;
`;

const App = () => {

  const initialErrors = () => {
    return {
    name: '',
    size: '',
    }
  }

  const initialFormData = () => {
    return (
      {
        name: '',
        size: '',
        olives: false,
        bacon: false,
        tomatoes: false,
        peppers: false,
        specialInstructions: '',
      }
    )
  }

  const change = (evt) => {
    let {name, type, value, checked} = evt.target
    value = type === 'checkbox' ? checked : value
    setFormData( {...formData, [name]: value})

    Yup.reach(formSchema, name).validate(value) 
      .then (setErrors({...errors, [name]: ''}))
      .catch ( (err) => setErrors({...errors, [name]: err.errors[0]}))
  }

  const submit = (event) => {
    event.preventDefault()

    const dataToSubmit = {
      name: formData.name,
      size: formData.size,
      olives: formData.olives,
      bacon: formData.bacon,
      tomatoes: formData.tomatoes,
      peppers: formData.peppers,
      specialInstructions: formData.specialInstructions
    }  
    axios.post('https://reqres.in/api/orders', dataToSubmit)  
      .then (res => {
        console.log(res)
      })
      .catch (err => {
        console.log(err)
      })
    setFormData(initialFormData())
  }

  const [disabled, setDisabled] = useState(true)
  const [formData, setFormData] = useState(initialFormData())
  const [errors, setErrors] = useState(initialErrors())

  useEffect( () => {
    formSchema.isValid(formData)
      .then(valid => setDisabled(!valid))
  }, [formData]);

  return (
    <>
    <NavBar>
        <HomeButton>
          <Link to="/" style={{color: 'black', textDecoration: 'none'}}>Home</Link>
        </HomeButton>

        <OrderButton>
          <Link to="pizza" id="order-pizza" style={{color: 'black', textDecoration: 'none'}}>Order Pizza</Link>
        </OrderButton>
    </NavBar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="pizza" element={<Form 
        change={change} 
        submit={submit} 
        errors={errors}
        formData={formData}
        disabled={disabled}
        />}></Route>
      </Routes>
    </>
  );
}

export default App;
