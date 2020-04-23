import { connect } from 'react-redux';
import { HomeComponent } from './Home.component';
import { HomeProps, IHomeDispatchProps, IHomeProps, IHomeStateProps } from "./Home.d";

// The mapStateToProps function:  Use this to fetch data from the Redux store via selectors
export const mapStateToProps = (state:any, props:IHomeProps):IHomeStateProps => ({

});

// The mapDispatchToProps function:  Use this to define handlers and dispatch basic actions
export const mapDispatchToProps = (dispatch:any, props:IHomeProps):IHomeDispatchProps => ({

});

// The mergeProps function:  Use this to define handlers and dispatchers that require access to state props
export const mergeProps = (state:IHomeStateProps, dispatch:IHomeDispatchProps, props:IHomeProps):HomeProps => ({
    ...state,
    ...dispatch,
    ...props,
});

export const Home = connect<IHomeStateProps, IHomeDispatchProps, IHomeProps, HomeProps, any>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(HomeComponent);