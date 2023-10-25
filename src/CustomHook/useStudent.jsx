import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudent = () => {
    const { loading, user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: isStudent, isLoading: isStudentLoading } = useQuery({
        queryKey: ["isStudent", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/users/student/${user?.email}`);
            return res.data.student;
        }
    });

    return [isStudent, isStudentLoading];
};

export default useStudent;