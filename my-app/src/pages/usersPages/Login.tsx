import React from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  useTheme,
  hexToRgb,
  IconButton,
} from "@mui/material";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Orb from "../../components/ogl/background";
import { useLanguageContext } from "../../context/LanguageContext";
import LoginForm from "../../components/pageComponents/UserComponents/LoginForm";
import TextType from "../../components/ogl/textTyping";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";

export const hexToVec3 = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgb(hex)
    .match(/\d+/g)!
    .map((v: any) => parseInt(v) / 255);
  return [r, g, b];
};

const LoginPage = () => {
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const MemoizedOrb = React.memo(Orb);

  const primaryColor = hexToVec3(theme.palette.primary.main);
  return (
    <>
      <CustomTooltip
        title={
          language === "bg" ? "Превключи на Английски" : "Switch to Bulgarian"
        }
        placement="left"
        sx={{ zIndex: 100, position: "absolute", top: 0, right: 0, m: 3 }}
      >
        <IconButton
          onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
        >
          <LanguageOutlined />
        </IconButton>
      </CustomTooltip>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <img
          src="/damil-logo.png"
          alt="Damil Logo"
          style={{
            width: 100,
            height: "auto",
            margin: 16,
            marginTop: "20dvh",
          }}
        />
      </Box>
      <Box
        sx={{
          pt: { xs: "10dvh", sm: 0 },
          p: 4,
          overflow: "hidden",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: theme.palette.customColors?.darkBackgroundColor,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            display: { xs: "none", sm: "block" },
            transform: {
              xs: "scale(1.8)", // mobile
              sm: "scale(1.2)", // tablets
              md: "scale(1)", // desktop and up
            },
            transformOrigin: "center",
            zIndex: 2,
            width: "100vw",
            height: "100dvh",
            backgroundColor: theme.palette.customColors?.darkBackgroundColor,
          }}
        >
          <MemoizedOrb
            primaryColor={primaryColor}
            hoverIntensity={1}
            rotateOnHover={true}
            hue={0.8}
            forceHoverState={false}
          />
        </Box>

        <Typography variant="h2" fontWeight={600} mb={4} zIndex={10}>
          <TextType
            text={[
              t("Sign in to your Profile"),
              t("Sign in to your Profile"),
              t("Sign in to your Profile"),
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{
              color: theme.palette.primary.main,
              zIndex: 10,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            {t("Sign in")}
          </Typography>
          <LoginForm />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{
              alignSelf: "flex-center",
              mt: 1,
              zIndex: 10,
              width: "fit-content",
            }}
          />
          <Typography
            variant="body2"
            fontWeight={500}
            zIndex={10}
            width={"fit-content"}
            alignSelf={"center"}
          >
            {t("You don't have an Account?")}{" "}
            <MuiLink component={RouterLink} to="/register" underline="hover">
              {t("Register Here")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// let damyandtExeptions = [
//   "packa_spam",
//   "tonkisa.p.rvt",
//   "christinee_privv",
//   "foolkstore",
//   "simon_g_inderground",
//   "jasonborntor",
//   "dragosffrn",
//   "dancho_swimming",
//   "mbtbg",
//   "garjokaa",
//   "kp_the_specimen",
//   "4a1axd",
//   "nasi_svej",
//   "013_memenca",
//   "virgogotsauce",
//   "kapomrn",
//   "thepump",
//   "pg_t19c",
//   "daniels_laizans",
//   "atanaskolev_official",
//   "caliathletics_",
//   "chocheev",
//   "drink_t19c",
//   "samihossny",
//   "23gregoire",
//   "kudeemusakata",
//   "guyintheblueshirt",
//   "emiltrf",
//   "europeancomedy",
//   "fyresofia",
//   "mcgregorlifestyle",
//   "austin_dunham",
//   "memebok",
//   "hristov_sw",
//   "stanbrowney",
//   "ebe_mi_sa_brat",
//   "veche.znam",
//   "east_boy_sofia",
//   "chrisheria",
//   "lucianoloco",
//   "wibmerfabio",
//   "thenotoriousmma",
//   "clips",
//   "alex_eubank15",
//   "kingryan",
//   "cbum",
//   "champagnepapi",
//   "loganpaul",
//   "jakepaul",
//   "mercedesbenz",
//   "complex",
//   "miketyson",
//   "dimoffsl",
//   "k.mbappe",
//   "mr.daidadrupnaiaz",
//   "prvt.stelka",
//   "mitrevvvvv",
//   "mihaylov681",
//   "tonipetrov",
//   "mekhtiev_v12",
//   "freak.mma",
//   "antonpetrovacademy",
//   "blakehark777",
//   "khamzat_chimaev",
//   "factmafia",
//   "valentingeorgievmt",
//   "martin_petkov__",
//   "seikowrld",
//   "seventysaints.eu",
//   "abos.whips",
//   "shunakadsd",
//   "code4web",
//   "snowboard_jesus",
//   "kristiankirilov13",
//   "vokil2007",
// ];

// const LoginPage = () => {
//   const [followers, setFollowers] = useState("");
//   const [followersList, setFollowersList] = useState<any>("");
//   const [followingList, setFollowingList] = useState<any>("");
//   const [following, setFollowing] = useState("");
//   const [nonFollowers, setNonFollowers] = useState<string[]>([]);

//   const handleSubmit = () => {
//     getUsernames(followers, setFollowersList);
//     getUsernames(following, setFollowingList);

//     const notFollowingBack: any = followingList.filter(
//       (user: any) => !followersList.includes(user)
//     );

//     setNonFollowers(forDamyandt(notFollowingBack));
//   };

//   const getUsernames = (value: any, setter: any) => {
//     const regex = /href="\/([^\/]+)\/"/g;
//     const matches = [...value.matchAll(regex)];
//     const extractedUsernames = [...new Set(matches.map((match) => match[1]))]; // Remove duplicates
//     setter(extractedUsernames);
//   };

//   useEffect(() => {
//     console.log(followersList);
//     console.log(followingList);
//   }, [followersList, followingList]);

//   const forDamyandt = (dontFollowMe: any) => {
//     let dontFollowMeEdited = [];
//     for (let person of dontFollowMe) {
//       if (!damyandtExeptions.includes(person)) {
//         dontFollowMeEdited.push(person);
//       }
//     }

//     return dontFollowMeEdited;
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 6 }}>
//       <Card elevation={4} sx={{ borderRadius: 3 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom align="center">
//             Instagram – Who Doesn't Follow You Back
//           </Typography>

//           <Box display="flex" flexDirection="column" gap={3} mt={2}>
//             <TextField
//               label="Followers"
//               multiline
//               rows={5}
//               variant="outlined"
//               value={followers}
//               onChange={(e) => setFollowers(e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Following"
//               multiline
//               rows={5}
//               variant="outlined"
//               value={following}
//               onChange={(e) => setFollowing(e.target.value)}
//               fullWidth
//             />
//             <Button
//               variant="contained"
//               size="large"
//               onClick={handleSubmit}
//               sx={{ borderRadius: 2 }}
//             >
//               Check
//             </Button>
//           </Box>

//           <Box mt={4}>
//             <Typography variant="h6" gutterBottom>
//               Not Following You Back:
//             </Typography>

//             {nonFollowers.length > 0 ? (
//               <List dense>
//                 {nonFollowers.map((user, index) => (
//                   <ListItem key={index} sx={{ pl: 0 }}>
//                     <ListItemText primary={`• ${user}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             ) : (
//               <Typography color="text.secondary">
//                 Everyone you follow is following you back 🎉
//               </Typography>
//             )}
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default LoginPage;
