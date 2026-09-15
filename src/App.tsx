import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Search from './components/Search';
import Tags from './components/Tags';
import Settings from './components/Settings';
import About from './components/About';
import Categories from './components/Categories';
import { ArchiveEntry } from './services/types';
import config from './config/config.json';

// Import all markdown files from public directory
const markdownFiles = import.meta.glob('./public/*.md', { eager: true }) as Record<string, {
  default: string;
}>;

const aboutFiles = import.meta.glob('./source/*.md', { eager: true }) as Record<string, {
  default: string;
}>;

interface PostModule {
  attributes: {
    title?: string;
    category?: string;
    date?: string;
    tags?: string[];
    summary?: string;
    excerpt?: string;
  };
  body: string;
}

const grayMatter = (content: string): PostModule => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { attributes: {}, body: content };
  }

  const attrs: PostModule['attributes'] = {};
  const frontmatter = match[1];

  frontmatter.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return;
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1).split(',').map(v => v.trim());
      }
    }

    attrs[key] = value as any;
  });

  return { attributes: attrs, body: match[2] };
};

function App() {
  const [entries, setEntries] = useState<ArchiveEntry[]>([]);
  const [aboutContent, setAboutContent] = useState<string>('');

  useEffect(() => {
    const loadedEntries: ArchiveEntry[] = [];

    Object.entries(markdownFiles).forEach(([path, mod]) => {
      const content = mod.default;
      const parsed = grayMatter(content);
      const id = path.replace('./public/', '').replace('.md', '');
      loadedEntries.push({
        id,
        title: parsed.attributes.title || id,
        category: parsed.attributes.category || 'General',
        date: parsed.attributes.date || '',
        tags: parsed.attributes.tags || [],
        summary: parsed.attributes.summary || '',
        excerpt: parsed.attributes.excerpt || parsed.body.slice(0, 200),
        content: parsed.body,
        cover: parsed.attributes.cover || undefined,
      });
    });

    Object.entries(aboutFiles).forEach(([path, mod]) => {
      const content = mod.default;
      const parsed = grayMatter(content);
      loadedEntries.push({
        id: 'about',
        title: parsed.attributes.title || 'About',
        category: parsed.attributes.category || 'About',
        date: parsed.attributes.date || '',
        tags: parsed.attributes.tags || [],
        summary: parsed.attributes.summary || '',
        excerpt: parsed.attributes.excerpt || parsed.body.slice(0, 200),
        content: parsed.body,
        cover: parsed.attributes.cover || undefined,
      });
    });

    setEntries(loadedEntries);
  }, []);

  const categories = ['All', ...new Set(entries.map(e => e.category))];
  const allTags = [...new Set(entries.flatMap(e => e.tags || []))];

  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={
          <Layout
            entries={entries}
            categories={categories}
            allTags={allTags}
            name={config.profile.name}
            bio={config.profile.bio}
            title={config.site.title}
            subtitle={config.site.subtitle}
            aboutContent={aboutContent}
          />
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
