import React from 'react';
//import { Link } from 'react-router-dom';
import { FooterContainer, FooterRow, FooterCol, FooterDiv } from './styles';
import { FiInstagram, FiFacebook } from 'react-icons/fi';


const Footer: React.FC = () => {

  return (
    <FooterDiv >
      <FooterContainer >
        <FooterRow>
          <FooterCol md>
            <h2>Logo</h2>
          </FooterCol>
          <FooterCol md>
            <h4>Contato</h4>
            <p>email@email.com</p>
          </FooterCol>
          <FooterCol md>
            <FiFacebook size={35} />
            <FiInstagram size={35} />
          </FooterCol>
          <FooterCol md>
            <h4>Feito por </h4>
            <p>Wellignton  e Vitor Hugo Nakai</p>
          </FooterCol>
        </FooterRow>
      </FooterContainer>
    </FooterDiv>

  );
};

export default Footer;
