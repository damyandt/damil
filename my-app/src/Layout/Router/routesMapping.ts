import {
  NAV_DAMIL_HOME,
  NAV_DAMIL_ANALYTICS,
} from "../AppNavigation/leftNavData";
import { LeftNavList } from "../layoutVariables";

export const allLeftNavRoutes: LeftNavList = [
  ...NAV_DAMIL_HOME.list,
  ...NAV_DAMIL_ANALYTICS.list,
];

type RoutesMap = { [key: string]: string };

/**
 * Functions takes the routes data we provide for our left nav
 * and returns key-value pairs based of the nested structure.
 * Key is the text and value is the URL.
 */

const handleRoutesMapping = (
  navList: LeftNavList,
  parent?: string
): RoutesMap => {
  return navList.reduce((acc: RoutesMap, curr) => {
    const currentText = parent ? `${parent}-${curr.text}` : curr.text;
    const key = parent
      ? `${acc[parent] ? `${acc[parent]}-` : ""}${currentText}`
      : currentText;

    if (curr.nested) {
      const result = handleRoutesMapping(curr.nested, currentText);
      return {
        ...acc,
        ...result,
      };
    }

    if (curr.url) {
      return {
        ...acc,
        [key]: curr.url,
      };
    }

    return acc;
  }, {});
};

const LEFT_NAV_ROUTES_MAPPING: RoutesMap =
  handleRoutesMapping(allLeftNavRoutes);

const ROUTES_MAPPING: RoutesMap = {
  ...LEFT_NAV_ROUTES_MAPPING,
};

export default ROUTES_MAPPING;
