const componentData = {
  "Alert": {
    "snippet": `<Alert
      variant='primary'>
        <Text>Default Alert</Text>
      </Alert>`
  },
  "Badge": {
    "snippet": `<Badge
      size='md'
      variant='info'>
        Default Badge
      </Badge>`
  },
  "Button": {
    "snippet": `<Button
      onClick={() => {}}
      size='sm'
      variant='primaryUi'>
        I'm a Button!
      </Button>`
  },
  "Checkbox": {
    "hooks": `const [checked, updateChecked] = useState(false);`,
    "snippet": `<Checkbox
        checked={checked}
        onChange={() => updateChecked(!checked)}
        label="Label"
        name="BasicCheckbox"
        subLabel="Sublabel"
        value="basiccheck"
        variant="default"
        verticalAlignment="center"
      />`
  },
  "Collapse": {
    "definitions": `const collapseContent = () => (
        <Box bg="$background-container-tint-dark" mt={3} p={3}>
          <Text>I&apos;m in a collapsible element!</Text>
        </Box>
      );`,
    "hooks": `const [collapseOpen, setCollapseOpen] = useState(false);`,
    "snippet": `<>
      <Button onClick={() => setCollapseOpen(!collapseOpen)}>Toggle The Collapse content</Button>
      <Collapse isOpen={collapseOpen}>{collapseContent()}</Collapse>
    </>`
  },
  "DateInput": {
    "snippet": `
      <DateInput id="formbot-input" label="DateInput" name="date" />
    `,
  },
  "Divider": {
    "snippet": `
      <Divider mb={2} variant='dark' />
    `
  },
  "Field": {
    "snippet": `
      <Field>
        <Text>InteractiveExample</Text>
      </Field>
    `
  },
  "Icon": {
    "snippet": `
      <Icon iconType="outlined" name='information' />
    `
  },
  "Image": {
    "snippet": `
      <Image
      alt="This should fall back to a gray box"
      src="http://placekitten.com/100/200?image=1" />
    `
  },
  "InlineAlert": {
    "snippet": `
      <InlineAlert variant="warning">warning</InlineAlert>
    `
  },
  "Input": {
    "snippet": `
      <Input
        id="matisse-input-icons"
        label="Has some Icons"
        leadingIcon="info"
        leadingIconType="outlined"
        trailingIcon="visibility"
        trailingIconType="outlined"
      />
    `
  },
  "Label": {
    "snippet": `
      <Label>
        Default Label
      </Label>
    `
  },
  "Link": {
    "snippet": `
      <Link
        href="#"
        size="lg"
        target="_self"
        variant="standalone"
      >
        Appearance default
      </Link>
    `
  },
  "Menu": {
    "snippet":`
      <Flex>
        <Flex>
          <Button mr={3} onClick={() => setIsOpen(!isOpen)} ref={referenceElement} variant="primaryUi">
            Open Menu
          </Button>
          <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} referenceElement={referenceElement}>
            <Link href="#" variant="standalone">
              Menu Item
            </Link>
            <Link href="#" mt="$spacer-05" variant="standalone">
              Menu Item
            </Link>
            <Link href="#" mt="$spacer-05" variant="standalone">
              Menu Item
            </Link>
          </Menu>
        </Flex>
      </Flex>
    `,
    "hooks": `
      const [isOpen, setIsOpen] = useState(false);
      const referenceElement = createRef();
    `
  },
  "Overlay": {
    "hooks": `
      const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    `,
    "snippet": `
      <>
      <Button
        onClick={() => {
          setIsOverlayOpen(true);
        }}>
        Click to turn overlay on
      </Button>
      {isOverlayOpen && (
        <Portal>
          <Overlay variant="dark" />
          <Button
            onClick={() => {
              setIsOverlayOpen(false);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 2,
            }}>
            Click to turn overlay off
          </Button>
        </Portal>
      )}
    </>
    `
  },
  "PhoneInput": {
    "snippet": `
      <Formbot initialValues={{ date: '(408) 867-5309' }}>
        <PhoneInput id="formbot-input" label="PhoneInput with Formbot" name="date" />
      </Formbot>
    `
  },
  "Placeholder": {
    "snippet": `
      <Placeholder error="Some weird error occured..." />
    `
  },
  "RadioButton": {
    "snippet": `<RadioButton checked={isChecked} onChange={handleChange} />`,
    "hooks": `const [isChecked, setChecked] = useState(false);`,
    "definitions": `const handleChange = () => {
        setChecked(!isChecked);
      };
    `
  },
  "Select": {
    "snippet": `
      <Select
        id="select"
        name="select"
        label="Example"
        options={[
          { id: 1, value: 'male', label: 'Male' },
          { id: 2, value: 'female', label: 'Female', disabled: true },
          { id: 3, value: 'foo', label: 'foo' },
          { id: 4, value: 'bar', label: 'bar', disabled: true },
        ]}
      />
    `
    },
    "Spinner": {
      "snippet": `
        <Spinner size={55} />
      `
    },
    "Switch": {
      "hooks": `
        const [isSwitchActive, setSwitchActive] = useState(false);
      `,
      "snippet": `
        <Switch
          onChange={(_, { value }) => {
            setSwitchActive(value);
          }}
          value={isSwitchActive}
          {...{
            label: 'Some label',
            subLabel: 'Sub label',
            labelOn: 'On',
            labelOff: 'Off',
          }}
        />
      `
    },
    "Tag": {
      "snippet": `
        <Tag
          {...{
            text: "Tag...YOU'RE IT!",
            onClick: () => console.log('clickity clack'),
            onClose: () => console.log('closed'),
            'data-qa': 'test-id',
            sroText: 'we close the text',
            closeButtonSroText: 'we close those',
            leadingIcon: 'info-outlined',
          }}>
          I am a Tag
        </Tag>
      `
    },
    "Text": {
      "snippet": `
        <Text>The basic text component renders as a {'<span />'}</Text>
      `
    },
    "TextClamp": {
      "snippet": `
        <TextClamp color="green" numberOfLines={3}>
          Vitamin B12 and folate are 2 different vitamins that your body needs to work normally. A deficiency means that
          your body does not have as much of something as it needs.
        </TextClamp>
      `
    }
  }

export default componentData;