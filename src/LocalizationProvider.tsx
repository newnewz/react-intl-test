import React, {
    createContext,
    useState,
    useMemo,
    useContext,
    useCallback,
    useEffect,
  } from "react";
  import { IntlProvider, IntlConfig } from "react-intl";
  
  const LOCALE_CACHE_KEY = "locale";
  const DEFAULT_LOCALE = {
    locale: "en-US",
    englishName: "English (US)",
    displayName: "English (US)",
    rtl: false,
  };
  
  export interface ILocale {
    locale: string;
    englishName: string;
    displayName: string;
    rtl: boolean;
  }
  
  interface ILocaleContext {
    locale: string;
    locales: ILocale[];
    defaultLocale: string;
    setLocale: (locale: string, forceReload?: boolean) => void;
    setDefaultLocale: (locale: string) => void;
  }
  
  const defaultLocaleContext: ILocaleContext = {
    locale: DEFAULT_LOCALE.locale,
    defaultLocale: DEFAULT_LOCALE.locale,
    locales: [DEFAULT_LOCALE],
    setLocale: (locale: string, forceReload?: boolean) => {},
    setDefaultLocale: (locale: string) => {},
  };
  
  export const LocaleContext = createContext<ILocaleContext>(
    defaultLocaleContext
  );
  
  export type LocalizedMessages = IntlConfig["messages"];
  
  type LocalizationProviderConfig = IntlConfig & {
    locales: ILocale[];
    storage?: Storage;
    localeLoader?: (locale: string) => Promise<LocalizedMessages>;
    children: React.ReactNode;
  };
  
  export const LocalizationProvider: React.FunctionComponent<LocalizationProviderConfig> = (
    props
  ) => {
    const { children, locales, storage, localeLoader, ...providerProps } = props;
  
    useEffect(() => {
      if (storage) {
        const cachedLocale = storage.getItem(LOCALE_CACHE_KEY);
        if (cachedLocale) {
          setLocale(cachedLocale);
        } else {
          storage.setItem(LOCALE_CACHE_KEY, locale);
        }
      }
    }, []);
  
    const [locale, _setLocale] = useState(
      providerProps.locale || defaultLocaleContext.locale
    );
    const [defaultLocale, setDefaultLocale] = useState(
      providerProps.locale || defaultLocaleContext.locale
    );
    const [messages, setMessages] = useState<LocalizedMessages>(
      providerProps.messages
    );
  
    const setLocale = useCallback(
      async (locale: string, forceReload?: boolean) => {
        console.log('enter callback');
        const loc =
          locales.find((l) => l.locale === locale) ||
          locales.find((l) => l.locale === defaultLocale);
  
        if (loc) {
          if (storage) {
            storage.setItem(LOCALE_CACHE_KEY, loc.locale);
          }
  
          if (forceReload) {
            window.location.reload();
          } else if (localeLoader) {
            const localeData = await localeLoader(loc.locale);
            setMessages(localeData);
            console.log(localeData);
            console.log(loc.locale);
            _setLocale(loc.locale);
  
            document.documentElement.lang = loc.locale;
            document.documentElement.dir = loc.rtl ? "rtl" : "ltr";
          } else {
            throw new Error(
              "Attempted to load a locale without registering a localeLoader handler"
            );
          }
        } else {
          throw new Error(`Attempted to set an unregistered locale "${locale}"`);
        }
      },
      [defaultLocale, localeLoader, locales, storage]
    );
  
    const localeMemo = useMemo<ILocaleContext>(
      () => ({
        locale,
        locales,
        defaultLocale,
        setLocale,
        setDefaultLocale,
      }),
      [defaultLocale, locale, locales, setLocale]
    );
    return (
      <LocaleContext.Provider value={localeMemo}>
        <IntlProvider
          {...providerProps}
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages}
        >
          {children}
        </IntlProvider>
      </LocaleContext.Provider>
    );
  };
  
  export const useLocale = () => useContext(LocaleContext);
  