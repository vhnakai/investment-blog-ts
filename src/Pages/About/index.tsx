import React from 'react';
import { AboutContainer, AboutJumbotron } from './styles';

import Footer from '../../Components/Footer';



const About: React.FC = () => {
  return (
    <>
      <AboutJumbotron fluid>
        <h1>Sobre</h1>
      </AboutJumbotron>
      <AboutContainer>
        <h2>
            Nossa missão é trazer informações para as pessoas
          sobre investimentos, visando algo mais do que
          apenas a rentabilidade. Queremos mostrar que
          investir não significa apenas “ganhar dinheiro”
          mas também contribuir com a sociedade, apoiando
          uma área, causa ou segmento que você acredita.
        </h2>
        <h2>
          Geralmente, quando se fala em investimentos em
          renda variável a primeira coisa que vem em mente
          da maioria das pessoas, é bolsa de valores. Todavia,
          nós mostraremos que existem opções além de ações
          e fundos imobiliários, e que você pode contruibuir
          com o empreendedorismo do pais investindo em
          pequenas e médias empresas, além de startups.
        </h2>
        <h2>
          Também iremos falar sobre ações, mas de outro modo.
          Ao invés de apenas analizarmos os números e como
          o papel tem performado, queremos mostrar como
          você pode investir em segmentos espefícos e que
          que te agradem, como industria de games, produtos
          veganos, pet e muitos outros.
        </h2>
      </AboutContainer>
      <Footer />
    </>
  );
};

export default About;
