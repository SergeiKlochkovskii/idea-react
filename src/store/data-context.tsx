import React from 'react';

export interface data {
    str: string;
    handleClick: (value: string, extra: string) => void,
    pups?: string;
}

const DataContext = React.createContext<data>({
    str: '', handleClick: () => {}, pups: 'Klops'
});

export default DataContext;

