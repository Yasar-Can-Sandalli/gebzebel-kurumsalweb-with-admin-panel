import { useEffect, useMemo, useRef, useState } from "react";
import { kurumsal, gebze, hizmetler, eBelediye, yayinlarimiz } from "../_SayfaBilgileri/Sayfalar";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownItem } from "../_SayfaBilgileri/types";
import { FiChevronDown, FiChevronUp, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { useClickOutside } from "../useClickOutside";
import "./NavBar.css";

/**
 * Desktop (>=1280px): Üst navbar + mega dropdownlar (ilk gönderdiğin yapı)
 * Mobile (<1280px): Üst navbar yok; sol üstte TEK toggle (hamburger ⇄ X),
 *                   soldan SLIDE DRAWER. Toggle butonu drawer açılınca sağ kenarı takip eder.
 */

// === Desktop mega menü içeriklerini render ===
const renderMegaItems = (
    items: DropdownItem[],
    navigate: (to: string) => void,
    close: () => void,
    top: string
) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 right-0 bg-white rounded-md shadow-lg z-30 py-2 grid grid-cols-4 gap-2 max-w-[90%] w-full mx-auto"
        style={{ top, transformOrigin: "top center" }}
    >
        {items.map((item, index) => (
            <motion.button
                key={index}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 flex items-center hover:bg-gray-100 rounded-md cursor-pointer text-left"
                onClick={() => {
                    if (item.path) navigate(item.path);
                    close();
                }}
            >
                <motion.div className="p-2 bg-gray-100 text-gray-800 rounded-md mr-3" whileHover={{ rotate: 5 }}>
                    {item.icon}
                </motion.div>
                <div>
                    <div className="font-medium text-sm">
                        {item.title}
                        {item.isEN && <span className="text-gray-500 text-xs ml-1">(EN)</span>}
                    </div>
                    {item.description && <div className="text-gray-500 text-sm">{item.description}</div>}
                </div>
            </motion.button>
        ))}
    </motion.div>
);

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    // ortak state
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // desktop & mobile accordion
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [isNavbarFixed] = useState(false);
    const navbarControls = useAnimation();

    // mobile drawer
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState<number>(Math.min(window.innerWidth * 0.75, 320)); // 75vw, max 320px

    const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(desktopDropdownRef, () => setOpenDropdown(null)); // sadece desktop

    // scroll davranışı (desktop bar için)
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 100) {
                if (y > lastScrollPosition) {
                    navbarControls.start({ y: -100, opacity: 0.85, transition: { duration: 0.22 } });
                    setOpenDropdown(null);
                } else {
                    navbarControls.start({ y: 0, opacity: 1, transition: { duration: 0.22 } });
                }
            }
            setLastScrollPosition(y);
            setScrollPosition(y);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [lastScrollPosition, navbarControls]);

    // rota değişince mobil drawer ve akordeonları kapat
    useEffect(() => {
        setMobileOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    // ESC ile drawer kapat
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // drawer açıkken body scroll kilidi
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    // drawer genişliği (toggle'ın takibi için)
    useEffect(() => {
        const calc = () => setDrawerWidth(Math.min(window.innerWidth * 0.75, 320));
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);

    const megaTop = scrollPosition > 100 ? "8rem" : "10rem";
    const isHome = pathname === "/";
    const bgClass = isHome
        ? scrollPosition > 100
            ? "bg-[#022842]/90 z-[20]"
            : "bg-[#022842]/60 z-[20]"
        : "bg-[#022842]";

    const mobileSections = useMemo(
        () => [
            { key: "kurumsal-mobile", title: "KURUMSAL", data: kurumsal },
            { key: "gebze-mobile", title: "GEBZE", data: gebze },
            { key: "hizmetler-mobile", title: "HİZMETLER", data: hizmetler },
            { key: "yayinlarimiz-mobile", title: "YAYINLAR", data: yayinlarimiz },
            { key: "ebelediye-mobile", title: "EBELEDİYE", data: eBelediye },
        ],
        []
    );

    // --- RENDER ---
    return (
        <>
            {/* ================= DESKTOP NAVBAR (>=1280px) ================= */}
            <motion.nav
                animate={navbarControls}
                initial={{ top: 0, left: 0, right: 0, zIndex: 100 }}
                className={`hidden [@media(min-width:1280px)]:block ${isHome ? "fixed" : "relative"} ${bgClass} border-b border-gray-200 ${
                    scrollPosition > 100 ? "shadow-md" : ""
                }`}
                style={{ pointerEvents: "auto" }}
            >
                <div className={`mx-auto px-4 ${isHome ? "pr-5" : ""}`}>
                    <div className="flex justify-between h-35">
                        {/* Desktop menu items - (ilk kodundaki gibi) */}
                        <div ref={desktopDropdownRef} className="flex items-center justify-center w-full">
                            {/* Logo */}
                            <div
                                className="flex-shrink-0 flex items-center"
                                style={{ marginRight: "2vw", transition: "margin 0.2s" }}
                            >
                                <Link to={"/"}>
                                    <motion.img
                                        initial={{ opacity: 1 }}
                                        animate={{ y: isNavbarFixed ? -15 : 0, opacity: isNavbarFixed ? 0.8 : 1 }}
                                        transition={{ duration: 0.3 }}
                                        src={"/2logoyatay.png"}
                                        id={"logo"}
                                        alt="Gebze Belediyesi"
                                        className="cursor-pointer h-7 md:h-8 lg:h-9"
                                        style={{ maxHeight: "2.2rem", width: "auto" }}
                                    />
                                </Link>
                            </div>

                            {/* Main navbar items */}
                            <div
                                className="flex gap-2 md:gap-3 lg:gap-4 flex-1 flex-wrap items-center justify-center"
                                style={{ marginLeft: "0.5vw", transition: "margin 0.2s" }}
                            >
                                {/* Kurumsal */}
                                <div className="relative flex justify-center">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase"
                                        onClick={() => setOpenDropdown((p) => (p === "kurumsal" ? null : "kurumsal"))}
                                    >
                                        KURUMSAL
                                        {openDropdown === "kurumsal" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === "kurumsal" &&
                                            renderMegaItems(kurumsal, (to) => navigate(to), () => setOpenDropdown(null), megaTop)}
                                    </AnimatePresence>
                                </div>

                                {/* Gebze */}
                                <div className="relative flex justify-center">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase"
                                        onClick={() => setOpenDropdown((p) => (p === "gebze" ? null : "gebze"))}
                                    >
                                        GEBZE
                                        {openDropdown === "gebze" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === "gebze" &&
                                            renderMegaItems(gebze, (to) => navigate(to), () => setOpenDropdown(null), megaTop)}
                                    </AnimatePresence>
                                </div>

                                {/* Hizmetler */}
                                <div className="relative flex justify-center">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase"
                                        onClick={() => setOpenDropdown((p) => (p === "hizmetler" ? null : "hizmetler"))}
                                    >
                                        HİZMETLER
                                        {openDropdown === "hizmetler" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === "hizmetler" &&
                                            renderMegaItems(hizmetler, (to) => navigate(to), () => setOpenDropdown(null), megaTop)}
                                    </AnimatePresence>
                                </div>

                                {/* Yayınlar */}
                                <div className="relative flex justify-center">
                                    <button
                                        className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase"
                                        onClick={() => setOpenDropdown((p) => (p === "yayinlar" ? null : "yayinlar"))}
                                    >
                                        YAYINLAR
                                        {openDropdown === "yayinlar" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === "yayinlar" &&
                                            renderMegaItems(yayinlarimiz, (to) => navigate(to), () => setOpenDropdown(null), megaTop)}
                                    </AnimatePresence>
                                </div>

                                {/* Düz linkler */}
                                <Link className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase" to={"/e-belediye"}>
                                    EBELEDİYE
                                </Link>
                                <Link className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase" to={"/etkinlikler"}>
                                    ETKİNLİKLER
                                </Link>
                                <Link className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase" to={"/haberler"}>
                                    HABERLER
                                </Link>
                                <Link className="inline-flex items-center px-1 pt-1 text-sm md:text-base lg:text-lg font-medium text-white justify-center uppercase" to={"/iletisim"}>
                                    İLETİŞİM
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* ================= MOBILE: TEK TOGGLE + SLIDE DRAWER (<1280px) ================= */}
            {/* Tek toggle: hem açar hem kapatır, drawer açıkken sağ kenarı takip eder */}
            <button
                type="button"
                onClick={() => setMobileOpen((s) => !s)}
                className="xl:hidden fixed top-3 z-[110] inline-flex items-center justify-center rounded-xl border border-white/20 bg-[#022842] text-white p-2 shadow-md"
                aria-label="Menüyü aç/kapat"
                style={{
                    left: "0.75rem",
                    transform: `translateX(${mobileOpen ? `${drawerWidth}px` : "0px"})`,
                    transition: "transform 250ms ease",
                }}
            >
                {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>

            {/* Overlay + Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Overlay: tıklandığında kapatır */}
                        <motion.div
                            key="m-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="xl:hidden fixed inset-0 bg-black/40 z-[100]"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer: w-[75vw] max-w-[320px] */}
                        <motion.aside
                            key="m-drawer"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            className="xl:hidden fixed left-0 top-0 bottom-0 z-[105] w-[75vw] max-w-[320px] bg-[#022842] shadow-2xl ring-1 ring-black/10"
                        >
                            {/* Drawer header (sadece logo; ekstra X yok artık) */}
                            <div className="h-14 flex items-center px-4 border-b border-white/10">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <img src="/2logoyatay.png" alt="Gebze Belediyesi" className="h-7 w-auto" />
                                </Link>
                            </div>

                            {/* İçerik */}
                            <div className="h-[calc(100%-56px)] overflow-y-auto">
                                {/* Hızlı linkler */}
                                <div className="px-3 pt-3 pb-2 grid grid-cols-1 gap-2">
                                    {[
                                        { to: "/etkinlikler", label: "ETKİNLİKLER" },
                                        { to: "/haberler", label: "HABERLER" },
                                        { to: "/iletisim", label: "İLETİŞİM" },
                                    ].map((l) => (
                                        <Link
                                            key={l.to}
                                            to={l.to}
                                            onClick={() => setMobileOpen(false)}
                                            className="w-full rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 px-3 py-3 text-white uppercase text-center"
                                        >
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>

                                {/* Akordeon bölümleri */}
                                <nav className="mt-1">
                                    {mobileSections.map((sec) => (
                                        <div key={sec.key} className="border-t border-white/10">
                                            <button
                                                onClick={() => setOpenDropdown((p) => (p === sec.key ? null : sec.key))}
                                                className="w-full flex items-center justify-between px-4 py-3 text-white uppercase tracking-wide"
                                            >
                                                <span className="font-medium">{sec.title}</span>
                                                {openDropdown === sec.key ? <FiChevronUp /> : <FiChevronDown />}
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {openDropdown === sec.key && (
                                                    <motion.ul
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden px-2 pb-2"
                                                    >
                                                        {sec.data.map((it, i) => (
                                                            <li key={`${sec.key}-${i}`}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        navigate(it.path || "/");
                                                                        setMobileOpen(false);
                                                                    }}
                                                                    className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left text-white hover:bg-white/10 active:bg-white/15"
                                                                >
                                  <span className="inline-flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#033152]">
                                      {it.icon}
                                    </span>
                                    <span className="text-base font-medium uppercase leading-5">{it.title}</span>
                                  </span>
                                                                    <FiChevronRight className="opacity-70" />
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </nav>

                                <div className="h-4" />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
