import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, Star, Clock, Shield, ChevronRight, ChevronUp, ChevronDown,
  Compass, Map, Heart, User, Sparkles, Globe, Lock, CreditCard, Check,
  Sun, Mountain, Users, Wallet, Accessibility, Filter, ArrowLeft, Plus,
  BadgeCheck, Baby, Phone, Wifi, WifiOff, GripVertical, Play, X, Languages, Eye, Bell, Moon
} from "lucide-react";

const TEAL = "#00A5B8";
const TEAL_DARK = "#008A9A";
const GOLD = "#D4A853";
const SAND = "#F5E6C8";
const WARM = "#FFF8F0";
const STEPPE = "#E8D5B7";

// Kazakh ornament SVG pattern
const OrnamentPattern = ({ opacity = 0.04, color = TEAL }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
    <defs>
      <pattern id="kz-ornament" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 5 L35 15 L30 10 L25 15 Z" fill={color} />
        <path d="M30 55 L35 45 L30 50 L25 45 Z" fill={color} />
        <path d="M5 30 L15 25 L10 30 L15 35 Z" fill={color} />
        <path d="M55 30 L45 25 L50 30 L45 35 Z" fill={color} />
        <circle cx="30" cy="30" r="3" fill="none" stroke={color} strokeWidth="0.8" />
        <path d="M20 20 Q30 15 40 20 Q35 30 40 40 Q30 35 20 40 Q25 30 20 20Z" fill="none" stroke={color} strokeWidth="0.6" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#kz-ornament)" />
  </svg>
);

const ShanyrakIcon = ({ size = 24, color = GOLD }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.2" fill="none" />
    <line x1="20" y1="6" x2="20" y2="14" stroke={color} strokeWidth="1" />
    <line x1="20" y1="26" x2="20" y2="34" stroke={color} strokeWidth="1" />
    <line x1="6" y1="20" x2="14" y2="20" stroke={color} strokeWidth="1" />
    <line x1="26" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1" />
    <line x1="10" y1="10" x2="15.8" y2="15.8" stroke={color} strokeWidth="0.8" />
    <line x1="24.2" y1="24.2" x2="30" y2="30" stroke={color} strokeWidth="0.8" />
    <line x1="30" y1="10" x2="24.2" y2="15.8" stroke={color} strokeWidth="0.8" />
    <line x1="15.8" y1="24.2" x2="10" y2="30" stroke={color} strokeWidth="0.8" />
  </svg>
);

// Mock data
const locations = [
  { id: 1, name: "Алматы", subtitle: "Город у гор", rating: 4.8, reviews: 2340, img: "almaty", tags: ["Природа", "Еда", "Горы"], color: "#3B82F6" },
  { id: 2, name: "Астана", subtitle: "Столица будущего", rating: 4.7, reviews: 1890, img: "astana", tags: ["Архитектура", "Семья"], color: "#8B5CF6" },
  { id: 3, name: "Туркестан", subtitle: "Духовная столица", rating: 4.9, reviews: 1450, img: "turkestan", tags: ["История", "Культура"], color: "#D97706" },
  { id: 4, name: "Бурабай", subtitle: "Казахская Швейцария", rating: 4.6, reviews: 980, img: "burabay", tags: ["Природа", "Озера"], color: "#059669" },
];

const itineraryItems = [
  { id: 1, time: "08:00", title: "Завтрак в Kaganat", subtitle: "Национальная кухня", duration: "1ч", icon: "food" },
  { id: 2, time: "10:00", title: "Чарынский каньон", subtitle: "Гранд-Каньон Казахстана", duration: "3ч", icon: "nature" },
  { id: 3, time: "13:00", title: "Обед у реки Чарын", subtitle: "Пикник с видом", duration: "1ч", icon: "food" },
  { id: 4, time: "15:00", title: "Кольсайские озёра", subtitle: "Жемчужины Тянь-Шаня", duration: "3ч", icon: "nature" },
  { id: 5, time: "19:00", title: "Юрточный лагерь", subtitle: "Ночёвка под звёздами", duration: "—", icon: "stay" },
];

const filters = [
  { label: "Семья", icon: Users },
  { label: "Природа", icon: Mountain },
  { label: "Бюджетно", icon: Wallet },
  { label: "Доступная среда", icon: Accessibility },
  { label: "Еда", icon: Sun },
];

