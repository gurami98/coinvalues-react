import styled from "styled-components";

const StyledList = styled.ul`
  padding: 0 50px 50px;
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
  ${props => props.header && `
        padding: 0;
        padding-top: 50px;
      `    
  }
`

export default StyledList