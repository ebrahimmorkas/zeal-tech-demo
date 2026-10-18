import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, MessagesSquare, Send, Sparkles, X } from 'lucide-react';
import { GREETING, SUGGESTED_QUESTIONS, ruleBasedProvider, type ChatMessage, type ChatProvider } from '../../lib/chat/engine';
import type { DemoPaths } from '../../lib/paths';

/** Visual skin supplied by each demo so the widget matches its concept. */
export interface ChatSkin {
  accent: string;
  accentText: string;
  surface: string;
  panel: string;
  ink: string;
  muted: string;
  border: string;
  userBubble: string;
  userText: string;
  radius: string;
  font: string;
  launcher: 'pill' | 'circle' | 'square';
  title: string;
  launcherLabel: string;
}

interface Props {
  skin: ChatSkin;
  paths: DemoPaths;
  provider?: ChatProvider;
}

let counter = 0;
const uid = () => `m${++counter}`;

export function ChatAssistant({ skin, paths, provider = ruleBasedProvider }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: uid(), role: 'assistant', ...GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const userMsg: ChatMessage = { id: uid(), role: 'user', text: q };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const reply = await provider.reply([...messages, userMsg], q);
      setMessages((m) => [...m, { id: uid(), role: 'assistant', ...reply }]);
    } catch {
      setError('The assistant could not respond. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const vars = {
    '--c-accent': skin.accent,
    '--c-accent-text': skin.accentText,
    '--c-surface': skin.surface,
    '--c-panel': skin.panel,
    '--c-ink': skin.ink,
    '--c-muted': skin.muted,
    '--c-border': skin.border,
    '--c-user': skin.userBubble,
    '--c-user-text': skin.userText,
    '--c-radius': skin.radius,
    fontFamily: skin.font,
  } as CSSProperties;

  const launcherShape =
    skin.launcher === 'pill' ? 'rounded-full px-5 h-12 gap-2' : skin.launcher === 'circle' ? 'rounded-full w-14 h-14 justify-center' : 'h-12 px-4 gap-2';
  const showSuggestions = messages.length <= 2 && !loading;

  return (
    <div style={vars} className="chat-root">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-label={`${skin.title} (demo)`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed z-[70] bottom-0 right-0 sm:bottom-24 sm:right-6 w-full sm:w-[390px] h-[min(620px,88dvh)] sm:h-[min(600px,calc(100dvh-8rem))] flex flex-col overflow-hidden shadow-2xl border"
            style={{ background: 'var(--c-surface)', color: 'var(--c-ink)', borderColor: 'var(--c-border)', borderRadius: 'var(--c-radius)' }}
          >
            <header className="flex items-center justify-between gap-3 px-4 py-3" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-text)' }}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-white/15">
                  <Sparkles size={18} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight truncate">{skin.title}</p>
                  <p className="text-xs opacity-80">Demo assistant · rule-based sample answers</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                className="p-2 rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: 'var(--c-panel)' }} aria-live="polite" aria-relevant="additions">
              {messages.map((m) => (
                <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className="max-w-[86%] px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line"
                    style={
                      m.role === 'user'
                        ? { background: 'var(--c-user)', color: 'var(--c-user-text)', borderRadius: 'calc(var(--c-radius) * 0.75)' }
                        : { background: 'var(--c-surface)', color: 'var(--c-ink)', border: '1px solid var(--c-border)', borderRadius: 'calc(var(--c-radius) * 0.75)' }
                    }
                  >
                    <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>
                    {m.text}
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.links.map((l) => (
                          <Link
                            key={l.section}
                            to={paths.to(l.section)}
                            onClick={() => setOpen(false)}
                            className="text-[13px] font-semibold underline underline-offset-4 decoration-1 hover:opacity-80"
                            style={{ color: 'var(--c-accent)' }}
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="px-4 py-3 flex gap-1.5 border" style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)', borderRadius: 'calc(var(--c-radius) * 0.75)' }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--c-muted)', animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}
              {showSuggestions && (
                <div className="pt-1">
                  <p className="text-xs mb-2" style={{ color: 'var(--c-muted)' }}>
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="text-[13px] text-left px-3 py-1.5 border transition-colors hover:border-[color:var(--c-accent)]"
                        style={{ borderColor: 'var(--c-border)', borderRadius: 'calc(var(--c-radius) * 0.6)', background: 'var(--c-surface)', color: 'var(--c-ink)' }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 p-3 border-t"
              style={{ borderColor: 'var(--c-border)', background: 'var(--c-surface)' }}
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the group…"
                autoComplete="off"
                className="flex-1 min-w-0 h-11 px-3 text-[15px] border bg-transparent outline-none focus:border-[color:var(--c-accent)]"
                style={{ borderColor: 'var(--c-border)', borderRadius: 'calc(var(--c-radius) * 0.6)', color: 'var(--c-ink)' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="h-11 w-11 grid place-items-center disabled:opacity-40 transition-opacity"
                style={{ background: 'var(--c-accent)', color: 'var(--c-accent-text)', borderRadius: 'calc(var(--c-radius) * 0.6)' }}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close assistant' : `Open ${skin.title}`}
        className={`fixed z-[71] bottom-5 right-4 sm:right-6 flex items-center font-semibold text-[14px] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${launcherShape} ${open ? 'max-sm:hidden' : ''}`}
        style={{ background: 'var(--c-accent)', color: 'var(--c-accent-text)', outlineColor: 'var(--c-accent)', borderRadius: skin.launcher === 'square' ? 'var(--c-radius)' : undefined }}
      >
        {open ? <X size={20} aria-hidden /> : skin.launcher === 'circle' ? <MessageCircle size={22} aria-hidden /> : <MessagesSquare size={18} aria-hidden />}
        {skin.launcher !== 'circle' && <span>{open ? 'Close' : skin.launcherLabel}</span>}
      </button>
    </div>
  );
}
