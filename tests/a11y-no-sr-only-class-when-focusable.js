const rule = require('../lib/rules/a11y-no-sr-only-class-when-focusable')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const errorMessage =
  'Avoid adding the "sr-only" class to interactive elements. Visually hiding interactive elements can be confusing to sighted keyboard users as it appears their focus has been lost when they navigate to an sr-only element.'

ruleTester.run('a11y-no-sr-only-class-when-focusable', rule, {
  valid: [
    {code: '<VisuallyHidden as="h2">Submit</VisuallyHidden>'},
    {code: "<div className='sr-only'>Text</div>;"},
    {code: '<VisuallyHidden><div>Text</div></VisuallyHidden>'},
    {code: "<div className='other sr-only'>Text</div>;"},
    {code: "<span className='sr-only'>Text</span>;"},
    {code: "<button className='other'>Submit</button>"},
    {code: '<button>Submit</button>'},
  ],
  invalid: [
    {code: '<VisuallyHidden as="button">Submit</VisuallyHidden>', errors: [{message: errorMessage}]},
    {code: '<VisuallyHidden><button>Submit</button></VisuallyHidden>', errors: [{message: errorMessage}]},
    {
      code: '<VisuallyHidden><button class="sr-only">Submit</button></VisuallyHidden>',
      errors: [{message: errorMessage}],
    },
    {code: "<button className='sr-only'>Submit</button>", errors: [{message: errorMessage}]},
    {code: '<VisuallyHidden><div><button>Submit</button></div></VisuallyHidden>', errors: [{message: errorMessage}]},
    {code: "<a className='other sr-only' href='github.com'>GitHub</a>", errors: [{message: errorMessage}]},
    {code: "<summary className='sr-only'>Toggle open</summary>", errors: [{message: errorMessage}]},
    {code: "<textarea className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<select className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<input className='sr-only' />", errors: [{message: errorMessage}]},
    {code: "<a className='sr-only'>Read more</a>", errors: [{message: errorMessage}]},
  ],
})
