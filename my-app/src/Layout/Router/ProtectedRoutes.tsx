import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  filteredNavSections: any[];
  userAbonnement: string;
}

const isUrlAllowedForAbonnement = (
  url: string,
  sections: any[],
  userAbonnement: string
): boolean => {
  for (const section of sections) {
    const allowed =
      !section.abonnement ||
      section.abonnement.length === 0 ||
      section.abonnement.includes(userAbonnement);

    if (!allowed) continue;

    for (const item of section.list) {
      if (item.url && url.startsWith(item.url)) return true;

      if (item.nested) {
        for (const nested of item.nested) {
          if (nested.url && url.startsWith(nested.url)) return true;
        }
      }
    }
  }
  return false;
};

const ProtectedRoute = ({
  children,
  filteredNavSections,
  userAbonnement,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const allowed = isUrlAllowedForAbonnement(
      currentPath,
      filteredNavSections,
      userAbonnement
    );

    if (!allowed) {
      navigate("/no-access", { replace: true });
    }
  }, [location.pathname, filteredNavSections, userAbonnement, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
