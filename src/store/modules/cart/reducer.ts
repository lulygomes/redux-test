import { Reducer } from "redux";
// immer é um lib que facilita a adição de dados ao estado.
import produce from "immer";
import { ActionType, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;

        // Exemplo sem immer
        // return {
        //   ...state,
        //   items: [
        //     ...state.items,
        //     {
        //       product,
        //       quantity: 1,
        //     }
        //   ]
        // };
      }

      case ActionType.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