// Scenic placeholder generators
const ScenePlaceholder = ({ type, className = "" }) => {
  const scenes = {
    almaty: (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg, #1a365d 0%, #2563eb 40%, #7dd3fc 70%, #f0f9ff 100%)" }}>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 200 80" className="w-full">
            <path d="M0 80 L30 25 L50 45 L80 10 L110 35 L130 20 L160 40 L200 15 L200 80Z" fill="#1e3a5f" opacity="0.5" />
            <path d="M0 80 L20 40 L50 55 L90 20 L120 45 L150 30 L200 50 L200 80Z" fill="#2d5a27" opacity="0.7" />
            <path d="M0 80 L40 60 L80 50 L120 55 L160 48 L200 60 L200 80Z" fill="#38722e" />
          </svg>
        </div>
        <div className="absolute top-3 right-4 w-8 h-8 rounded-full" style={{ background: "radial-gradient(circle, #fde68a, #f59e0b)" }} />
      </div>
    ),
    astana: (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #38bdf8 100%)" }}>
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 pb-0">
          <div className="w-3 rounded-t" style={{ height: 40, background: "linear-gradient(180deg, #94a3b8, #cbd5e1)" }} />
          <div className="w-4 rounded-t" style={{ height: 55, background: "linear-gradient(180deg, #60a5fa, #93c5fd)" }} />
          <div className="w-2 rounded-t" style={{ height: 65, background: `linear-gradient(180deg, ${GOLD}, #fbbf24)` }} />
          <div className="w-5 rounded-t" style={{ height: 50, background: "linear-gradient(180deg, #a5b4fc, #c7d2fe)" }} />
          <div className="w-3 rounded-t" style={{ height: 35, background: "linear-gradient(180deg, #94a3b8, #e2e8f0)" }} />
          <div className="w-4 rounded-t" style={{ height: 45, background: "linear-gradient(180deg, #67e8f9, #a5f3fc)" }} />
        </div>
        <div className="absolute top-3 left-4">
          <Moon size={14} className="text-yellow-200" />
        </div>
      </div>
    ),
    turkestan: (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, #fef3c7 0%, #fcd34d 40%, #d97706 100%)" }}>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 200 60" className="w-full">
            <ellipse cx="100" cy="70" rx="120" ry="40" fill="#92400e" opacity="0.3" />
          </svg>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end">
          <div className="w-12 h-16 rounded-t-full border-2 border-amber-800" style={{ background: "linear-gradient(180deg, #78350f, #92400e)" }}>
            <div className="w-2 h-6 bg-amber-700 mx-auto mt-1 rounded-t" />
          </div>
        </div>
      </div>
    ),
    burabay: (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, #bfdbfe 0%, #60a5fa 30%, #2563eb 100%)" }}>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 200 60" className="w-full">
            <path d="M0 60 L30 25 L60 40 L90 15 L120 35 L200 20 L200 60Z" fill="#166534" opacity="0.8" />
            <path d="M0 60 L0 45 Q50 35 100 40 Q150 45 200 38 L200 60Z" fill="#1d4ed8" opacity="0.5" />
          </svg>
        </div>
      </div>
    ),
    canyon: (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 30%, #f97316 60%, #9a3412 100%)" }}>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 200 80" className="w-full">
            <path d="M0 30 L40 10 L60 40 L80 20 L100 50 L120 15 L140 45 L160 25 L200 35 L200 80 L0 80Z" fill="#9a3412" />
            <path d="M60 40 L80 80 L40 80Z" fill="#431407" opacity="0.4" />
            <path d="M120 15 L140 80 L100 80Z" fill="#431407" opacity="0.3" />
          </svg>
        </div>
      </div>
    ),
  };
  return scenes[type] || scenes.almaty;
};

// --- SCREENS ---

