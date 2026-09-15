import { useTranslation } from 'react-i18next';
import MarkdownRenderer from './MarkdownRenderer';

interface AboutProps {
  content: string;
}

export default function About({ content }: AboutProps) {
  const { t } = useTranslation();

  return (
    <div className="content-card">
      <h2 className="text-[20px] font-bold text-text-title mb-8 border-b border-border pb-2">{t('about')}</h2>
      {content ? (
        <MarkdownRenderer content={content} />
      ) : (
        <p className="text-text-muted">{t('noResults', { query: 'about' })}</p>
      )}
    </div>
  );
}
