import {
  Box,
  Badge,
  Button,
  Drawer,
  DrawerBody,
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
  TextPairing,
  List,
  ThemeProvider,
} from '@goodrx/matisse-react';
import * as allMat from '@goodrx/matisse-react';
import * as allEinstein from '@goodrx/einstein';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import React, { useState, useEffect, useRef, createRef } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import DemoText from './demoCodeBlock.js';
import ReactDOM from 'react-dom';
import componentData from './componentData';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/esm/parser-babel.mjs';
import { useFormikContext } from 'formik';

const scopeComponents = {
  ...allMat,
  ...allEinstein,
  useState,
  useEffect,
  useRef,
  createRef,
  axios,
  useFormikContext,
  yup
};

export default function Home() {
  const [showDisplay, setShowDisplay] = useState(false);
  const [openComponentList, setOpenComponentList] = useState(false);
  const [editorCode, setEditorCode] = useState(prettier.format(DemoText,
              {
                parser: 'babel',
                plugins: [parserBabel]
              }
            ));
  const [cursorPosition, setCursorPosition] = useState(0);
  const [editorKey, setEditorKey] = useState(0);
  const codeDisplayRef = useRef(null);
  const componentListRef = useRef(null);
  const codeEditorRef = useRef(null);
  
  const pastDefinitions = key => {
    if(!componentData[key].definitions) return;


  }

  const paseSnippet = key => {
    const textArea = document
      .getElementById('codeEditor')
      .getElementsByTagName('textarea')[0];

    textArea.setSelectionRange(cursorPosition, cursorPosition);

    let code = textArea.value.slice(0, cursorPosition) +
      `${componentData[key].snippet}` +
      textArea.value.slice(cursorPosition);

    if(componentData[key].hooks) {
      code = code.slice(0, 7) +
        `\n${componentData[key].hooks}` +
        code.slice(7);
    };

    if(componentData[key].definitions) {
      code = code.slice(0, 7) +
        `\n${componentData[key].definitions}` +
        code.slice(7);
    };

    pasteFormattedCode(code);
  }

  let formattedCodeListData = Object.keys(componentData).map((key) => {
    return {
      title: (
        <Button
          onClick={(e) => {
            e.preventDefault();
            paseSnippet(key);
          }}
          type="button"
          size='sm'
          variant='standalone'
        >
          {key}
        </Button>
      ),
    };
  });

  useEffect(() => {
    if (codeDisplayRef.current) setShowDisplay(true);
  }, [editorCode]);

  const pasteFormattedCode = code => {
    setEditorCode(() => 
      prettier.format(code,
      {
        parser: 'babel',
        plugins: [parserBabel]
      }
    ));

    setEditorKey(Math.random(5) * 100);
  }

  const getComponentList = () => {
    return (
      <>
        <List blocks={formattedCodeListData} variant="none" />
      </>
    );
  };

  const handleCursorPosition = () => {
    setCursorPosition(
      document.getElementById('codeEditor').getElementsByTagName('textarea')[0]
        .selectionStart
    );
  };

  const editorBlur = () => {
    handleCursorPosition();
    
    const textArea = document
      .getElementById('codeEditor')
      .getElementsByTagName('textarea')[0];

    pasteFormattedCode(textArea.value);
  }
  return (
    <>
      <style jsx global>
        {`
          /* Other global styles such as 'html, body' etc... */

          #__next,
          html,
          body {
            height: 100%;
          }

          #containerFullScreen {
            height: calc(100% - 100px);
          }
        `}
      </style>
      <Flex role="container" height="100%" flexDirection="column">
        <ThemeProvider theme="matisse">
          <Flex
            role="banner"
            width="100%"
            height="100px"
            backgroundColor="white"
          >
            <Flex role="title">
              <TextPairing variant="header-xl+body-reg">
                {{
                  super: 'GoodRx component playground',
                  sub: 'And here is some body text',
                }}
              </TextPairing>
            </Flex>
          </Flex>
          {openComponentList &&
            componentListRef.current &&
            ReactDOM.createPortal(getComponentList(), componentListRef.current)}
          {codeEditorRef.current &&
            ReactDOM.createPortal(
              <Button
                onClick={() => {
                  setOpenComponentList(!openComponentList);
                }}
                size="sm"
                variant="minimal"
                style={{ position: 'absolute', right: 0, top: 0 }}
              >
                Component List
              </Button>,
              codeEditorRef.current
            )}
        </ThemeProvider>
        <Flex
          id="containerFullScreen"
          border="1px solid grey"
          flexDirection="row"
          role="Container"
          width="100%"
          height="100%"
          margin="auto"
          minWidth="1000px"
        >
          <Flex
            ref={componentListRef}
            role="componentList"
            overflow="scroll"
            backgroundColor="#fff"
            width={openComponentList ? '6%' : 0}
          />
          <Flex
            role="codeEditor"
            overflow="scroll"
            backgroundColor="#222"
            width="40%"
            position="relative"
            ref={codeEditorRef}
          >
            <Box id="editorWrapper" overflowY="scroll">
              <LiveProvider
                key={editorKey}
                scope={scopeComponents}
                code={editorCode}
              >
                <LiveEditor
                  id="codeEditor"
                  onBlur={() => editorBlur()}
                  style={{ width: '100%' }}
                />
                {showDisplay &&
                  ReactDOM.createPortal(<LiveError />, codeDisplayRef.current)}
                {showDisplay &&
                  ReactDOM.createPortal(
                    <LivePreview style={{ height: '100%' }} />,
                    codeDisplayRef.current
                  )}
              </LiveProvider>
            </Box>
          </Flex>
          <Flex
            backgroundColor="#aaa"
            flexGrow={1}
            width="50%"
            role="codeDisplay"
          >
            <Box
              overflow="scroll"
              width="100%"
              height="100%"
              id="_codeDisplay"
              ref={codeDisplayRef}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
