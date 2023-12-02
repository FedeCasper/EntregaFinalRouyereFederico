
import Auth from './Auth/Auth';
import { Layout } from './pages/Layout';
import React, { SuspenseWithPerf } from 'reactfire';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebaseConfig/firebaseConfig';


function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback={'loading...'}>
        <h1>Hello</h1>
        <Auth />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
}

export default App;
