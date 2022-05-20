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

import React, { useState, useEffect, useRef, createRef } from 'react';
import ReactDOM from 'react-dom';
import * as yup from 'yup';
import axios from 'axios';
import DemoText from '../data/demoCodeBlock.js';
import {useView, Compiler, Editor, Error, formatCode, ActionButtons } from 'react-view';
import presetTypescript from '@babel/preset-typescript';

import componentData from '../data/componentData';
// import prettier from 'prettier/standalone';
// import parserBabel from 'prettier/esm/parser-babel.mjs';
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

const Home = () => {
  // const [showDisplay, setShowDisplay] = useState(false);
  const [openComponentList, setOpenComponentList] = useState(false);
  const [editorCode, setEditorCode] = useState(DemoText);
  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [editorKey, setEditorKey] = useState(0);
  const codeDisplayRef = useRef(null);
  const componentListRef = useRef(null);
  const codeEditorRef = useRef(null);
  const codeEditorButtons = useRef(null);

  const params = useView({
    initialCode: editorCode,
    scope: {...scopeComponents},
    imports: {
      'baseui/button': {
        named: ['Button'],
      }},
    onUpdate: console.log,
    
  });
const getComponentList = () => {
    return (
      <>
        <List blocks={formattedCodeListData} variant="none" />
      </>
    );
  };

  let formattedCodeListData = Object.keys(componentData).map((key) => {
    return {
      title: (
        <Button
          onClick={(e) => {
            e.preventDefault();
            // paseSnippet(key);
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
            // height: calc(100% - 100px);
            overflow: hidden;
          }
          
          #editorWrapper {
            display: flex;
          }
          
          #editorWrapper textarea, #editorWrapper pre {
            flex-direction: column;
            flex-grow: 1;
          }
          
          .editor_internal {
            display: flex;
            min-height: 100%
          }

          .editor_internal div:first-of-type {
            display: flex;
            width: 100%;
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
          {codeEditorButtons.current &&
            ReactDOM.createPortal(
              <Button
                onClick={() => {
                  setOpenComponentList(!openComponentList);
                }}
                size="sm"
                variant="minimal"
              >
                Component List
              </Button>,
              codeEditorButtons.current
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
            backgroundColor="#222"
            width="40%"
            flexDirection='column'
            position="relative"
            ref={codeEditorRef}
          >
            <Flex id="editorWrapper" flexGrow={1} overflowY="scroll">
              <Box minWidth='100%'>
                <Editor className='editor_internal' {...params.editorProps} language="jsx" />
              </Box>
            </Flex>
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
            >
              <Compiler {...params.compilerProps} presets={[presetTypescript]} />
              <Error {...params.errorProps} />
            </Box>
          </Flex>
        </Flex>
        <Flex ref={codeEditorButtons} minHeight={0} id="editorWrapper_buttons" width='100%'>
          <ActionButtons {...params.actions} />
        </Flex>
      </Flex>
    </>
  );
};

Home.displayName = 'Home';

export default Home;