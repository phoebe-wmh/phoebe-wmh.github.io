import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Home, Tag, Search, User, Settings, Rss } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ArchiveEntry } from '../services/types';
import Sidebar from './Sidebar';
import PostList from './PostList';
import PostDetail from './PostDetail';
import SearchView from './Search';
import TagsView from './Tags';
import SettingsView from './Settings';
import AboutView from './About';
import CategoriesView from './Categories';
import config from '../config/config.json';

interface LayoutProps {
  entries: ArchiveEntry[];
  categories: string[];
  allTags: string[];
  name: string;
  bio: string;
  title: string;
  subtitle: string;
  aboutContent: string;
}

type View = 'list' | 'search' | 'tags' | 'settings' | 'about' | 'categories' | 'post';

const POSTS_PER_PAGE = config.ui.postsPerPage || 10;

export default function Layout({
  entries,
  categories,
  allTags,
  name,
  bio,
  title,
  subtitle,
  aboutContent,
}: LayoutProps) {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<View>('list');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<ArchiveEntry | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || config.ui.defaultTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const sortedCategories = [...categories].sort((a, b) => {
    const countA = entries.filter(e => e.category === a && e.id !== 'about').length;
    const countB = entries.filter(e => e.category === b && e.id !== 'about').length;
    if (countA !== countB) return countB - countA;
    return a.localeCompare(b);
  });

  const handleCategoryClick = (category: string) => {
    if (category === 'Tags') {
      setActiveView('tags');
    } else if (category === 'Search') {
      setActiveView('search');
    } else if (category === 'About') {
      setActiveView('about');
    } else if (category === 'Settings') {
      setActiveView('settings');
    } else if (category === 'Categories') {
      setActiveView('categories');
    } else {
      setActiveCategory(category);
      setActiveView('list');
      setVisibleCount(POSTS_PER_PAGE);
    }
    setSidebarOpen(false);
  };

  const handleTagClick = (tag: string) => {
    setActiveCategory('All');
    setActiveView('search');
    setSearchQuery(tag);
    setSidebarOpen(false);
  };

  const handlePostClick = (id: string) => {
    const post = entries.find(e => e.id === id);
    if (post) {
      setSelectedPost(post);
      setActiveView('post');
    }
    setSidebarOpen(false);
  };

  const handleBack = () => {
    setActiveView('list');
    setSelectedPost(null);
  };

  const filteredEntries = entries.filter(e => {
    if (e.id === 'about') return false;
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      e.title.toLowerCase().includes(query) ||
      e.content.toLowerCase().includes(query) ||
      (e.tags || []).some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const renderContent = () => {
    switch (activeView) {
      case 'post':
        return selectedPost ? (
          <PostDetail
            entry={selectedPost}
            previousEntry={sortedEntries.find(e => e.id !== 'about' && e.id !== selectedPost.id)}
            onNavigate={(id) => handlePostClick(id)}
            onBack={handleBack}
            onTagClick={handleTagClick}
            buyMeCoffeeUrl={config.profile.buyMeCoffeeUrl}
          />
        ) : null;
      case 'search':
        return (
          <SearchView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredEntries={filteredEntries}
            onPostClick={handlePostClick}
          />
        );
      case 'tags':
        return <TagsView allTags={allTags} onTagClick={handleTagClick} />;
      case 'settings':
        return <SettingsView theme={theme} toggleTheme={toggleTheme} />;
      case 'about':
        return <AboutView content={aboutContent} />;
      case 'categories':
        return (
          <CategoriesView
            categories={sortedCategories}
            entries={entries}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            onPostClick={handlePostClick}
          />
        );
      default:
        return (
          <PostList
            entries={filteredEntries}
            activeCategory={activeCategory}
            visibleCount={visibleCount}
            onLoadMore={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
            onPostClick={handlePostClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar
        activeCategory={activeView === 'list' ? activeCategory : activeView}
        onCategoryClick={handleCategoryClick}
        entries={entries}
        categories={categories}
        allTags={allTags}
        name={name}
        bio={bio}
        title={title}
        subtitle={subtitle}
      />
      <div className="content-area">
        <div className="header-bar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div key={activeView}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
