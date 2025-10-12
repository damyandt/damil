import { useLanguageContext } from "../../context/LanguageContext";
import {
  NAV_DAMIL_ACCESS_CONTROL,
  NAV_DAMIL_ANALYTICS,
  NAV_DAMIL_CLASSES,
  NAV_DAMIL_CONFIGURATIONS,
  NAV_DAMIL_HOME,
  NAV_DAMIL_STAFF,
} from "../../Layout/AppNavigation/leftNavData";
import { LeftNavSingleItem } from "../../Layout/layoutVariables";

const translateNavItem = (
  item: LeftNavSingleItem,
  t: (key: string) => string
): LeftNavSingleItem => {
  const translatedItem = {
    ...item,
    text: t(item.text),
  };

  if (item.nested) {
    translatedItem.nested = item.nested.map((nestedItem) =>
      translateNavItem(nestedItem, t)
    );
  }

  return translatedItem;
};

export const useTranslatedNav = () => {
  const { t } = useLanguageContext();
  return {
    NAV_DAMIL_HOME: {
      ...NAV_DAMIL_HOME,
      list: NAV_DAMIL_HOME.list.map((item) => translateNavItem(item, t)),
    },
    NAV_DAMIL_CLASSES: {
      ...NAV_DAMIL_CLASSES,
      list: NAV_DAMIL_CLASSES.list.map((item) => translateNavItem(item, t)),
    },
    NAV_DAMIL_ANALYTICS: {
      ...NAV_DAMIL_ANALYTICS,
      list: NAV_DAMIL_ANALYTICS.list.map((item) => translateNavItem(item, t)),
    },
    NAV_DAMIL_CONFIGURATIONS: {
      ...NAV_DAMIL_CONFIGURATIONS,
      list: NAV_DAMIL_CONFIGURATIONS.list.map((item) =>
        translateNavItem(item, t)
      ),
    },
    NAV_DAMIL_ACCESS_CONTROL: {
      ...NAV_DAMIL_ACCESS_CONTROL,
      list: NAV_DAMIL_ACCESS_CONTROL.list.map((item) =>
        translateNavItem(item, t)
      ),
    },
    NAV_DAMIL_STAFF: {
      ...NAV_DAMIL_STAFF,
      list: NAV_DAMIL_STAFF.list.map((item) => translateNavItem(item, t)),
    },
  };
};
