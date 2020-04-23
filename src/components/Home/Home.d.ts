// What gets passed into the component from the parent as attributes
export declare interface IHomeProps {

}

// What gets returned from the first connect function (mapStateToProps)
export declare interface IHomeStateProps {

}

// What gets returned from the second connect function (mapDispatchToProps)
export declare interface IHomeDispatchProps {

}

// What gets added in the third connect function (mergeProps)
export declare interface IHomeMergeProps {

}

// The props that finally get passed to the component
export declare type HomeProps = IHomeStateProps & IHomeDispatchProps & IHomeMergeProps & IHomeProps;
