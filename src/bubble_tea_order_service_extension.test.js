/* eslint-disable max-len */
const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
const BubbleTeaType = require('./bubble_tea_type');
jest.mock('./bubble_tea_messenger');
jest.mock('./simple_logger');

// Extension

const dummyPaymentDetails = {
  name: 'Some person',
  address: '123 Some Street',
  debitCard: {
    digits: '123456',
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

const oolongTeaOrder = {
  paymentDetails: dummyPaymentDetails,
  bubbleTea: {
    type: bubbleTeaType.OOLONGMILKTEA,
  },
};

const jasmineTeaOrder = Object.create(oolongTeaOrder);
jasmineTeaOrder.bubbleTea = BubbleTeaType.JASMINEMILKTEA;

const matchaTeaOrder = Object.create(oolongTeaOrder);
matchaTeaOrder.bubbleTea = BubbleTeaType.MATCHAMILKTEA;

const peachTeaOrder = Object.create(oolongTeaOrder);
peachTeaOrder.bubbleTea = BubbleTeaType.PEACHICETEA;

const lycheeTeaOrder = Object.create(oolongTeaOrder);
lycheeTeaOrder.bubbleTea = BubbleTeaType.LYCHEEICETEA;

describe(`test successful bubble tea order request using parameterised tests`, () => {
  it.each([
    [oolongTeaOrder, dummyPaymentDetails],
    [jasmineTeaOrder, dummyPaymentDetails],
    [matchaTeaOrder, dummyPaymentDetails],
    [peachTeaOrder, dummyPaymentDetails],
    [lycheeTeaOrder, dummyPaymentDetails],
  ])(
      `should return proper result when passed arguments are: %i, %i`,
      (teaOrder, dummyPaymentDetails) => {
        const newOrder = createOrderRequest(teaOrder);
        expect(newOrder.name).toBe(dummyPaymentDetails.name);
        expect(newOrder.digits).toBe(dummyPaymentDetails.debitCard.digits);
        expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail).toHaveBeenCalledWith(newOrder);
        expect(bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail).toHaveBeenCalledTimes(1);
      });
},
);
