import {
  Box,
  Badge,
  Button,
  Dropdown,
  Icon,
  Image,
  Input,
  Field,
  Fieldset,
  Flex,
  Formbot,
  Form,
  Container,
  Text,
  List,
  ThemeProvider,
} from '@goodrx/matisse-react';
import * as allMat from '@goodrx/matisse-react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DemoText from './demoCodeBlock.js';
import ReactDOM from 'react-dom';

const scopeComponents = {
  ...allMat,
  useState,
  useEffect,
  useRef,
  axios,
};

export default function Home() {
  const [showDisplay, setShowDisplay] = useState(false);
  const [editorCode, setEditorCode] = useState(DemoText);
  const codeDisplayRef = useRef(null);

  useEffect(() => {
    if (codeDisplayRef.current) setShowDisplay(true);
  }, [editorCode]);

  return (
    <Flex
      border="1px solid grey"
      flexDirection="row"
      role="Container"
      width="100%"
      height="100vh"
      margin="auto"
      minWidth="1000px"
    >
      <Flex role="codeEditor" flex backgroundColor="#222" width="40%">
        <LiveProvider scope={scopeComponents} code={DemoText}>
          <LiveEditor style={{ width: '100%' }} />
          {showDisplay &&
            ReactDOM.createPortal(<LiveError />, codeDisplayRef.current)}
          {showDisplay &&
            ReactDOM.createPortal(<LivePreview />, codeDisplayRef.current)}
        </LiveProvider>
      </Flex>
      <Flex
        backgroundColor="#ccc"
        flexGrow={1}
        width="50%"
        role="codeDisplay"
        ref={codeDisplayRef}
      ></Flex>
    </Flex>
  );
}
