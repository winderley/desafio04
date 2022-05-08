
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handle from "./handler/EnviaConsoleLog1Handler";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog2Handle from "./handler/EnviaConsoleLog2Handler";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import EnviaConsoleLogHandler from "./handler/EnviaConsoleLogHandler";
import Customer from "../entity/customer";
import Address from "../value-object/address";

describe("Domain customer events tests", () => {

  it("should notify customer created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handle;
    const eventHandler2 = new EnviaConsoleLog2Handle;
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      description: "Customer 1 description",
     
    });

    
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify customer change address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler;
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);

   const address2 = new Address("Street 2", 999, "99999-999", "Brasilia");

   customer.changeAddress(address2);

   expect(customer.isActive()).toBe(true);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeUndefined();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
       
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
      description: "Customer changed Address",
     
    });

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();

  });

});
