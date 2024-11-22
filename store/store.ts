// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Define el estado inicial
export interface SocketState {
  temperature: number | null;
  kickstandStatus: boolean;
  hitStatus: boolean;
  historicalTemperature: number[];
}

const initialState: SocketState = {
  temperature: null,
  kickstandStatus: false,
  hitStatus: false,
  historicalTemperature: [],
};

// Crea el slice de Redux
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setVehicleStatus(state, action: PayloadAction<any>) {
      const { temperatura, hit, kickstand } = action.payload;
      if (hit === 1) state.hitStatus = hit;
      if (kickstand === 1) state.kickstandStatus = kickstand;
      if (temperatura > 0) state.temperature = temperatura;
      if (temperatura > 0)
        state.historicalTemperature = [
          ...state.historicalTemperature.slice(-99),
          Math.round(temperatura),
        ];
    },
    setHitStatus(state, action: PayloadAction<boolean>) {
      console.log("reseteando hit");
      state.hitStatus = action.payload;
    },
    setResetKickStand(state, action: PayloadAction<boolean>) {
      state.kickstandStatus = action.payload;
    },
  },
});

export const { setVehicleStatus, setHitStatus, setResetKickStand } =
  socketSlice.actions;
export const storeSelector = (state: RootState) => state.socket;

const store = configureStore({
  reducer: {
    socket: socketSlice.reducer,
  },
});

// Tipos personalizados para el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
