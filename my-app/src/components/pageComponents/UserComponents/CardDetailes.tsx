import { useEffect, useState } from "react";
import Button from "../../MaterialUI/Button";
import { Response } from "../../../Global/Types/commonTypes";
import callApi from "../../../API/callApi";
import { useAuthedContext } from "../../../context/AuthContext";
import { getLink } from "../../../pages/usersPages/api/getQueries";
import { DataForCardLinkStripe } from "../../../pages/usersPages/api/userTypes";

const CardDetails = () => {
  const [link, setLink] = useState<string>("");
  const { setAuthedUser, tenant } = useAuthedContext();
  const [data, _] = useState<DataForCardLinkStripe>({
    connectedAccountId: tenant.stripeAccountId,
    returnUrl: "https://damilsoft.com/",
    refreshUrl: "https://damilsoft.com/",
  });

  const fetchLink = async () => {
    const response = await callApi<Response<any>>({
      query: getLink(data),
      auth: { setAuthedUser },
    });
    setLink(response.data);
  };

  useEffect(() => {
    fetchLink();
  }, [setAuthedUser]);
  return (
    <>
      <Button
        onClick={() => {
          window.location.href = link;
        }}
      >
        Go to Stripe
      </Button>
    </>
  );
};

export default CardDetails;
