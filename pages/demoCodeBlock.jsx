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
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import { hydrateRoot, render } from 'react-dom/client';
import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser';
import { transform as babelTransform } from '@babel/standalone';
import * as Acorn from 'acorn';
import ObjPath from 'object-path';
import { generate as generateJs } from 'escodegen';

// const codeRef = useRef(null);
// const Code = (
//   <>
//     <div ref={codeRef} />
//   </>
// );
export function findReactNode(ast) {
  const { body } = ast;
  return body.find(isReactNode);
}

function isReactNode(node) {
  const type = node.type; //"ExpressionStatement"
  const obj = ObjPath.get(node, 'expression.callee.object.name');
  const func = ObjPath.get(node, 'expression.callee.property.name');
  return (
    type === 'ExpressionStatement' &&
    obj === 'React' &&
    func === 'createElement'
  );
}

export default ({ codeContent = 'no content provided' }) => {
  const [editorText, setEditorText] = useState();
  const codeRef = useRef(null);
  const k = parse(`<>
      <div
        style={{ width: '300px', height: '300px', backgroundColor: 'black' }}
      ></div>
    </>`);
  // useEffect(() => {
  //   // const HTML = ReactDOMServer.renderToStaticMarkup(codeContent);
  //   // codeRef.current.innerHTML = HTML;
  //   // hydrateRoot(codeRef.current, codeContent);
  //   const string = ReactDOMServer.renderToString(codeContent);
  //   console.log(
  //     parse(`<>
  //     <div
  //       style={{ width: '300px', height: '300px', backgroundColor: 'black' }}
  //     ></div>
  //   </>`)
  //   );
  // }, [codeContent]);
  // compiles and invokes the wrapper function
  function run(code) {
    compile(code)(React, render, require);
  }

  useEffect(() => {
    run(codeContent);
  }, [codeContent]);

  function compile(code) {
    return getWrapperFunction(code);
  }

  function render(node) {
    ReactDOM.render(node, codeRef.current);
  }

  function getWrapperFunction(code) {
    try {
      const tcode = babelTransform(
        `<>
      <div
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: 'black',
        }}
      ><Button type='button' /></div>
    </>`,
        {
          presets: ['es2015', 'es2017', 'env', 'react'],
        }
      ).code;

      const ast = Acorn.parse(tcode, {
        sourceType: 'module',
      });

      const rnode = findReactNode(ast);

      if (rnode) {
        const nodeIndex = ast.body.indexOf(rnode);
        // 4. convert the React.createElement invocation to source and remove the trailing semicolon
        const createElSrc = generateJs(rnode).slice(0, -1);
        // 5. transform React.createElement(...) to render(React.createElement(...)),
        // where render is a callback passed from outside
        const renderCallAst = Acorn.parse(`render(${createElSrc})`).body[0];

        ast.body[nodeIndex] = renderCallAst;
      }
      console.log('returning');
      // 6. create a new wrapper function with all dependency as parameters
      return new Function('React', 'render', 'require', generateJs(ast));
      // console.log(generateJs(ast), 'boooburger');
      // ReactDOM.render(generateJs(ast), codeRef.current);
    } catch (ex) {
      console.log('catch');
      // in case of exception render the exception message
      render(<pre style={{ color: 'red' }}>{ex.message}</pre>);
    }
  }

  const getParsed = () =>
    parse(`
          ${ReactDOMServer.renderToString(
            <>
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  backgroundColor: 'black',
                }}
              ></div>
            </>
          )}
          `);
  return (
    <>
      <div ref={codeRef} />
    </>
  );
};
