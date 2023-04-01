import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const RoomSec = styled.div`
    color: #f4f5fc;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 75vh;
    background: ${({ lightBg }) => (lightBg ? '#f4f5fc' : '#24293e')};
    
`;

export const CustomInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    border: 1px solid #ced4da;
    &:focus {
        outline: none;
        border-color: #86b7fe;
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }
`;

export const CustomButton = styled(Button)`
    height: 100%;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    margin-left: -1px; // Adjust this value to make the input and button touch.
`;