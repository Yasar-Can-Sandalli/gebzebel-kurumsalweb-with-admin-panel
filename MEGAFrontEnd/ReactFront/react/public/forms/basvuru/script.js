// Global değişkenler
let currentNotification = null;

// Form seçimi işleme fonksiyonu
function handleFormSelection(formType) {
    const card = event.target.closest('.form-card');
    if (card) {
        // Kart seçilme efekti
        card.style.transform = 'translateY(-4px) scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
        
        // Seçili kartı vurgula
        document.querySelectorAll('.form-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    }
    
    // Bildirim göster
    showNotification(`${formType} başvuru formu seçildi! Yönlendiriliyor...`, 'success');
    
    // Form işleme
    setTimeout(() => {
        console.log(`Seçilen form: ${formType}`);
        handleFormRedirect(formType);
    }, 1500);
}

// Form yönlendirme işlemi
function handleFormRedirect(formType) {
    console.log(`${formType} form sayfasına yönlendiriliyor...`);
    
    // Örnek yönlendirmeler
    const redirectUrls = {
        'İstek': '/forms/istek-formu.html',
        'Şikayet': '/forms/sikayet-formu.html',
        'Teşekkür': '/forms/tesekkur-formu.html',
        'Proje Bildirimi': '/forms/proje-bildirimi-formu.html',
        'Bilgi Talebi': '/forms/bilgi-talebi-formu.html',
        'İhbar': '/forms/ihbar-formu.html'
    };
    
    const url = redirectUrls[formType];
    if (url) {
        // Gerçek uygulamada burada sayfa yönlendirmesi yapılır
        // window.location.href = url;
        showNotification(`Form sayfası: ${url}`, 'info');
        
        // Demo için formu simüle et
        setTimeout(() => {
            simulateFormPage(formType);
        }, 2000);
    } else {
        console.log('Bilinmeyen form türü:', formType);
        showNotification('Form türü bulunamadı!', 'error');
    }
}

// Form sayfası simülasyonu
function simulateFormPage(formType) {
    const formData = {
        'İstek': {
            title: 'İstek Başvuru Formu',
            description: 'Belediyemizden hizmet talebinizi detaylarıyla birlikte belirtiniz.',
            fields: ['Ad Soyad', 'TC Kimlik No', 'Telefon', 'E-posta', 'Adres', 'İstek Detayı']
        },
        'Şikayet': {
            title: 'Şikayet Başvuru Formu',
            description: 'Şikayetinizi detaylarıyla birlikte açıklayınız.',
            fields: ['Ad Soyad', 'TC Kimlik No', 'Telefon', 'E-posta', 'Şikayet Konusu', 'Şikayet Detayı', 'Olay Yeri', 'Olay Tarihi']
        },
        'Teşekkür': {
            title: 'Teşekkür Başvuru Formu',
            description: 'Memnuniyetinizi bizimle paylaşın.',
            fields: ['Ad Soyad', 'Telefon', 'E-posta', 'Teşekkür Nedeni', 'Detay']
        },
        'Proje Bildirimi': {
            title: 'Proje Bildirimi Formu',
            description: 'Proje önerinizi detaylarıyla sunun.',
            fields: ['Ad Soyad', 'TC Kimlik No', 'Meslek', 'Telefon', 'E-posta', 'Proje Başlığı', 'Proje Açıklaması', 'Beklenen Fayda']
        },
        'Bilgi Talebi': {
            title: 'Bilgi Talebi Formu',
            description: 'Hangi konuda bilgi almak istediğinizi belirtiniz.',
            fields: ['Ad Soyad', 'TC Kimlik No', 'Telefon', 'E-posta', 'Talep Edilen Bilgi', 'Kullanım Amacı']
        },
        'İhbar': {
            title: 'İhbar Başvuru Formu',
            description: 'İhbar etmek istediğiniz durumu detaylarıyla açıklayınız.',
            fields: ['İhbar Türü', 'Olay Yeri', 'Olay Tarihi', 'İhbar Detayı', 'İletişim Bilgileri (İsteğe Bağlı)']
        }
    };
    
    const form = formData[formType];
    if (form) {
        showNotification(`${form.title} hazırlandı. Alanlar: ${form.fields.join(', ')}`, 'info');
    }
}

// Gelişmiş bildirim gösterme fonksiyonu
function showNotification(message, type = 'success', duration = 4000) {
    // Mevcut bildirimi kaldır
    if (currentNotification) {
        currentNotification.remove();
        currentNotification = null;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Tüm notification'lar belediye mavisinde
    const color = 'linear-gradient(135deg, #1e3a5f, #2d4a6b)';
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.style.background = color;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="${icons[type] || icons.success}" style="font-size: 18px; flex-shrink: 0;"></i>
            <span style="flex: 1;">${message}</span>
            <button onclick="closeNotification(this)" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px; padding: 0; margin-left: 10px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    currentNotification = notification;
    
    // Otomatik kapanma
    const timeout = setTimeout(() => {
        closeNotification(notification);
    }, duration);
    
    // Timeout'u notification elementine kaydet
    notification.timeoutId = timeout;
}

// Bildirim kapatma fonksiyonu
function closeNotification(element) {
    const notification = element.tagName === 'BUTTON' ? element.closest('.notification') : element;
    
    if (notification && notification.parentNode) {
        // Timeout'u temizle
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }
        
        notification.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            if (currentNotification === notification) {
                currentNotification = null;
            }
        }, 400);
    }
}

