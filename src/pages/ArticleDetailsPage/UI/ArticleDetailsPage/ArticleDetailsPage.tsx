import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/UI/Text/Text';
import { CommentList } from 'entities/Comment';

import cls from './ArticleDetailsPage.module.scss';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { articleDetailsCommentsReducer } from '../../model/slices/articleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleComments } from './../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from './../../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from './../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const initialReducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailsPage = () => {
    const { id }= useParams<{id: string}>();
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleCommentsIsLoading);

    useDynamicModuleLoader(initialReducers);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    if (!id && __PROJECT__ !== 'storybook') {
        return (
            <div className={classNames('', {}, [])}>
                {t('Article was not found')}
            </div>
        );
    }

    return (
        <div className={classNames('', {}, [])}>
            <ArticleDetails id={id} />
            <Text className={cls.commentTitle} title={t('Comments')} />
            <CommentList isLoading={isLoading} comments={comments} />
        </div>
    );
}; 

export default memo(ArticleDetailsPage);
