import {
    ILocale,
    LocalizedMessages,
  } from "./LocalizationProvider";
  
  export const locales: ILocale[] = [
    {
      locale: "en-US",
      englishName: "English (US)",
      displayName: "English (US)",
      rtl: false,
    },
    // {
    //   locale: "es-ES",
    //   englishName: "Spanish",
    //   displayName: "Español",
    //   rtl: false,
    // },
    // {
    //   locale: "fr-FR",
    //   englishName: "French",
    //   displayName: "Français",
    //   rtl: false,
    // },
  ];
  
  export const loadLocaleData = async (
    locale: string
  ): Promise<LocalizedMessages> => {
    switch (locale) {
    //   case "fr-FR":
    //     return (await import("./i18n/translated/fr-FR.json")).default;
    //   case "es-ES":
    //     return (await import("./i18n/translated/es-ES.json")).default;
      case "en-US":
      default:
        return (await import("./i18n/translated/en-US.json")).default;
    }
  };
  