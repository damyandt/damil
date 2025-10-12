import FloatingRightMenu from "../../../Layout/AppNavigation/FloatingRightNav";
import QRCode from "../../../pages/Home/QRCode";

const QrCodeButton = () => {
  return <FloatingRightMenu extraMenu={<QRCode />} />;
};

export default QrCodeButton;
