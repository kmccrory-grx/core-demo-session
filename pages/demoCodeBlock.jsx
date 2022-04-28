() => {
  const [shows, setShows] = useState([]);
  const [dataIndex, setDataIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setShows([]);
    setDataIndex(-1);
    axios(`https://api.tvmaze.com/search/shows?q=${inputRef.current.value}`)
      .then((res) => {
        console.log(res.data);
        setShows(res.data);
      })
      .catch((err) => console.log(err));
  };

  const formatShows = () => {
    const retArr = [];

    shows.map((showObj, index) => {
      const name = showObj.show ? showObj.show.name : 'unavailable name';
      {
        /* this is ugly but what can you do there is no inline (?) in the browsera */
      }
      const networkName =
        showObj &&
        showObj.show &&
        showObj.show.network &&
        showObj.show.network.name
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

  const getImage = () => {
    if (dataIndex < 0) return <></>;

    return (
      <Image
        alt="This should fall back to a kitten pic"
        src={shows[dataIndex].show.image.original}
        objectFit="contain"
      />
    );
  };

  const getText = () => {
    if (dataIndex < 0) return <></>;

    return (
      <Text variant="$font-body-regular">{shows[dataIndex].show.summary}</Text>
    );
  };

  const getTitle = () => {
    if (dataIndex < 0) return <></>;

    return (
      <>
        <TextPairing display="flex" flexGrow="1" variant="body-reg+meta-reg">
          {{
            super: shows[dataIndex].show.name,
            sub: shows[dataIndex].show.status,
          }}
        </TextPairing>
        <TextPairing display="flex" flexGrow="1" variant="body-reg+meta-reg">
          {{
            super: shows[dataIndex].show.language,
            sub: shows[dataIndex].show.type,
          }}
        </TextPairing>
        <TextPairing display="flex" flexGrow="1" variant="body-reg+meta-reg">
          {{
            super: shows[dataIndex].show.network.name,
            sub: shows[dataIndex].show.genres.toString(),
          }}
        </TextPairing>
      </>
    );
  };

  return (
    <>
      {/*Matisse components NEED to be rendered inside of the <ThemeProvider /> */}
      <ThemeProvider theme="matisse">
        <Flex
          height="100%"
          minHeight="500px"
          role="container"
          flexDirection="column"
        >
          <Flex
            flexDirection="row"
            height="100%"
            width="100%"
            role="contentContainer"
          >
            <Flex
              width="25%"
              flexDirection="column"
              role="list"
              backgroundColor="grey"
            >
              <Flex height="25%" role="input">
                <Form method="get" onSubmit={(e) => onSubmit(e)}>
                  <Input
                    ref={inputRef}
                    id="example"
                    label="Input with Form"
                    name="value"
                  />
                  <Button mt={2} type="submit">
                    Submit
                  </Button>
                </Form>
              </Flex>
              <Flex
                height="85%"
                width="100%"
                role="links"
                backgroundColor="red"
                overflow="scroll"
              >
                <List
                  title="movie list"
                  subTitle="select a movie"
                  spacing="dense"
                  blocks={formatShows()}
                ></List>
              </Flex>
            </Flex>
            <Flex
              width="50%"
              flexGrow="1"
              role="data"
              flexDirection="column"
              backgroundColor="green"
            >
              <Flex
                height="10%"
                role="title"
                backgroundColor="blue"
                flexDirection="row"
              >
                {getTitle()}
              </Flex>
              <Flex
                justifyContent="center"
                height="60%"
                flexGrow="1"
                role="image"
                backgroundColor="indigo"
              >
                {getImage()}
              </Flex>
              <Flex
                overflow="scroll"
                height="20%"
                role="description"
                backgroundColor="purple"
              >
                {getText()}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ThemeProvider>
    </>
  );
};
