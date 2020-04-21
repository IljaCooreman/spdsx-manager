import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { StoreContext } from 'storeon/react';

import Application from './components/Application';
import { store } from './store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <StoreContext.Provider value={store}>
                <Component />
            </StoreContext.Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
