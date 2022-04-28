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
  TextPairing,
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
            role="codeEditor"
            overflow="scroll"
            backgroundColor="#222"
            width="40%"
          >
            <Box id="editorWrapper" overflowY="scroll">
              <LiveProvider scope={scopeComponents} code={DemoText}>
                <LiveEditor style={{ width: '100%' }} />
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
