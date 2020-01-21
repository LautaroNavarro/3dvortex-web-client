import React, {PureComponent} from 'react';
import Row from '../../../hoc/Row';
import Column from '../../../hoc/Column';
import classes from './PrintModelForm.module.css';

class PrintModelForm extends PureComponent {

  render () {
    return (
      <div>
          <div>
          <h1> Imprimir ModelName </h1>
            <form className='pl-4 pr-4'>
              <div className='form-group'>
                <label htmlFor='input_material'>Material</label>
                <select className='browser-default custom-select'>
                  <option selected>PLA</option>
                  <option value='1'>ABS</option>
                  <option value='2'>PVA</option>
                  <option value='3'>PET</option>
                </select>
              </div>
             <div className='form-group'>
                <label htmlFor='input_scale'>Escala</label>
                <input
                  type='number'
                  min='0'
                  className='form-control'
                  id='input_scale'
                  aria-describedby='scaleHelping'
                  placeholder='1'
                  />
                <span className='blockquote-footer'>Altura: 1cm. Ancho: 1 cm.</span>
              </div>
              <div className='form-group'>
                <label htmlFor='input_material'>Dirección</label>
                <select className='browser-default custom-select'>
                  <option selected>Casa</option>
                  <option value='1'>Otra cosa</option>
                  <option value='2'>Otra direccion</option>
                  <option value='3'>Esta es otra</option>
                </select>
              </div>
              <Row>
                <Column number='6'>
                  <div className={classes.Price}>
                    <div>
                      <span>Precio: </span>
                      <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <span style={ {'display': 'none'} }>$120</span>
                    </div>
                  </div>
                </Column>
              </Row>
              <Row className='pt-3'>
                <Column number='12'>
                  <button className="btn btn-primary btn-block" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Calculando precio...</span>
                    <span style={ {'display': 'none'} }> Imprimir </span>
                  </button>
                </Column>
              </Row>
            </form>
          </div>
      </div>
    );
  }
}

export default PrintModelForm;
