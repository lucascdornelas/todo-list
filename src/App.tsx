import { FormattedMessage, IntlProvider } from "react-intl";

import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import BatchActionsBar from "./components/BatchActionsBar";
import useThemeStore from "./store/themeStore";

import { MoonIcon, SunIcon } from "lucide-react";
import Button from "./components/ui/Button";
import messages from "./i18n/messages";
import LanguageSwitcher from "./components/LanguageSwitcher";
import useLanguageStore from "./store/languageStore";

export function App() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const locale = useLanguageStore((state) => state.locale);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className={`${theme === "dark" ? "dark" : ""}`}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-600 flex items-center justify-center dark:text-white">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col flex-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-localiza-green dark:text-dark-localiza-text mb-2">
                  <FormattedMessage id="app.title" />
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <FormattedMessage id="app.subtitle" />
                </p>
              </div>
              <LanguageSwitcher />
              <Button onClick={toggleTheme}>
                {theme === "light" ? (
                  <MoonIcon size={16} />
                ) : (
                  <SunIcon size={16} />
                )}
              </Button>
            </div>
            <AddTask />
            <FilterBar />
            <TaskList />
            <BatchActionsBar />
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
