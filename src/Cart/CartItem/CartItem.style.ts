import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightblue;
  padding: 10px;
  margin-bottom: 20px;

 .information, .buttons { 
   display: flex;
   justify-content: space-between;
 }

 div {
  flex: 1;
}
 
 p {
   margin: 10px 0;
 }

 img {
   max-width: 80px;
   height:100%;
   object-fit: cover;
   margin-left: 10%;
 }
`