import { SerializedStyles } from "@emotion/react";
import { Pagination as MUiPagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentPageItems } from "./paginationUtils";

interface PaginationProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  items: any;
  pageIndex: number;
  setPageItems?: React.Dispatch<React.SetStateAction<any[]>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  className,
  items,
  pageIndex,
  itemsPerPage,
  setPageItems,
  setPageIndex,
}) => {
  const [page, setPage] = useState<number>(pageIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setPage(pageIndex);
  }, [pageIndex]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const pageItems = getCurrentPageItems(items, value, itemsPerPage);
    if (setPageItems) {
      setPageItems(pageItems);
    }
    setPageIndex(value);
  };

  return (
    <MUiPagination
      className={className}
      count={totalPages}
      page={page}
      onChange={handleChangePage}
      showFirstButton
      showLastButton
    />
  );
};

export default Pagination;
