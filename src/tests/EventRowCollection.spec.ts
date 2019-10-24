import { Salary } from '../models/EventRowType/Salary';
import { PayrollEvent } from '../models/PayrollEvent';
import { EventRowCollection } from '../models/EventRowCollection';

describe('Event Row Collection usage suite', () => {
  describe('general properties and methods', () => {
    const event = new PayrollEvent(1000);
    let eventRowCollection: EventRowCollection;

    beforeEach(() => {
      eventRowCollection = new EventRowCollection(event);
    });

    it('addRow should add row to event rows', () => {
      const eventRowsLength = eventRowCollection.eventRows.length;
      eventRowCollection.addRow(Salary);
      expect(eventRowCollection.eventRows.length).toBe(eventRowsLength + 1);
    });

    it('findRow should return event rows based on its class', () => {
      eventRowCollection.addRow(Salary);
      const findRow = eventRowCollection.findRow(Salary);
      expect(findRow && findRow.type).toBe(Salary);
    });
  });
});
