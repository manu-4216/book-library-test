import React from 'react';
import { Loader } from 'semantic-ui-react';

// Higher-Order Components

export const withLoadingAndError = Component => ({
    isLoading,
    error,
    ...others
}) =>
    isLoading ? (
        <Loader active>Loading</Loader>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <Component {...others} />
    );
