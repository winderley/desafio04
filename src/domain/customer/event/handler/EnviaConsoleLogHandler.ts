import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerChangeAdressEvent from "../customer-change-address.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogHandler  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerChangeAdressEvent): void {
    console.log("Endereço do cliente: ", event.eventData.id," ",event.eventData.name," alterado para: ",
    event.eventData.address.street,
    event.eventData.address.number,
    event.eventData.address.zip,
    event.eventData.address.city); 
  }
}
