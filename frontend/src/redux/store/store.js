import { configureStore } from '@reduxjs/toolkit';

// Importez les reducers nécessaires ici
import counterReducer from '../reducers/user.reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Ajoutez d'autres reducers ici
  },
});

export default store;
