import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const PageNotFound = () => {

    // const theme = useTheme();
    const lgMediaQuery = useMediaQuery("(max-width:1199px)");
    const [openLeftNav, setOpenLeftNav] = useState(!lgMediaQuery);


    useEffect(() => {
        if (lgMediaQuery && openLeftNav) {
            setOpenLeftNav(false);
        }
    }, [lgMediaQuery]);

    return (
        <Box
            component="div"
            // css={[styles.flexCenter, styles.pageNotFoundContent]}
            flexDirection="column"
        >
            <Box component="div">
                {/* <img src="/404-PageNotFound.png" alt="404-Page-NotFound" width="300" /> */}
            </Box>
            <Typography variant="h1" color="primary.main" mt={4}>
                404
            </Typography>
            <Typography variant="h2" mt={1} >
                Oops! "Page Not Found".
            </Typography>
        </Box>
    );
};

export default PageNotFound;
