import React, {PureComponent} from 'react';
import { listOrders } from '../../../sdk/listOrders';
import { deliverOrder } from '../../../sdk/deliverOrder';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';

const ORDER_STATUSES = {
  1: 'Esperando impresora',
  2: 'Imprimiendo',
  3: 'Esperando retiro',
  4: 'Entregada'
}

const ORDER_STATUSES_TO_CLASSES = {
  0: classes.orderWaiting,
  1: classes.orderWaiting,
  3: classes.orderReadyToBeDelivered,
  4: classes.orderDelivered,
}


class OrdersListComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'orders': [],
    'displayDeliverModal': false,
    'selectedOrder': null,
    'search': '',
  }

  handleSearchChange = (event) => {
    // TODO add request to handle search
  }

  handleListOrders = (response) => {
    this.setState(response);
  }

  handleListOrdersError = (error_message) => {
    console.log(error_message);
  }

  handleCloseModal = () => {
    this.setState({'displayDeliverModal': false, 'selectedOrder': null});
  }

  handleOpenModal = (orderId, orderStatus) => {
    if (orderStatus == 3){
      this.setState({'displayDeliverModal': true, 'selectedOrder': orderId});
    }
  }

  handleDeliverOrderSuccess = () => {
    listOrders(
      this.handleListOrders,
      this.handleListOrdersError,
      sessionStorage.getItem('token'),
    );
    this.setState({'displayDeliverModal': false, 'selectedOrder': null});
  }

  handleDeliverOrder = () => {
    deliverOrder(
      this.handleDeliverOrderSuccess,
      (error_message) => {console.log(error_message)},
      this.state.selectedOrder,
      sessionStorage.getItem('token'),
    )
  }

  componentDidMount () {
    listOrders(
      this.handleListOrders,
      this.handleListOrdersError,
      sessionStorage.getItem('token'),
    );
  }

  render () {

    return (
    <div>
      { this.state.displayDeliverModal ?
        <SimpleModal
          handleClickClose={() => this.handleCloseModal()}
        >
        <div className='text-center'>
          <h2>¿Esta seguro de que desea entregar la orden {this.state.selectedOrder}?</h2>
          <PrimaryButton
            handler={() => this.handleCloseModal()}
            text='Cancelar'
            className='mr-4'
          />
          <OutlineSecondaryButton
            text='Aceptar'
            handler={ () => this.handleDeliverOrder() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de ordenes</h1>
              </div>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                  <th scope="col">Precio</th>
                  <th scope="col">Codigo de seguridad</th>
                  <th scope="col">Impresora</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.orders.map(
                (order) => {
                  return <tr
                        className={ classes.highLightedRow }
                        key={order.id}
                    >
                    <th scope="row">{order.id}</th>
                    <td>{order.model.name}</td>
                    <td>{(order.user) ?
                      `${order.user.name} ${order.user.lastname}` :
                      ''
                    }</td>
                    <td>{ORDER_STATUSES[order.status]}</td>
                    <td>
                      <i className={`fas fa-circle ${ORDER_STATUSES_TO_CLASSES[order.status]}`}></i>
                    </td>
                    <td>{order.price}</td>
                    <td>{order.hash}</td>
                    <td>{(order.printer) ? order.printer.name : ''}</td>
                    <td>
                      <OutlineSecondaryButton
                        className={(order.status == 3) ? 'enabled': 'disabled'}
                        text='Entregar'
                        handler={() => this.handleOpenModal(order.id, order.status)}
                      />
                    </td>
                  </tr>
                }
              )
            }
              </tbody>
            </table>
        </div>
    </div>
    );
  }
}

export default OrdersListComponent;
