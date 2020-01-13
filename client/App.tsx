import React from 'react';
import ShopWrapper from "./components/ShopWrapper";
import {Provider, rootStore} from "./models/RootStore";

const App: React.FC = () => {
    return (
        <Provider value={rootStore}>
            <ShopWrapper/>
        </Provider>
    );
};

export default App;