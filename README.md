# Dialog.js
Dialog.js is a multipurpose lightweight highly configurable dialog pure JavaScript library.

## Usage
```js
const dlg = new Dialog(`<content>`, options);
```

## Dialog options
```js
dialogClassName: 'dialog CSS class name',
dialogPlaceholderClassName: 'dialog parent node CSS class name',
size: {
    x: 'dialog width',
    y: 'dialog height'
},
position: {
    x: 'dialog x-axis coordinates',
    y: 'dialog y-axis coordinates'
},

// If true, dialog is automatically shown.
// Otherwise, dialog gets shown when calling dlg.show();
autoShow: true | false,

// Number of seconds after dialog gets automatically closed
autoClose: <number> | false,

// If true, dialog gets closed on ESC key press
closeOnEsc: true | false,

// If true, dialog gets closed when click is performed outside dialog area
closeOnOutsideClick: true | false,

// Attach callbacks
callback: {
    
    // Triggered before showing dialog
    onBeforeShow: () => {},
    
    // Triggered when dialog is shown
    onShow: () => {},
    
    // Triggered when dialog is closed
    onClose: () => {}    
},

// Places dialog right after given HTML element.
// If this is null, dialog is placed before </body>.
linkTo: <HTMLElement>
```

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
