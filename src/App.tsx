import AppProvider from './providers';
import AppRouter from './routes';
import { store } from './redux/store';
import { Provider } from 'react-redux';
export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppProvider>
  );
}
