import React from 'react';
import Container from '../../hoc/Container';
import Row from '../../hoc/Row';
import Column from '../../hoc/Column';


const HorizontalSection = (props) => {
    return (
      <section className='pt-5'>
        <Container>
          <Row>
            <Column number='12'>
              <h2 className="text-gray font-light">{props.text}</h2>
            </Column>
          </Row>
          <Row>
            {props.children}
          </Row>
      </Container>
      </section>
    );
}

export default HorizontalSection;