// Mobil menü toggle fonksiyonu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Body scroll kontrolü
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Klavye erişilebilirliği için Enter/Space tuşu desteği
function handleKeyPress(event, formType) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFormSelection(formType);
    }
}

// Kart hover efektleri
function addCardInteractions() {
    const formCards = document.querySelectorAll('.form-card');
    
    formCards.forEach((card, index) => {
        const formTypes = ['İstek', 'Şikayet', 'Teşekkür', 'Proje Bildirimi', 'Bilgi Talebi', 'İhbar'];
        const formType = formTypes[index];
        
        // Mouse enter efekti
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Diğer kartları hafifçe soluklaştır
            formCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        // Mouse leave efekti
        card.addEventListener('mouseleave', function() {
            // Tüm kartları normale döndür
            formCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });
        
        // Keyboard event listener
        card.addEventListener('keypress', (e) => handleKeyPress(e, formType));
        
        // Focus efektleri
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Smooth scroll fonksiyonu
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Sayfa yükleme animasyonu
function initPageAnimation() {
    const elements = document.querySelectorAll('.form-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150 + 300);
    });
}

// Form arama fonksiyonu
function searchForms(query) {
    const formCards = document.querySelectorAll('.form-card');
    const searchTerm = query.toLowerCase();
    
    formCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            toggleMobileMenu();
        }
    });
    
    // Kart etkileşimlerini ekle
    addCardInteractions();
    
    // Sayfa yükleme animasyonu
    initPageAnimation();
    
    // Sayfa geçiş animasyonu
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Başarı mesajı
    setTimeout(() => {
        showNotification('E-Belediye Başvuru Sistemi hazır! Form türünüzü seçin.', 'info', 3000);
    }, 1000);
    
    console.log('E-Belediye Başvuru Sistemi yüklendi!');
    console.log('Mevcut form türleri:', ['İstek', 'Şikayet', 'Teşekkür', 'Proje Bildirimi', 'Bilgi Talebi', 'İhbar']);
});

// Resize event listener
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (navToggle) navToggle.classList.remove('active');
    }
});

// Scroll event listener - navbar efekti
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// CSS animasyonlarını tanımla
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .form-card.selected {
        border-color: #3b82f6 !important;
        box-shadow: 0 15px 40px rgba(59, 130, 246, 0.2) !important;
    }
    
    .form-card.selected .card-icon {
        animation: pulse 1s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);