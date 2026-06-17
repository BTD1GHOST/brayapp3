import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bookmark, Star, Flame, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { BIBLE_BOOKS, getVerses } from '../data/bible';
import { QUOTES, QUOTE_CATEGORIES, getQuotesByCategory, getRandomQuote, getDailyQuote, searchQuotes } from '../data/quotes';
import type { BibleBookmark } from '../types';

type Tab = 'read' | 'quotes' | 'bookmarks';

export default function BibleCenter() {
  const store = useStore();
  const [tab, setTab] = useState<Tab>('read');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [testament, setTestament] = useState<'old' | 'new'>('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteCategory, setQuoteCategory] = useState<string>('all');
  const [showRandom, setShowRandom] = useState(false);

  const bibleStreak = store.getBibleStreak();

  const currentBook = BIBLE_BOOKS.find(b => b.name === selectedBook);
  const verses = selectedBook && selectedChapter ? getVerses(selectedBook, selectedChapter) : [];

  const filteredQuotes = quoteCategory === 'all' ? QUOTES : getQuotesByCategory(quoteCategory);
  const searchResults = searchQuery ? searchQuotes(searchQuery) : [];
  const dailyQuote = getDailyQuote();

  const addBookmark = (book: string, chapter: number, verse: number) => {
    const bookmark: BibleBookmark = {
      book,
      chapter,
      verse,
      date: new Date().toISOString(),
      highlighted: false,
    };
    store.addBookmark(bookmark);
    store.addXP(5);
  };

  const isBookmarked = (book: string, chapter: number, verse: number) => {
    return store.bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === verse);
  };

  return (
    <div className="h-full scrollable">
      <div className="p-4 pb-28 space-y-4">
        <div className="mt-2">
          <h1 className="text-2xl font-bold gold-text">Bible Center</h1>
          <p className="text-dark-300 text-sm">Feed your spirit</p>
        </div>

        {/* Daily Verse */}
        <div className="glass-gold rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={12} className="text-gold-400" />
            <span className="text-gold-400 text-xs font-semibold">Verse of the Day</span>
          </div>
          <p className="text-dark-100 text-sm italic leading-relaxed">"{dailyQuote.text}"</p>
          <p className="text-gold-400 text-xs mt-1">— {dailyQuote.reference}</p>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2">
          <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <Flame size={12} className="text-orange-400" />
            <span className="text-orange-400 text-xs font-bold">{bibleStreak}d streak</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['read', 'quotes', 'bookmarks'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold ${tab === t ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
              {t === 'read' ? '📖 Read' : t === 'quotes' ? '💬 Quotes' : '🔖 Saved'}
            </button>
          ))}
        </div>

        {/* READ TAB */}
        {tab === 'read' && (
          <div className="space-y-3">
            {/* Testament Toggle */}
            <div className="flex gap-2">
              {(['old', 'new'] as const).map(t => (
                <button key={t} onClick={() => { setTestament(t); setSelectedBook(null); setSelectedChapter(null); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold ${testament === t ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                  {t === 'old' ? 'Old Testament' : 'New Testament'}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search verses..."
                className="w-full pl-8 pr-3 py-2.5 rounded-xl glass text-white text-sm" />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="space-y-2">
                {searchResults.slice(0, 10).map(q => (
                  <div key={q.id} className="glass rounded-xl p-3">
                    <p className="text-dark-100 text-xs italic">"{q.text}"</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gold-400 text-[10px]">{q.reference}</span>
                      <button onClick={() => store.toggleFavoriteQuote(q.id)}>
                        <Star size={10} className={store.favoriteQuotes.includes(q.id) ? 'text-gold-400' : 'text-dark-400'} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Book Selector */}
            {!selectedBook && !searchQuery && (
              <div className="grid grid-cols-3 gap-1.5">
                {BIBLE_BOOKS.filter(b => b.testament === testament).map(book => (
                  <button key={book.name} onClick={() => setSelectedBook(book.name)}
                    className="glass rounded-xl p-2.5 text-left active:bg-white/5">
                    <p className="text-white text-xs font-medium truncate">{book.name}</p>
                    <p className="text-dark-400 text-[9px]">{book.chapters} chapters</p>
                  </button>
                ))}
              </div>
            )}

            {/* Chapter Selector */}
            {selectedBook && !selectedChapter && (
              <div>
                <button onClick={() => setSelectedBook(null)}
                  className="text-gold-400 text-xs mb-2">← Back to books</button>
                <h3 className="text-white font-semibold text-sm mb-2">{selectedBook}</h3>
                <div className="grid grid-cols-5 gap-1.5">
                  {currentBook && Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(ch => (
                    <button key={ch} onClick={() => setSelectedChapter(ch)}
                      className="glass rounded-xl py-2 text-center active:bg-white/5">
                      <span className="text-white text-xs">{ch}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Verses */}
            {selectedBook && selectedChapter && (
              <div>
                <button onClick={() => setSelectedChapter(null)}
                  className="text-gold-400 text-xs mb-2">← Back to chapters</button>
                <h3 className="text-white font-semibold text-sm mb-3">{selectedBook} {selectedChapter}</h3>
                <div className="space-y-2">
                  {verses.map((verse, i) => (
                    <div key={i} className="flex items-start gap-2 glass rounded-xl p-3">
                      <span className="text-gold-400 text-[10px] font-bold mt-0.5 w-5 flex-shrink-0">{i + 1}</span>
                      <p className="text-dark-100 text-xs leading-relaxed flex-1">{verse}</p>
                      <button onClick={() => isBookmarked(selectedBook, selectedChapter, i + 1)
                          ? store.removeBookmark(selectedBook, selectedChapter, i + 1)
                          : addBookmark(selectedBook, selectedChapter, i + 1)
                        }>
                        <Bookmark size={10} className={isBookmarked(selectedBook, selectedChapter, i + 1) ? 'text-gold-400' : 'text-dark-400'} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUOTES TAB */}
        {tab === 'quotes' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowRandom(!showRandom)}
                className="glass-gold rounded-xl px-3 py-1.5 text-gold-400 text-xs font-semibold">
                🎲 Random Verse
              </motion.button>
            </div>

            {showRandom && (
              <div className="glass-gold rounded-2xl p-4">
                <p className="text-dark-100 text-sm italic">"{getRandomQuote().text}"</p>
                <p className="text-gold-400 text-xs mt-1">— {getRandomQuote().reference}</p>
              </div>
            )}

            <div className="flex gap-1.5 overflow-x-auto scrollable pb-1">
              {['all', ...QUOTE_CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setQuoteCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${quoteCategory === cat ? 'glass-gold text-gold-400' : 'glass text-dark-300'}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredQuotes.map(quote => (
                <div key={quote.id} className="glass rounded-xl p-3">
                  <p className="text-dark-100 text-xs italic leading-relaxed">"{quote.text}"</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gold-400 text-[10px]">{quote.reference}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-dark-400 text-[9px] uppercase">{quote.category}</span>
                      <button onClick={() => store.toggleFavoriteQuote(quote.id)}>
                        <Star size={10} className={store.favoriteQuotes.includes(quote.id) ? 'text-gold-400 fill-gold-400' : 'text-dark-400'} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKMARKS TAB */}
        {tab === 'bookmarks' && (
          <div className="space-y-2">
            {store.bookmarks.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark size={32} className="text-dark-500 mx-auto mb-2" />
                <p className="text-dark-400 text-sm">No bookmarks yet</p>
                <p className="text-dark-500 text-xs mt-1">Save verses while reading</p>
              </div>
            ) : (
              store.bookmarks.map((bm, i) => (
                <div key={i} className="glass rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">{bm.book} {bm.chapter}:{bm.verse}</p>
                    <p className="text-dark-300 text-[10px]">{new Date(bm.date).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => store.removeBookmark(bm.book, bm.chapter, bm.verse)}>
                    <Bookmark size={14} className="text-gold-400 fill-gold-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
