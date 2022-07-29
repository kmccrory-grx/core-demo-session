// import { vscodeSnippet, PropTypes } from 'react-view';
const { vscodeSnippet, PropTypes } = require('react-view');
const fs = require('fs');
const path = require('path');

const ButtonSnippet = vscodeSnippet({
    prefix: ['Button component'],
    componentName: 'Button',
    props: {
        children: {
            value: 'I am a Button',
            type: PropTypes.ReactNode,
            description: 'Button children',
        },
        className: {
            type: PropTypes.String,
            value: ''
        },
        disabled: {
            type: PropTypes.Boolean,
            value: false
        },
        hasChildren: {
            type: PropTypes.Boolean,
            description: 'Synthetic prop to adjust Icon padding. Should never be used',
        },
        leadingIcon: {
            value: 'info',
            type: PropTypes.String,
            description: 'The Material UI theme of the leadingIcon. Note: not all Icon names support every iconType.',
        },
        loading: {
            value: false,
            type: PropTypes.string,
            description: 'Show or hide loading state',
        },
        onClick: {
            value: () => { },
            description: '(Inherited) onClick handler function',
        },
    },
    imports: {
        '@goodrx/matisse-react': {
            named: ['Button'],
        },
    },
});

// then you might want to write it into a file so it can be loaded into VS Code
fs.writeFileSync(
    path.join(__dirname, 'components.code-snippets'),
    JSON.stringify({ Button: ButtonSnippet }, undefined, ' ')
);