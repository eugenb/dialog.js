# Dialog.js
Dialog.js is a multipurpose lightweight highly configurable dialog library built by [Eugen Bușoiu](https://eugenbusoiu.com).

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
autoShow: true|false,
autoClose: true|false,
closeOnEsc: true|false,
closeOnOutsideClick: true|false
```

## License
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
