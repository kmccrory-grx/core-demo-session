import React, { useState, useEffect, useRef, createRef } from 'react';
import ReactDOM from 'react-dom';

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
import * as allMattisseComponents from '@goodrx/matisse-react';
import * as allEinsteinComponents from '@goodrx/einstein';
// import ComponentList from './components/ComponentList';

// helper imports
import * as yup from 'yup';
import axios from 'axios';

// demo/initial cold text
import DemoText from '../data/demoCodeBlock.js';
import componentData from '../data/componentData';

import { useView, Compiler, Editor, Error, formatCode, ActionButtons } from 'react-view';
import presetTypescript from '@babel/preset-typescript';

import { useFormikContext } from 'formik';
import { useAuth } from "./api/auth/authContextProvider";


const scopeComponents = {
  ...allMattisseComponents,
  ...allEinsteinComponents,
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
  const [editorCode, setEditorCode] = useState(formatCode(DemoText));
  const [cursorPosition, setCursorPosition] = useState(0);
  const [editorKey, setEditorKey] = useState(0);
  const codeDisplayRef = useRef(null);
  const componentListRef = useRef(null);
  const codeEditorRef = useRef(null);
  const codeEditorButtons = useRef(null);
  const { user, login, logout } = useAuth();
  

  const signInButtons = () => {
    // if (!session) {
    //   return (
    //     <>
    //       Signed in as {session?.user?.email} <br />
    //       <button onClick={() => signOut()}>Sign out</button>
    //     </>
    //   )
    // }
    // return (
    //   <>
    //     Not signed in <br />
    //     <button onClick={() => signIn()}>Sign in</button>
    //   </>
    // )
    return (
      <>
        <button onClick={() => login()}>Sign in</button>
        <button onClick={() => logout()}>Sign out</button>
      </>
    )
  }


  const paramsInitial = useView({
    initialCode: editorCode,
    scope: { ...scopeComponents },
    imports: {
      'baseui/button': {
        named: ['Button'],
      }
    }
  });

  const params = {
    ...paramsInitial,
    actions: {
      ...paramsInitial.actions,
      formatCode: () => setEditorCode(formatCode(editorCode)),
      reset: () => setEditorCode(formatCode(DemoText))
    },
    editorProps: {
      ...paramsInitial.editorProps,
      onChange: code => setEditorCode(code),
      code: editorCode,
      className: 'editor_internal'
    },
    compilerProps: {
      ...paramsInitial.compilerProps,
      className: 'compiler_internal',
      code: editorCode
    }
  };

  const handleCursorPosition = () => {
    setCursorPosition(
      document.getElementById('editorWrapper').getElementsByTagName('textarea')[0]
        .selectionStart
    );
  };

  const editorBlur = () => {
    handleCursorPosition();

    setEditorCode(formatCode(editorCode));
  };

  const getComponentList = () => {
    return (
      openComponentList &&
      componentListRef.current &&
      ReactDOM.createPortal(
        <ComponentList {
          ...{
            cursorPosition,
            setEditorCode,
            setEditorKey,
            formatCode,
          }
        } />, componentListRef.current)
    )
  };

  const getEditorButtons = () => {
    return (
      codeEditorButtons.current &&
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
      )
    )
  };

  const getCompiledCode = () => {
    return (
      <Flex
        backgroundColor="#aaa"
        flexGrow={1}
        flexDirection='column'
        width="55%"
        role="codeDisplay"
      >
        <Flex
          overflow="scroll"
          width="100%"
          height="100%"
          id="_codeDisplay"
          ref={codeDisplayRef}
        >
          <Compiler {...params.compilerProps} presets={[presetTypescript]} />
          <Error {...params.errorProps} isPopup={true} />
        </Flex>
      </Flex>
    )
  };

  const pasteSnippet = (key) => {
    const textArea = document
      .getElementById('editorWrapper')
      .getElementsByTagName('textarea')[0];

    textArea.setSelectionRange(cursorPosition, cursorPosition);

    let code = textArea.value.slice(0, cursorPosition) +
      `${componentData[key].snippet}` +
      textArea.value.slice(cursorPosition);

    if (componentData[key].hooks) {
      code = code.slice(0, 7) +
        `\n${componentData[key].hooks}` +
        code.slice(7);
    };

    if (componentData[key].definitions) {
      code = code.slice(0, 7) +
        `\n${componentData[key].definitions}` +
        code.slice(7);
    };

    setEditorCode(formatCode(code));
    setEditorKey(Math.random() * 100);
  }

  let formattedCodeListData = () => Object.keys(componentData).map((key) => {
    return {
      title: (
        <Button
          onClick={(e) => {
            e.preventDefault();
            pasteSnippet(key);
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

  const ComponentList:any = () => {
    return (
      <>
        <List blocks={formattedCodeListData()} variant="none" />
      </>
    );
  };

  const getThemeAndHeader = () => {
    return (
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
        {getComponentList()}
        {getEditorButtons()}
      </ThemeProvider>
    )
  };

  const getCodeEditor = () => {
    return (
      <Flex
        role="codeEditor"
        backgroundColor="#222"
        width="35%"
        flexDirection='column'
        position="relative"
        ref={codeEditorRef}
      >
        <Flex id="editorWrapper" flexGrow={1} overflowY="scroll">
          {/* <Box onBlur={() => editorBlur()} minWidth='100%'>*/}
          <Box minWidth='100%'> 
            <Editor {...params.editorProps} key={editorKey} language="tsx" />
          </Box>
        </Flex>
      </Flex>
    )
  };

  const getComponentListWrapper = () => {
    return (
      <Flex
        ref={componentListRef}
        role="componentList"
        overflow="scroll"
        backgroundColor="#fff"
        width={openComponentList ? '6%' : 0}
      />
    )
  };

  return (
    <>
      <Flex role="container" height="100%" flexDirection="column">
        {getThemeAndHeader()}
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
          {getComponentListWrapper()}
          {getCodeEditor()}
          {getCompiledCode()}
        </Flex>
        <Flex ref={codeEditorButtons} minHeight={0} id="editorWrapper_buttons" width='100%'>
          <ActionButtons {...params.actions} />
          {signInButtons()}
        </Flex>
      </Flex>
    </>
  );
};

Home.displayName = 'Home';

export default Home;