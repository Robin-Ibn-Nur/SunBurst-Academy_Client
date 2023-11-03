import Classes from './Classes';
import AddClass from './AddClass';
import useAuth from '../../../CustomHook/useAuth';
import useAxiosSecure from '../../../CustomHook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Instructor = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: instructorData = [] } = useQuery({
        queryKey: ["instructorData", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data;
        }
    });

    return (
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
            <div className="container flex flex-col mx-auto space-y-12">
                <AddClass />

                <div className="container mx-auto max-w-[900px] gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8">
                    {
                        instructorData.map(item => <Classes
                            key={item?._id}
                            item={item}
                        ></Classes>)
                    }
                </div>
                {instructorData.length === 0 && (
                    <p className="text-center">No classes added yet.</p>
                )}
            </div>
        </section>
    );
};

export default Instructor;