import styled from "styled-components";

const StyledListItem = styled.li`
  border: 1px solid white;
  border-radius: 4px;
  margin: 15px 0;
  ${props => props.coin && `
        &:hover{
            cursor: pointer;
        }
      `
  }
  
`

export default StyledListItem