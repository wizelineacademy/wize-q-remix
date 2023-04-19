import styled from 'styled-components';
import botImage from 'app/images/logo_answerbot.png';

export const BotButton = styled.button`
    background-color: #213246;
    border: 1px solid transparent;  // Establece el borde, si no, se establece uno por default.
    color: #fff; // Color Text
    width: 360px;
    height: 150px;
    margin: 75% 0 0 0; // Arriba - Derecha - Abajo - Izquierda
    float: right;
    // left: 12%;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5); // Horizontal - Vertical - Difuminado - Radio
    position: relative;
    overflow: hidden;
    transform: translateX(57%);
    transition: transform 0.5s ease-in-out;
    // transition: left 0.3s ease-in-out;

    ::before {
      content: ""; // Contenido dentro del circulo
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff; // Establece el color de fondo del círculo
      border: 0px solid transparent;
      background-image: url(${botImage}); // Establece la imagen de fondo del círculo
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 7.5%; // Ajusta la posición horizontal del círculo dentro del botón
      top: 50%; // Ajusta la posición vertical del círculo dentro del botón
      z-index: 9999;
      transform: translateY(-50%); // Ajusta la posición vertical del círculo en relación al centro del botón
    }

    ::after {
        content: "Hi, I'm AnswerBot! Ask me anything!";
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        left: 38%;
        right: 5%;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    &:hover {
        left: 0%;
        transform: translateX(0%);

        ::after {
            opacity: 1;
        }
    }
`;