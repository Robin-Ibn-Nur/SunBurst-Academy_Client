import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSelectedClass = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['selectedClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    })
    return { user, selectedClasses, refetch, axiosSecure, isLoading, isError }
};

export default useSelectedClass;
