import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useClassPage = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: classPage = [] } = useQuery({
        queryKey: ['classPage'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classPage');
            return res.data;
        }
    })
    return { classPage, axiosSecure }
};

export default useClassPage;