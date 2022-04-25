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
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import DemoText from './demoCodeBlock.js';
import DemoCodeBlock from './demoCodeBlock.jsx';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { Parser } from 'html-to-react';
import ReactHtmlParser from 'react-html-parser';
import ReactDOMServer from 'react-dom/server';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [Code, setCode] = useState(DemoText);
  const [dataIndex, setDataIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const codeRef = useRef(null);

  // useEffect(() => {
  //   let HTML = ReactDOMServer.renderToString(<Code />);
  //   codeRef.current.innerHTML = HTML;
  //   // console.log(HTML, 'asfasf', codeRef.innerHTML);
  // }, []);

  // useEffect(() => {
  //   let HTML = ReactDOMServer.renderToString(<Code />);
  //   codeRef.current.innerHTML = HTML;
  //   // console.log(HTML, 'asfasf', codeRef.innerHTML);
  // }, [Code]);

  // const Component2 = Parser.parse(DemoText);
  // console.log(ReactHtmlParser(DemoText), 'component 2');

  const onSubmit = (e) => {
    e.preventDefault();
    setShows([]);
    setDataIndex(-1);
    axios(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then((res) => {
        setShows(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const updateCode = (code) => {
  //   setCode(() => Code);
  // };

  const getDataBlock = () => {
    // if (dataIndex < 0) return <></>;

    return (
      <>
        <Flex height="100%" flexDirection="column" backgroundColor="purple">
          <Flex
            flexDirection="row"
            width="100%"
            height={'100px'}
            role="title"
            backgroundColor="green"
          ></Flex>
          <Flex
            flexDirection="row"
            width="100%"
            flexGrow={1}
            role="image"
            backgroundColor="blue"
          >
            {shows.length > 0 && shows?.[dataIndex]?.show?.image?.medium && (
              <Image
                objectFit="fill"
                margin="0 auto"
                src={`${shows[dataIndex].show.image.medium}`}
              />
            )}
          </Flex>
          <Flex
            flexDirection="row"
            width="100%"
            height={'100px'}
            role="description"
            backgroundColor="yellow"
          ></Flex>
        </Flex>
      </>
    );
  };

  const formatShows = () => {
    const retArr = [];

    shows.map((showObj, index) => {
      const name = showObj.show?.name;
      const networkName = showObj?.show.network?.name
        ? showObj.show.network.name
        : 'Unavailable';

      retArr.push({
        subTitle: `Network ${networkName}`,
        title: (
          <Button
            onClick={(e) => {
              e.preventDefault();
              return setDataIndex(index);
            }}
            type="button"
            variant="inline"
          >
            {name}
          </Button>
        ),
      });
    });

    return retArr;
  };

  return (
    <ThemeProvider theme="matisse">
      <Flex
        border="1px solid grey"
        flexDirection="row"
        role="Container"
        width="100%"
        height="100vh"
        margin="auto"
        minWidth="1000px"
      >
        <Flex role="codeEditor" backgroundColor="indigo" width="35%">
          <Editor
            value={Code}
            width="100%"
            height="100%"
            onValueChange={(Code) => setCode(Code)}
            highlight={(Code) => Code && highlight(Code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              width: '100%',
              height: '100%',
              backgroundColor: 'grey',
            }}
          />
        </Flex>
        <Flex ref={codeRef} width="65%" role="rendercode">
          {/* {ReactHtmlParser(Code)} */}
          <DemoCodeBlock />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}
