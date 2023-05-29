---
title: Fonts
---

# Fonts

## Installing custom fonts

The easiest way to install custom fonts to your RN project is do as follows:

  1. Define path to assets directory with fonts in project:

  Example:

  ```js
    module.exports = {
      ...
      assets: [
        './assets/fonts'
      ],
  ```

  Note: `fonts` is a folder with `.ttf` files

  2. Place your font files in your assets directory.

  3. Link font files, using the following command in the terminal:

  * React Native  `>= 0.69`:

  ```sh
  npx react-native-asset
  ```

  * React Native `< 0.69`:

  ```sh
  npx react-native link
  ```


  4. Restart your project to refresh changes.

Now, you are able to use `fontFamily` from font files.

## Configuring fonts in ThemeProvider

### Material Design 2

#### Using `configureFonts` helper

To create a custom font, prepare a `fontConfig` object where fonts are divided by platforms. After that, you have to:

* pass the `fontConfig` into `configureFonts` params object property called `config` 
* set the params object property `isV3` to `false`. 

The `fontConfig` object accepts `ios`, `android`, `macos`, `windows`, `web`, and `native`. Use these to override fonts on particular platforms.

Note: At a minimum, you need to explicitly pass fonts for `android`, `ios`, and `web`.

```js
import * as React from 'react';
import { configureFonts, MD2LightTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  }
};

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig, isV3: false}),
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
```

### Material Design 3

#### Variants

In the latest version fonts in theme are structured based on the `variant` keys e.g. `displayLarge` or `bodyMedium` which are then used in `Text`'s component throughout the whole library.

Note: The default `fontFamily` is different per particular platfrom:

```js
Platform.select({
  web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  ios: 'System',
  default: 'sans-serif', // and 'sans-serif-medium' for `fontWeight:"500"`
}),
```


* #### Display

<div style={{ flexDirection: 'row', display: 'flex' }}>
  <div>

  ```json
  "displaySmall": {
    "fontFamily": "FontFamily",
    "fontSize": 36,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 44,
  }
  ```

  </div>

  <div>

  ```json
  "displayMedium": {
    "fontFamily": "FontFamily",
    "fontSize": 45,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 52,
  }
  ```

  </div>

  <div style={{flex: 1}}>

  ```json
  "displayLarge": {
    "fontFamily": "FontFamily",
    "fontSize": 57,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 64,
  }
  ```

  </div>
</div>

* #### Headline

<div style={{ flexDirection: 'row', display: 'flex' }}>
  <div>

  ```json
  "headlineSmall": {
    "fontFamily": "FontFamily",
    "fontSize": 24,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 32,
  }
  ```

  </div>

  <div>

  ```json
  "headlineMedium": {
    "fontFamily": "FontFamily",
    "fontSize": 28,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 36,
  }
  ```

  </div>

  <div style={{flex: 1}}>

  ```json
  "headlineLarge": {
    "fontFamily": "FontFamily",
    "fontSize": 32,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 40,
  }
  ```

  </div>
</div>

* #### Title

<div style={{ flexDirection: 'row', display: 'flex' }}>
  <div>

  ```json
  "titleSmall": {
    "fontFamily": "FontFamily",
    "fontSize": 14,
    "fontWeight": "500",
    "letterSpacing": 0.1,
    "lineHeight": 20,
  }
  ```

  </div>

  <div>

  ```json
  "titleMedium": {
    "fontFamily": "FontFamily",
    "fontSize": 16,
    "fontWeight": "500",
    "letterSpacing": 0.15,
    "lineHeight": 24,
  }
  ```

  </div>

  <div style={{flex: 1}}>

  ```json
  "titleLarge": {
    "fontFamily": "FontFamily",
    "fontSize": 22,
    "fontWeight": "400",
    "letterSpacing": 0,
    "lineHeight": 28,
  }
  ```

  </div>
</div>

* #### Label

<div style={{ flexDirection: 'row', display: 'flex' }}>
  <div>

  ```json
  "labelSmall": {
    "fontFamily": "FontFamily",
    "fontSize": 11,
    "fontWeight": "500",
    "letterSpacing": 0.5,
    "lineHeight": 16,
  }
  ```

  </div>

  <div>

  ```json
  "labelMedium": {
    "fontFamily": "FontFamily",
    "fontSize": 12,
    "fontWeight": "500",
    "letterSpacing": 0.5,
    "lineHeight": 16,
  }
  ```

  </div>

  <div style={{flex: 1}}>

  ```json
  "labelLarge": {
    "fontFamily": "FontFamily",
    "fontSize": 14,
    "fontWeight": "500",
    "letterSpacing": 0.1,
    "lineHeight": 20,
  }
  ```

  </div>
</div>

* #### Body

<div style={{ flexDirection: 'row', display: 'flex' }}>
  <div>

  ```json
  "bodySmall": {
    "fontFamily": "FontFamily",
    "fontSize": 12,
    "fontWeight": "400",
    "letterSpacing": 0.4,
    "lineHeight": 16,
  }
  ```

  </div>

  <div>

  ```json
  "bodyMedium": {
    "fontFamily": "FontFamily",
    "fontSize": 14,
    "fontWeight": "400",
    "letterSpacing": 0.25,
    "lineHeight": 20,
  }
  ```

  </div>

  <div style={{flex: 1}}>

  ```json
  "bodyLarge": {
    "fontFamily": "FontFamily",
    "fontSize": 16,
    "fontWeight": "400",
    "letterSpacing": 0.15,
    "lineHeight": 24,
  }
  ```

  </div>
</div>

<i>Note:</i> If any component uses Paper's `Text` component, without specified <b>variant</b>, then `default` variant is applied:

```json
"default": {
  "fontFamily": "FontFamily",
  "fontWeight": "400",
  "letterSpacing": 0,
},
```

#### Using `configureFonts` helper

* If there is a need to create a custom font variant, prepare its config object including required all fonts properties. After that, defined `fontConfig` has to be passed under the <b>`variant`</b> name as `config` into the params object:

```js
import * as React from 'react';
import { configureFonts, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  }
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
```

If you're using TypeScript you will need to create a custom `Text` component which accepts your custom variants:

```typescript
import { customText } from 'react-native-paper'

// Use this instead of importing `Text` from `react-native-paper`
export const Text = customText<'customVariant'>()
```


* In order to override one of the available `variant`'s font properties, pass the modified `fontConfig` under specific <b>`variant`</b> name as `config` into the params object:

```js
import * as React from 'react';
import { configureFonts, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const fontConfig = {
  bodyLarge: {
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  }
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
```

* However, if you just want to override any font property e.g. `fontFamily` or `letterSpacing` for <b>all</b> variants, you can pass the `fontConfig` as a `config` into the params object <b>without</b> specifying variant name:

```js
import * as React from 'react';
import { configureFonts, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const fontConfig = {
  fontFamily: 'NotoSans'
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
```