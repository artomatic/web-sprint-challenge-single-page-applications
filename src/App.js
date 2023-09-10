import './App.css'
import React, { useEffect, useState } from "react";
import {Link, Routes, Route} from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'

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

const Input = styled.div `
  padding: 2em;
`

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
`

const Title = styled.h1 `
  margin: 0;
  text-align: center;
  background-color: darkred;
  padding-top: 2em;
  padding-bottom: 0.5em;
  color: white;
  font-size: 7em;
  font-family: cursive;
`

const Slogan = styled.h2 `
  font-size: 1em;
  /* padding: 11em; */
  text-align: center;
  vertical-align: top;
  height: 10em;
  padding: 2em;
  margin: 0;
  background-color: lightsalmon;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
  font-size: x-large;
`

const FormDiv = styled.div `
  display: flexbox;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-content: stretch;
  margin: 0;
  background-color: antiquewhite;
  height: 100%;
  padding: 10em;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

`









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
  }, [formData])

  
  const Form = () => {

    return (
      
      <form id="pizza-form" onSubmit={submit} style={{height: '100%'}}>
        <FormDiv>
        <h2>Order using this form</h2>

        <Input>
        {errors.name && <div className="validation">{errors.name}</div>}
        <label> Name </label>
        <br/>
        <input type="text" id="name-input" name="name" value={formData.name} onChange={change}/>
        </Input>

        <Input>
        {errors.size && <div className="validation">{errors.size}</div>}
          <select id="size-dropdown" name='size' value={formData.size} onChange={change}>
            <option value={0}>select a size</option>
            <option value={1}>small</option>
            <option value={2}>medium</option>
            <option value={3}>large</option>
          </select>
        
        </Input>

        <Input>
        <label> Olives
          <input type="checkbox" name="olives" checked={formData.olives} onChange={change}>
          </input>
        </label>

        <label> Bacon
          <input type="checkbox" name="bacon" checked={formData.bacon} onChange={change}>
          </input>
        </label>

        <label> Tomatoes
          <input type="checkbox" name="tomatoes" checked={formData.tomatoes} onChange={change}>
          </input>
        </label>

        <label> Peppers
          <input type="checkbox" name="peppers" checked={formData.peppers} onChange={change}>
          </input>
        </label>
        </Input>

        <Input>
        <label> Special Instructions </label>
        <br/>
          <input type="text" id="special-text" name='specialInstructions' value={formData.specialInstructions} onChange={change}>
          </input>
        
        </Input>

        <Input>
          <button type="submit" disabled={disabled} id='order-button'>Add To Order</button>
        </Input>
        </FormDiv>
      </form>
      

    )
  }

  const Home = () => {
    return (
      <>
      <div>
      <Title>Bloomtech Eats</Title>
      </div>
      <div>
      <Slogan>Grub before you type.</Slogan>
      </div>
      </>
    )
  }







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
        <Route path="pizza" element={<Form />}></Route>
      </Routes>

    </>
  );
  

};

export default App;
