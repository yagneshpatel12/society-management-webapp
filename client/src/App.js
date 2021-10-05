import "./App.css";
import AOS from "aos";
import { useEffect } from "react";
import { useGlobalContext } from './context/context';
import { Switch, Route, useLocation,Redirect } from "react-router-dom";
import {useLoadingWithRefresh} from './useLoadingWithRefresh/useLoadingWithRefresh';
import { Home,Navbar,Contact,BusinessAdvertisePage,GalleryPage,LoginPage,Register,Profile,Loader,
       ForgotPassword,Complaine, AllMembers ,VisitProfile,RegisterAdmin,Error,AdminPanel} from './import'

  const App = () => {
  const location = useLocation();
  const {loading} = useLoadingWithRefresh();
  const {isAdmin}=useGlobalContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname],[]);
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
   useEffect(()=>{
    if(isAdmin){
      document.body.style.overflowY='hidden !important'
    }
  },[isAdmin])
  return loading ?  <Loader message="Loading, please wait.." />
    : isAdmin ? 
    // Admin  routes
    <>
      <Switch>
        <Route exact path='/'>
          <AdminPanel/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </>
    //user Routes
    :
    (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/registeradmin' >
          <RegisterAdmin/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/advertise">
          <BusinessAdvertisePage />
        </Route>
        <Route exact path="/gallery">
          <GalleryPage />
        </Route>
        <Route exact path="/allmembers">
          <AllMembers />
        </Route>
        <Route exact path="/allmembers/:publicUrl">
          <VisitProfile />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <SemiProtectedRoute exact path="/login">
          <LoginPage />
        </SemiProtectedRoute>
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <SemiProtectedRoute exact path="/register">
          <Register step={1}/>
        </SemiProtectedRoute>\
        <ProtectedRoute path="/profile">
            <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/complaine'>
          <Complaine/>
        </ProtectedRoute>
        <Route>
          <Error/>
        </Route>
      </Switch>
    </>
    );
};
const SemiProtectedRoute = ({ children, ...rest }) => {
   const { isAuth,isActivate} = useGlobalContext();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? isActivate ?
                                            <Redirect  to={{ pathname: '/profile', state: { from: location }, }} /> 
                                            : 
                                            <Register step={3}/>
                              : 
                              children 
            }}
        ></Route>
    );
};
const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth,isActivate} = useGlobalContext();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : isAuth && !isActivate ? 
                   <Redirect
                        to={{
                            pathname: '/register  ',
                            state: { from: location },
                        }}
                    />
                 : (
                    children
                );
            }}
        ></Route>
    );
};
export default App;
