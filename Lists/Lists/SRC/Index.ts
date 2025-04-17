// This file is the entry point of the application. It initializes the application and sets up any necessary configurations or imports.

import { List } from './components/List';

const app = () => {
    const myList = new List();
    myList.addItem('Sample Item 1');
    myList.addItem('Sample Item 2');

    console.log('Current List Items:', myList.getItems());
};

app();
