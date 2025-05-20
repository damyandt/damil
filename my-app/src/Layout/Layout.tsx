import { Box, Theme, useMediaQuery } from "@mui/material";
import TopNavigation from "./AppNavigation/TopNavigation";
import { useState } from "react";
import LeftNavigation from "./AppNavigation/LeftNavigation";
import { css, SerializedStyles } from "@emotion/react";
import {
    AUTH_LAYOUT_BACKGROUND_COLOR,
    AUTH_LAYOUT_PADDING,
    LEFT_NAV_WIDTH,
    TOP_NAV_SPACING_WITH_SITE_CONTENT,
    AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
} from "./layoutVariables";
import { useTheme } from "@mui/material/styles";
import cssLayoutStyles from "../Global/Styles/layout";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
    css?: SerializedStyles[] | SerializedStyles;
    className?: string;
}

const cssStyles = (
    theme: Theme,
    leftNavIsOpen: boolean,
    mobileLeftNav: boolean,
) => ({
    contentContainer: css({
        backgroundColor:
            theme.palette.mode === "light"
                ? AUTH_LAYOUT_BACKGROUND_COLOR
                : AUTH_LAYOUT_DARK_BACKGROUND_COLOR,
    }),

    outletContainer: css({
        marginTop: TOP_NAV_SPACING_WITH_SITE_CONTENT,
        marginRight: 0,
        minHeight: `calc(100vh - ${TOP_NAV_SPACING_WITH_SITE_CONTENT})`,
        flexGrow: 1,
        position: "relative",
        padding: AUTH_LAYOUT_PADDING,
        backgroundColor:
            theme.palette.mode === "light"
                ? AUTH_LAYOUT_BACKGROUND_COLOR
                : AUTH_LAYOUT_DARK_BACKGROUND_COLOR,

        // if mobile view -> don't have transition
        ...(!mobileLeftNav && {
            transition: [
                theme.transitions.create("marginRight", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                theme.transitions.create("margin", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            ].join(", "),
            marginLeft: 0,
            ...(leftNavIsOpen && {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: LEFT_NAV_WIDTH,
            }),
        }),
    }),
});
const Layout: React.FC<AuthLayoutProps> = ({ className }) => {

    const theme = useTheme();
    const lgMediaQuery = useMediaQuery("(max-width:1199px)");
    const [openLeftNav, setOpenLeftNav] = useState<boolean>(!lgMediaQuery);
    const styles = {
        ...cssStyles(theme, openLeftNav, lgMediaQuery),
        ...cssLayoutStyles,
    };

    return (
        <Box component="div" className={className}
            sx={[styles.flexColumn, styles.contentContainer]}>
            <TopNavigation
                setOpenLeftNav={setOpenLeftNav}
            />
            <LeftNavigation
                openLeftNav={openLeftNav}
                setOpenLeftNav={setOpenLeftNav}
                mobileLeftNav={lgMediaQuery}
            />

            <Box sx={styles.outletContainer} component="main">
                <Outlet context={{ openLeftNav }} />
            </Box>
        </Box>
    );
}

export default Layout;
