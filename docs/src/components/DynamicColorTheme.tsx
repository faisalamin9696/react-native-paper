import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';

import createDynamicThemeColors from '../utils/createDynamicColorTheme';
import Switch from './Switch';

interface SearchbarProps {
  value: string;
  type: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  onBlur?: () => void;
}

type Schemes = {
  light: { [key in string]: string };
  dark: { [key in string]: string };
};

const Searchbar = (props: SearchbarProps) => {
  return <input className="searchBar" {...props} />;
};

const defaultColor = 'purple';

const getFontColor = (
  colorName: string,
  colorSchemes: { [key in string]: string }
) => {
  let fontColor = '';
  if (colorName.startsWith('on')) {
    fontColor = `${colorName.charAt(2).toLowerCase()}${colorName.slice(3)}`;
  } else {
    fontColor = `on${colorName.charAt(0).toUpperCase()}${colorName.slice(1)}`;
  }

  return colorSchemes[fontColor];
};

const nonMaterialCore = [
  'elevation',
  'shadow',
  'scrim',
  'inverseSurface',
  'inverseOnSurface',
  'surfaceDisabled',
  'onSurfaceDisabled',
  'outlineVariant',
  'backdrop',
  'inversePrimary',
];

const DynamicColorTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [color, setColor] = useState(defaultColor);
  const [schemes, setSchemes] = useState<Schemes>({ light: {}, dark: {} });
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const dynamicThemeColors = useRef<Schemes>({ light: {}, dark: {} });

  const darkMode = isDark ? 'dark' : 'light';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (CSS.supports('color', color)) {
        const themeColors = createDynamicThemeColors({
          sourceColor: color,
        });

        dynamicThemeColors.current = {
          light: { ...themeColors.light },
          dark: { ...themeColors.dark },
        };

        nonMaterialCore.forEach((colorKey) => {
          delete themeColors.light[colorKey];
          delete themeColors.dark[colorKey];
        });
        setSchemes({ ...themeColors });
      } else if (color.trim() !== '') {
        setError(`"${color}": it's not a color`);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [color]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setColor(e.target.value);
  };

  const onBlur = () => {
    if (color.trim() === '') {
      setColor(defaultColor);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(getColorScheme());
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  const getColorScheme = () => {
    const _schema = {
      colors: dynamicThemeColors.current[darkMode],
    };
    return JSON.stringify(_schema, null, 2);
  };

  const schemesArray = Object.entries(schemes[darkMode]);

  return (
    <div style={styles.container}>
      <span style={styles.searchContainer}>
        <Searchbar
          onBlur={onBlur}
          type="search"
          value={color}
          onChange={onSearch}
        />
        <span style={styles.switchView}>
          <p style={styles.switchLabel}>Dark Mode:</p>
          <Switch
            value={isDark}
            color="green"
            onValueChange={() => setIsDark(!isDark)}
          />
        </span>
      </span>
      <p style={styles.error}>{error}</p>
      <div className="gridParent">
        <div className="gridColors">
          {schemesArray.map((item, index) => {
            return (
              <span
                key={index}
                style={{
                  backgroundColor: item[1],
                  ...styles.colorView,
                  color: getFontColor(item[0], schemes[darkMode]),
                }}
              >
                <p style={styles.colorTitle}>{item[0]}</p>
              </span>
            );
          })}
        </div>

        <div style={styles.schemaView}>
          <pre>
            <p onClick={onCopy} style={styles.copy}>
              {copied ? 'copied' : 'copy'}
            </p>
            <code className="language-json">{getColorScheme()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const styles: { [key in string]: React.CSSProperties } = {
  container: {
    margin: '16px',
  },
  colorView: {
    border: '1px solid #ccc',
    padding: '0px 0px 5px 5px',
    height: '100%',
    borderWidth: '1px 0px 0px 0px',
  },
  colorTitle: {
    fontSize: '0.8em',
  },
  copy: {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '2px',
    float: 'right',
    marginRight: '10px',
    cursor: 'pointer',
  },
  schemaView: {
    marginTop: '5px',
  },
  switchView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20px',
  },
  switchLabel: {
    margin: 0,
    fontWeight: 'bold',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: { color: 'red' },
};

export default DynamicColorTheme;
