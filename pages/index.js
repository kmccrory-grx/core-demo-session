import {
  Box,
  Badge,
  Button,
  Dropdown,
  Icon,
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
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [dataIndex, setDataIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');

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
              <img src={`${shows[dataIndex].show.image.medium}`} />
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
        flexDirection="column"
        role="Container"
        width="75%"
        height="100vh"
        margin="auto"
        minWidth="1000px"
      >
        <Flex
          backgroundColor="blue"
          flexDirection="row"
          role="select"
          width="100%"
          height="100px"
        >
          <Form onSubmit={(e) => onSubmit(e)}>
            <Input
              onChange={(e, valueOverride) =>
                setInputValue(valueOverride.value)
              }
              id="example-input"
              label="Example"
            />
            <Button type="submit">Search</Button>
          </Form>
        </Flex>
        <Flex
          backgroundColor="blue"
          flexDirection="row"
          role="content"
          width="100%"
          height="100%"
          overflow="scroll"
        >
          <Flex
            backgroundColor="green"
            flexDirection="column"
            role="list"
            width="25%"
            overflow="scroll"
          >
            <List
              title="movie list"
              subTitle="select a movie"
              blocks={formatShows()}
            ></List>
          </Flex>
          <Flex
            height="100%"
            flexGrow={1}
            backgroundColor="grey"
            flexDirection="column"
            role="data"
          >
            {getDataBlock()}
          </Flex>
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}
