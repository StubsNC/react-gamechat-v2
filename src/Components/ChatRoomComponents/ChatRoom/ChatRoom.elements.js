import styled from 'styled-components';

export const ChatRoomContainer = styled.div`
    color: #24293e;
    padding: 30px 80px; 
    background: ${({ lightBg }) => (lightBg ? '#f4f5fc' : '#24293e')};
    

`;

export const HeaderContainer = styled.header`
    background: #8ebbff;
    text-align: center;
    width: 100%;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

export const MessageListContainer = styled.div`
    background: #fff;
    justify-content: center;
    align-items: center;
    border: solid 3px white;
    border-radius: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif;
`;

