import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthScreen from './screens/Authscreen';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase';
import useStore from './store';
import AppLoader from './components/layout/AppLoader';
import PublicOnlyRoute from './components/utils/PublicOnlyRoute';
import BoardsScreen from './screens/BoardsScreen';
import BoardScreen2 from './screens/BoardScreen2/Index2';
import PrivateRoute from './components/utils/PrivateRoute';
import SnackbarManager from './components/layout/SnakbarManager';

function App() {

  const { loader, setLoginStatus } = useStore();
  console.log(loader);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
      console.log(user);
    });

    return () => unsub(); 
  }, []); 


  if (loader) return <AppLoader />

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicOnlyRoute Component={AuthScreen} />} />
          <Route path="/boards" element={<PrivateRoute Component={BoardsScreen} />} />
          <Route path="/boards/:boardId" element={<PrivateRoute Component={BoardScreen2} />} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
