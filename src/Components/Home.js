import styled from 'styled-components'

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

  export default Home