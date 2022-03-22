import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from 'react';
import './App.css';
import { useState } from 'react';
import Select from './select';
import Form from './form';


export default function App() {

  return(

        <div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Select/>}/>
                <Route exact path="/form" element={<Form/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    );

}
