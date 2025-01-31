import { AppProvider } from '@/app/provider';
import Landing from '@/app/routes/landing';

const App = () => {
  return (
    <AppProvider>
      <Landing />
    </AppProvider>
  );
}

export default App;