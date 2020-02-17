import React, {PureComponent} from 'react';
import { getUserOrders } from '../../sdk/getUserOrders';
import { deleteMaterial } from '../../sdk/deleteMaterial';
import classes from './ManageOrdersComponent.module.css';
import SimpleModal from '../../components/Modal/SimpleModal';
import SimpleMap from '../../components/SimpleMap/SimpleMap';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';

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

class ManageOrdersComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'orders': [],
    'search': '',
  }

  handleSearchChange = (event) => {
    // TODO add request to handle search
  }

  handleListUserOrders = (response) => {
    this.setState(response);
  }

  handleListUserOrdersError = (error_message) => {
    console.log(error_message);
  }

  componentDidMount () {
    const { user } = this.context;
    getUserOrders(
      this.handleListUserOrders,
      this.handleListUserOrdersError,
      user.id,
      sessionStorage.getItem('token'),
    );
  }

  render () {

    return (
    <div>
        <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                  <th scope="col">Precio</th>
                  <th scope="col">Codigo de seguridad</th>
                  <th scope="col">Dirección de retiro</th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.orders.map(
                (order) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={order.id}
                    >
                    <th scope="row">{order.id}</th>
                    <td>{order.model.name}</td>
                    <td>{ORDER_STATUSES[order.status]}</td>
                    <td>
                      <i className={`fas fa-circle ${ORDER_STATUSES_TO_CLASSES[order.status]}`}></i>
                    </td>
                    <td>{order.price}</td>
                    <td>{order.hash}</td>
                    <td>{

                      (order.printer) ?
                        <div>
                          {order.printer.address.name}
                        <SimpleMap
                          lat={order.printer.address.latitude}
                          lng={order.printer.address.longitude}
                          height='100px'
                          width='300px'
                        />
                        </div>
                      :
                      order.printer}</td>
                  </tr>
                }
              )
            }
              </tbody>
            </table>
    </div>
    );
  }
}

export default ManageOrdersComponent;
