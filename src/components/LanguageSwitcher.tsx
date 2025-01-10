import React from "react";
import useLanguageStore from "../store/languageStore";
import Button from "./ui/Button";

const LanguageSwitcher: React.FC = () => {
  const locale = useLanguageStore((state) => state.locale);
  const setLocale = useLanguageStore((state) => state.setLocale);

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => setLocale("pt")}
        className={locale === "pt" ? "font-bold underline" : ""}
        size="xsm"
      >
        PT
      </Button>
      <Button
        onClick={() => setLocale("en")}
        className={locale === "en" ? "font-bold underline" : ""}
        size="xsm"
      >
        EN
      </Button>
      <Button
        onClick={() => setLocale("es")}
        className={locale === "es" ? "font-bold underline" : ""}
        size="xsm"
      >
        ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
