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
import ComponentList from './components/ComponentList.tsx';

// helper imports
import * as yup from 'yup';
import axios from 'axios';

// demo/initial cold text
import DemoText from '../data/demoCodeBlock.js';

import { useView, Compiler, Editor, Error, formatCode, ActionButtons } from 'react-view';
import presetTypescript from '@babel/preset-typescript';

import componentData from '../data/componentData';
import { useFormikContext } from 'formik';

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
          <Box onBlur={() => editorBlur()} minWidth='100%'>
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
        </Flex>
      </Flex>
    </>
  );
};

Home.displayName = 'Home';

export default Home;