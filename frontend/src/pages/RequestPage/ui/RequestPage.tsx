import {useTranslation} from 'react-i18next';
import {RequestForm} from 'entities/Request';

const RequestPage = () => {
    const {t} = useTranslation();
    return (
        <section className="container p-5 w-full mx-auto">
            <RequestForm className="max-w-[700px] mx-auto p-4 bg-blue-200 rounded-xl" />
        </section>
    );
};

export default RequestPage;