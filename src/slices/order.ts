import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// 객체 타이핑 interface
export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    logitude: number;
  };
  price: number;
}

interface InitialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: InitialState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    // 선택한 오더를 deliveries 로 이동시키는 로직
    acceptOrder(state, action: PayloadAction<string>) {
      // payload는 OrderId(String)이다. OrderId를 통해 찾아서 deliveries로 옮겨준디
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      // index가 -1보다 크다는 것은 있다는 의미
      if (index > -1) {
        // deliveries 추가
        state.deliveries.push(state.orders[index]);
        // orders 삭제
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action) {
      const orderIndex = state.orders.findIndex(
        v => v.orderId === action.payload,
      );
      if (orderIndex > -1) {
        // orders 삭제
        state.orders.splice(orderIndex, 1);
      }

      const deliveryIndex = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );

      if (deliveryIndex > -1) {
        state.deliveries.splice(deliveryIndex, 1);
      }
    },
  },
  extraReducers: builder => {},
});

export default orderSlice;