const DiscoveryScreen = ({ onLocationTap, onAIRoute }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="relative px-5 pt-5 pb-3" style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
        <OrnamentPattern opacity={0.08} color="#fff" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-teal-100 text-xs tracking-wider uppercase" style={{ fontFamily: "'Segoe UI', sans-serif", letterSpacing: "0.15em" }}>Сәлем!</p>
              <h1 className="text-white text-xl font-bold mt-0.5" style={{ fontFamily: "'Georgia', serif" }}>Куда отправимся?</h1>
            </div>
            <div className="flex items-center gap-2">
              <ShanyrakIcon size={32} color="rgba(255,255,255,0.9)" />
            </div>
          </div>
          {/* Search */}
          <div
            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 transition-all duration-300"
            style={{
              background: searchFocused ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              border: searchFocused ? `2px solid ${GOLD}` : "2px solid rgba(255,255,255,0.15)"
            }}
          >
            <Search size={18} className={searchFocused ? "text-teal-600" : "text-white/70"} />
            <input
              className="bg-transparent outline-none text-sm flex-1 placeholder-current"
              placeholder="Поиск мест и достопримечательностей..."
              style={{ color: searchFocused ? "#1a1a1a" : "rgba(255,255,255,0.85)", fontFamily: "'Segoe UI', sans-serif" }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Filter size={16} className={searchFocused ? "text-teal-500" : "text-white/50"} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {filters.map((f, i) => {
              const Icon = f.icon;
              const active = activeFilter === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveFilter(active ? null : i)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0"
                  style={{
                    background: active ? TEAL : "#f1f5f9",
                    color: active ? "#fff" : "#475569",
                    boxShadow: active ? `0 2px 8px ${TEAL}40` : "none",
                    fontFamily: "'Segoe UI', sans-serif"
                  }}
                >
                  <Icon size={13} />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Route Button */}
        <div className="px-5 py-3">
          <button
            onClick={onAIRoute}
            className="w-full relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 transition-transform active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${TEAL} 0%, #0891b2 50%, ${TEAL_DARK} 100%)`,
              boxShadow: `0 4px 20px ${TEAL}35`
            }}
          >
            <OrnamentPattern opacity={0.06} color="#fff" />
            <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
              <Sparkles size={22} className="text-white" />
            </div>
            <div className="relative z-10 flex-1 text-left">
              <p className="text-white font-bold text-sm" style={{ fontFamily: "'Georgia', serif" }}>Сгенерировать AI-маршрут</p>
              <p className="text-teal-100 text-xs mt-0.5">Умный планировщик подберёт идеальный путь</p>
            </div>
            <ChevronRight size={18} className="text-white/60 relative z-10" />
          </button>
        </div>

        {/* Popular Locations */}
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800" style={{ fontFamily: "'Georgia', serif" }}>Популярные направления</h2>
            <button className="text-xs font-medium" style={{ color: TEAL }}>Все →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => onLocationTap(loc)}
                className="shrink-0 rounded-2xl overflow-hidden transition-transform active:scale-[0.97]"
                style={{ width: 155, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
              >
                <ScenePlaceholder type={loc.img} className="w-full h-24" />
                <div className="p-3 bg-white">
                  <p className="font-bold text-sm text-gray-800 text-left" style={{ fontFamily: "'Georgia', serif" }}>{loc.name}</p>
                  <p className="text-[10px] text-gray-400 text-left mt-0.5">{loc.subtitle}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star size={11} fill={GOLD} color={GOLD} />
                    <span className="text-[11px] font-semibold text-gray-700">{loc.rating}</span>
                    <span className="text-[10px] text-gray-400">({loc.reviews})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nearby section */}
        <div className="px-5 pb-4">
          <h2 className="text-sm font-bold text-gray-800 mb-3" style={{ fontFamily: "'Georgia', serif" }}>Рядом с вами</h2>
          {[
            { name: "Медеу", desc: "Каток высокогорный", dist: "2.3 км", rating: 4.7, color: "#3b82f6" },
            { name: "Кок-Тобе", desc: "Смотровая площадка", dist: "4.1 км", rating: 4.5, color: "#10b981" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => onLocationTap({ ...item, id: 10 + i, reviews: 500, tags: ["Природа"], subtitle: item.desc })}
              className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition-all active:scale-[0.98]"
              style={{ background: "#f8fafc" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                <MapPin size={20} style={{ color: item.color }} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                <p className="text-[11px] text-gray-400">{item.desc} · {item.dist}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <Star size={10} fill={GOLD} color={GOLD} />
                <span className="text-xs font-medium text-gray-600">{item.rating}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
};

const ItineraryScreen = () => {
  const [items, setItems] = useState(itineraryItems);
  const [offlineMode, setOfflineMode] = useState(false);

  const moveItem = (index, dir) => {
    const newItems = [...items];
    const target = index + dir;
    if (target < 0 || target >= newItems.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
  };

  const iconMap = {
    food: "🍽️",
    nature: "🏔️",
    stay: "🏕️",
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-5 pb-4" style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
        <OrnamentPattern opacity={0.06} color="#fff" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-xs tracking-wider uppercase" style={{ letterSpacing: "0.12em" }}>Ваш маршрут</p>
              <h1 className="text-white text-lg font-bold mt-0.5" style={{ fontFamily: "'Georgia', serif" }}>Алматинская область</h1>
            </div>
            <div className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>
              1 день
            </div>
          </div>

          {/* Offline toggle */}
          <div className="flex items-center justify-between mt-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.12)" }}>
            <div className="flex items-center gap-2">
              {offlineMode ? <WifiOff size={15} className="text-white/80" /> : <Wifi size={15} className="text-white/80" />}
              <span className="text-xs text-white/90 font-medium">Доступно офлайн</span>
            </div>
            <button
              onClick={() => setOfflineMode(!offlineMode)}
              className="w-10 h-5.5 rounded-full transition-all duration-300 relative"
              style={{ background: offlineMode ? GOLD : "rgba(255,255,255,0.25)", padding: 2, width: 40, height: 22 }}
            >
              <div
                className="w-4.5 h-4.5 rounded-full bg-white shadow transition-transform duration-300"
                style={{ width: 18, height: 18, transform: offlineMode ? "translateX(18px)" : "translateX(0)" }}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
        {/* Timeline */}
        <div className="relative">
          {items.map((item, i) => (
            <div key={item.id} className="flex gap-3 mb-1 group" style={{ animation: `fadeSlideIn 0.3s ease ${i * 0.06}s both` }}>
              {/* Timeline line */}
              <div className="flex flex-col items-center" style={{ width: 44 }}>
                <span className="text-[11px] font-bold" style={{ color: TEAL }}>{item.time}</span>
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 border-2" style={{ borderColor: TEAL, background: i === 0 ? TEAL : "#fff" }} />
                {i < items.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ background: `${TEAL}25` }} />}
              </div>

              {/* Card */}
              <div
                className="flex-1 p-3 rounded-xl mb-2 flex items-center gap-3 transition-all"
                style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}
              >
                <span className="text-xl">{iconMap[item.icon]}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800 truncate">{item.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.subtitle} · {item.duration}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveItem(i, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center transition-colors"
                    style={{ background: i > 0 ? `${TEAL}10` : "transparent" }}
                  >
                    <ChevronUp size={14} className={i > 0 ? "text-teal-600" : "text-gray-200"} />
                  </button>
                  <button
                    onClick={() => moveItem(i, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center transition-colors"
                    style={{ background: i < items.length - 1 ? `${TEAL}10` : "transparent" }}
                  >
                    <ChevronDown size={14} className={i < items.length - 1 ? "text-teal-600" : "text-gray-200"} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          className="w-full mt-2 p-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          style={{ borderColor: `${TEAL}30`, color: TEAL }}
        >
          <Plus size={16} />
          Добавить место
        </button>

        {/* Summary */}
        <div className="mt-4 p-4 rounded-2xl" style={{ background: WARM }}>
          <div className="flex items-center gap-2 mb-2">
            <ShanyrakIcon size={20} color={GOLD} />
            <span className="text-xs font-bold text-gray-700">Итого по маршруту</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Расстояние", value: "280 км" },
              { label: "Время в пути", value: "~4.5ч" },
              { label: "Бюджет", value: "~25 000 ₸" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-sm font-bold text-gray-800">{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
};

const POIScreen = ({ location, onBack, onAddToRoute }) => {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const loc = location || locations[2]; // Default to Turkestan

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Hero */}
      <div className="relative">
        <ScenePlaceholder type={loc.img || "turkestan"} className="w-full h-52" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)" }} />
        <button onClick={onBack} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft size={18} className="text-white" />
        </button>
        <button onClick={() => setLiked(!liked)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
          <Heart size={18} className={liked ? "text-red-400" : "text-white"} fill={liked ? "#f87171" : "none"} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1.5 mb-1">
            <BadgeCheck size={16} style={{ color: TEAL }} />
            <span className="text-[10px] text-teal-100 font-medium uppercase tracking-wider">Проверено Sapar</span>
          </div>
          <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>{loc.name}</h1>
          <p className="text-white/70 text-xs mt-0.5">{loc.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Rating & status */}
        <div className="px-5 pt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star size={14} fill={GOLD} color={GOLD} />
            <span className="font-bold text-sm text-gray-800">{loc.rating}</span>
            <span className="text-xs text-gray-400">({loc.reviews} отзывов)</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#dcfce7" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium text-green-700">Открыто сейчас</span>
          </div>
        </div>

        {/* Hours */}
        <div className="px-5 mt-3 flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500">09:00 – 18:00 · Ежедневно</span>
        </div>

        {/* Tags */}
        <div className="px-5 mt-3 flex gap-1.5 flex-wrap">
          {(loc.tags || ["История", "Культура"]).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: `${TEAL}10`, color: TEAL }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 mt-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Одно из самых популярных мест Казахстана. Здесь вы найдёте уникальное сочетание природной красоты, богатой истории и гостеприимства местных жителей. Идеальное место для семейного отдыха и культурного обогащения.
          </p>
        </div>

        {/* Safety & Accessibility */}
        <div className="px-5 mt-4">
          <h3 className="text-xs font-bold text-gray-700 mb-2" style={{ fontFamily: "'Georgia', serif" }}>Безопасность и доступность</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Baby, label: "Подходит для детей", ok: true },
              { icon: Accessibility, label: "Для маломобильных", ok: true },
              { icon: Shield, label: "Безопасно", ok: true },
              { icon: Phone, label: "Связь доступна", ok: false },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: item.ok ? "#f0fdf4" : "#fef2f2" }}>
                  <Icon size={14} className={item.ok ? "text-green-600" : "text-red-400"} />
                  <span className="text-[11px] font-medium" style={{ color: item.ok ? "#166534" : "#991b1b" }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add to route */}
        <div className="px-5 mt-5 pb-4">
          <button
            onClick={() => { setAdded(true); onAddToRoute && onAddToRoute(); }}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: added ? "#16a34a" : `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)`,
              boxShadow: `0 4px 16px ${added ? "#16a34a" : TEAL}30`
            }}
          >
            {added ? <><Check size={18} /> Добавлено в маршрут</> : <><Plus size={18} /> Добавить в маршрут</>}
          </button>
        </div>
        <div className="h-2" />
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const [lang, setLang] = useState("РУС");
  const [geoEnabled, setGeoEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className="rounded-full transition-all duration-300 relative"
      style={{ background: value ? TEAL : "#d1d5db", padding: 2, width: 40, height: 22 }}
    >
      <div
        className="rounded-full bg-white shadow transition-transform duration-300"
        style={{ width: 18, height: 18, transform: value ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="relative px-5 pt-5 pb-6" style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }}>
        <OrnamentPattern opacity={0.06} color="#fff" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}>
            <ShanyrakIcon size={36} color="rgba(255,255,255,0.9)" />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold" style={{ fontFamily: "'Georgia', serif" }}>Айдар Касымов</h1>
            <p className="text-teal-100 text-xs mt-0.5">Путешественник с 2024</p>
            <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full" style={{ background: `${GOLD}30` }}>
              <Star size={10} fill={GOLD} color={GOLD} />
              <span className="text-[10px] font-semibold" style={{ color: GOLD }}>Premium</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 -mt-3">
        {/* Language */}
        <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Languages size={16} style={{ color: TEAL }} />
            <span className="text-xs font-bold text-gray-700">Язык интерфейса</span>
          </div>
          <div className="flex gap-2">
            {["ҚАЗ", "РУС", "ENG"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: lang === l ? TEAL : "#f1f5f9",
                  color: lang === l ? "#fff" : "#64748b",
                  boxShadow: lang === l ? `0 2px 8px ${TEAL}30` : "none"
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} style={{ color: TEAL }} />
            <span className="text-xs font-bold text-gray-700">Приватность и данные</span>
          </div>
          {[
            { label: "Геолокация", desc: "Для поиска мест рядом", value: geoEnabled, onChange: setGeoEnabled },
            { label: "Аналитика", desc: "Помогает улучшать приложение", value: analyticsEnabled, onChange: setAnalyticsEnabled },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 1 ? "1px solid #f1f5f9" : "none" }}>
              <div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle value={item.value} onChange={item.onChange} />
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl p-4 mb-3" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} style={{ color: TEAL }} />
            <span className="text-xs font-bold text-gray-700">Настройки</span>
          </div>
          {[
            { label: "Уведомления", desc: "Push-уведомления о маршрутах", value: notifications, onChange: setNotifications },
            { label: "Тёмная тема", desc: "Сберегите заряд батареи", value: darkMode, onChange: setDarkMode },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 1 ? "1px solid #f1f5f9" : "none" }}>
              <div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Toggle value={item.value} onChange={item.onChange} />
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div className="relative overflow-hidden rounded-2xl p-4 mb-4" style={{ background: `linear-gradient(135deg, ${GOLD}15, ${SAND})` }}>
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={16} style={{ color: GOLD }} />
            <span className="text-xs font-bold text-gray-700">Подписка Premium</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-3">AI-рекомендации, эксклюзивные маршруты, без рекламы</p>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-2xl font-bold text-gray-800">1 990 ₸</span>
            <span className="text-xs text-gray-400 mb-1">/ месяц</span>
          </div>
          <div className="space-y-1.5 mb-3">
            {["AI-маршруты без ограничений", "Офлайн-карты всех регионов", "Эксклюзивные скрытые места"].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={12} style={{ color: GOLD }} />
                <span className="text-[11px] text-gray-600">{f}</span>
              </div>
            ))}
          </div>
          <button
            className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all active:scale-[0.97]"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #b8860b)`, boxShadow: `0 3px 12px ${GOLD}40` }}
          >
            Активировано ✓
          </button>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function SaparApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPOI, setShowPOI] = useState(false);

  const tabs = [
    { icon: Compass, label: "Главная" },
    { icon: Map, label: "Маршрут" },
    { icon: Heart, label: "Избранное" },
    { icon: User, label: "Профиль" },
  ];

  const handleLocationTap = (loc) => {
    setSelectedLocation(loc);
    setShowPOI(true);
  };

  const renderScreen = () => {
    if (showPOI) {
      return (
        <POIScreen
          location={selectedLocation}
          onBack={() => setShowPOI(false)}
          onAddToRoute={() => {}}
        />
      );
    }
    switch (activeTab) {
      case 0:
        return <DiscoveryScreen onLocationTap={handleLocationTap} onAIRoute={() => setActiveTab(1)} />;
      case 1:
        return <ItineraryScreen />;
      case 2:
        return (
          <div className="flex flex-col h-full bg-white items-center justify-center px-8">
            <Heart size={48} className="text-gray-200 mb-4" />
            <p className="text-sm font-bold text-gray-700 mb-1" style={{ fontFamily: "'Georgia', serif" }}>Избранные места</p>
            <p className="text-xs text-gray-400 text-center">Нажмите ♡ на любой достопримечательности, чтобы сохранить её здесь</p>
          </div>
        );
      case 3:
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: `linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%)` }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Phone frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: 375,
          height: 812,
          borderRadius: 40,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
          background: "#fff"
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-7 pt-3 pb-1 relative z-50" style={{ background: activeTab === 2 && !showPOI ? "#fff" : "transparent", position: "absolute", top: 0, left: 0, right: 0 }}>
          <span className="text-[11px] font-semibold" style={{ color: showPOI ? "#fff" : (activeTab === 2 ? "#1a1a1a" : "#fff") }}>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-0.5 rounded-full" style={{ height: 4 + i * 2, background: showPOI ? "rgba(255,255,255,0.7)" : (activeTab === 2 ? "#666" : "rgba(255,255,255,0.7)") }} />
              ))}
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="flex-1 pt-7 overflow-hidden">
          {renderScreen()}
        </div>

        {/* Tab bar */}
        {!showPOI && (
          <div className="flex items-center justify-around px-4 pb-7 pt-2" style={{ background: "#fff", borderTop: "1px solid #f1f5f9" }}>
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const active = activeTab === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="flex flex-col items-center gap-0.5 py-1 px-3 transition-all"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: active ? `${TEAL}12` : "transparent",
                      transform: active ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    <Icon
                      size={20}
                      style={{ color: active ? TEAL : "#94a3b8" }}
                      fill={active && i === 2 ? TEAL : "none"}
                      strokeWidth={active ? 2.5 : 1.8}
                    />
                  </div>
                  <span
                    className="text-[10px] font-medium transition-colors"
                    style={{ color: active ? TEAL : "#94a3b8" }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gray-300/50" />
      </div>
    </div>
  );
}
