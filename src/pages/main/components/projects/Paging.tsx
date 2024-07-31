import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '@styles/paging.css';
import Pagination from 'react-js-pagination';

interface PagingProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paging: React.FC<PagingProps> = ({
    currentPage,
    totalCount,
    pageSize,
    totalPages,
    onPageChange,
}) => {
    return (
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalCount}
            pageRangeDisplayed={totalPages}
            onChange={onPageChange}
            prevPageText={<ArrowBackIosIcon />}
            nextPageText={<ArrowForwardIosIcon />}
            firstPageText={<></>}
            lastPageText={<></>}
        />
    );
};

export default Paging;
