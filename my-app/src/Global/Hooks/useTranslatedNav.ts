import {
  NAV_DAMIL_ANALYTICS,
  NAV_DAMIL_HOME,
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
  // const { t } = useLanguageContext();
  return {
    NAV_DAMIL_HOME: {
      ...NAV_DAMIL_HOME,
      list: NAV_DAMIL_HOME.list,
    },
    NAV_DAMIL_ANALYTICS: {
      ...NAV_DAMIL_ANALYTICS,
      list: NAV_DAMIL_ANALYTICS.list,
    },
  };
};