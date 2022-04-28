//
// here are things that are in scope!
//
//  import {
//    Box,
//    Badge,
//    Button,
//    DateInput,
//    Dropdown,
//    Icon,
//    Image,
//    Input,
//    Field,
//    Fieldset,
//    Flex,
//    Formbot,
//    Form,
//    Container,
//    Text,
//    List,
//    ThemeProvider,
//  } from '@goodrx/matisse-react';
//
() => {
  const helloWorld = () => console.log('hello world');
  return (
    <>
      {/*Matisse components NEED to be rendered inside of the <ThemeProvider /> */}
      <ThemeProvider theme="matisse">
        <Flex height="100%" role="container" flexDirection="column">
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
                <Form method="post">
                  <Input id="example" label="Input with Form" name="value" />
                  <Button
                    mt={2}
                    onClick={function noRefCheck() {}}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Flex>
              <Flex
                height="85%"
                width="100%"
                role="links"
                backgroundColor="red"
              ></Flex>
            </Flex>
            <Flex
              width="50%"
              flexGrow="1"
              role="data"
              backgroundColor="green"
            ></Flex>
          </Flex>
        </Flex>
      </ThemeProvider>
    </>
  );
};
