import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({className}: NotFoundPageProps) => {
    const { t } = useTranslation('notfoundpage');

    return (
        <div className={classNames(cls.notFoundPage, {}, [className])}>
            {t('Page not found')}
        </div>
    );
};
