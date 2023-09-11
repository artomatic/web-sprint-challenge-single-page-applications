import styled from 'styled-components'

const Input = styled.div `
  padding: 2em;
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

const Form = (props) => {

    return (

      
      <form id="pizza-form" onSubmit={props.submit} style={{height: '100%'}}>
        <FormDiv>
        <h2>Order using this form</h2>

        <Input>
        {props.errors.name && <div className="validation">{props.errors.name}</div>}
        <label> Name </label>
        <br/>
        <input type="text" id="name-input" name="name" value={props.formData.name} onChange={props.change}/>
        </Input>

        <Input>
        {props.errors.size && <div className="validation">{props.errors.size}</div>}
          <select id="size-dropdown" name='size' value={props.formData.size} onChange={props.change}>
            <option value={0}>select a size</option>
            <option value={1}>small</option>
            <option value={2}>medium</option>
            <option value={3}>large</option>
          </select>
        
        </Input>

        <Input>
        <label> Olives
          <input type="checkbox" name="olives" checked={props.formData.olives} onChange={props.change}>
          </input>
        </label>

        <label> Bacon
          <input type="checkbox" name="bacon" checked={props.formData.bacon} onChange={props.change}>
          </input>
        </label>

        <label> Tomatoes
          <input type="checkbox" name="tomatoes" checked={props.formData.tomatoes} onChange={props.change}>
          </input>
        </label>

        <label> Peppers
          <input type="checkbox" name="peppers" checked={props.formData.peppers} onChange={props.change}>
          </input>
        </label>
        </Input>

        <Input>
        <label> Special Instructions </label>
        <br/>
        <input type="text" id="special-text" name='specialInstructions' value={props.formData.specialInstructions} onChange={props.change}>
        </input>
        </Input>

        <Input>
          <button type="submit" disabled={props.disabled} id='order-button'>Add To Order</button>
        </Input>
        </FormDiv>
      </form>

      

    )
  }

  export default Form