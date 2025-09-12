// Gebze Belediyesi SENDE Portal JavaScript
// Düzenlenmiş ve optimize edilmiş versiyon

// Global değişkenler
let currentNotification = null;
let isFormProcessing = false;
let searchTimeout = null;

// DOM yüklendikten sonra çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeSearch();
});

// =================== MOBİL MENÜ FONKSİYONLARI ===================
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenu || !navMenu) {
        console.warn('Mobil menü elementleri bulunamadı');
        return;
    }

    // Hamburger menü click olayı
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Menü linklerine click olayı
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Menü dışına tıklama olayı
    document.addEventListener('click', handleOutsideClick);

    // Pencere boyut değişikliği olayı
    window.addEventListener('resize', handleWindowResize);

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Body scroll kontrolü
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleOutsideClick(e) {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }

    function handleWindowResize() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    }
}

  // =================== ARAMA FONKSİYONU ===================
    (function() {
      const searchInput = document.getElementById("searchInput");
      const searchBtn = document.getElementById("searchBtn");
      const cards = document.querySelectorAll(".education-card");
      let searchTimeout;

      // Click ile arama
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
      });

      // Enter tuşu ile arama
      searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });

      // Canlı arama (input değiştiğinde)
      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          performSearch();
        }, 300);
      });

      // Focus ve blur animasyonları
      searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#2563eb';
        this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
      });
      searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#ccc';
        this.style.boxShadow = 'none';
      });

      // Ana arama fonksiyonu
      function performSearch() {
        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
          const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
          const desc = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
          const searchable = `${title} ${desc}`;

          if(searchText === '' || searchable.includes(searchText)) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        showSearchResults(searchText, visibleCount);
      }

      function showSearchResults(searchText, visibleCount) {
        const existing = document.querySelector('.search-result-message');
        if(existing) existing.remove();

        if(searchText !== '') {
          const resultDiv = document.createElement('div');
          resultDiv.className = 'search-result-message';
          if(visibleCount === 0) {
            resultDiv.innerHTML = `<i class="fas fa-search"></i> "${searchText}" için sonuç bulunamadı.`;
          } else {
            resultDiv.innerHTML = `<i class="fas fa-check-circle"></i> "${searchText}" için ${visibleCount} sonuç bulundu.`;
          }
          document.body.insertBefore(resultDiv, document.querySelector('.cards-grid'));
        }
      }
    })();

// =================== FORM FONKSİYONLARI ===================
function openRegistrationForm(formType) {
    if (isFormProcessing) return;
    
    isFormProcessing = true;
    const button = event.target.closest('.card-btn');
    const card = event.target.closest('.education-card');
    
    // Buton yükleme durumu
    if (button) {
        setButtonLoading(button, true);
    }
    
    // Kart seçilme efekti
    if (card) {
        animateCardSelection(card);
    }
    
    // Bildirim göster
    showNotification(`${getFormDisplayName(formType)} başvuru formu hazırlanıyor...`, 'info', 2000);
    
    // Form işleme simülasyonu
    setTimeout(() => {
        handleFormRedirect(formType);
        
        // Buton durumunu geri yükle
        if (button) {
            setButtonLoading(button, false);
        }
        
        isFormProcessing = false;
    }, 1500);
}

function getFormDisplayName(formType) {
    const formNames = {
        'atli-egitim': 'Atlı Eğitim Merkezi (Eğitim)',
        'atli-randevu': 'Atlı Eğitim Merkezi (Randevu)',
        'cocuk-atolye': 'Çocuk Atölyeleri',
        'enderun-atolye': 'Enderun Çocuk Atölyeleri',
        'fit-yasam': 'Fit Yaşam',
        'gesmek': 'GESMEK',
        'guzide-genclik': 'Güzide Gençlik Merkezi',
        'kis-okullari': 'Kış Okulları',
        'spor-okullari': 'Spor Okulları',
        'yetiskin-atolye': 'Yetişkin Atölyeleri',
        'dogru-tercih': 'Doğru Tercih Hazırlık Kursları',
        'yaz-okullari': 'Yaz Okulları'
    };
    
    return formNames[formType] || formType;
}

function handleFormRedirect(formType) {
    console.log(`${formType} form sayfasına yönlendiriliyor...`);
    
    const formData = getFormData(formType);
    
    if (formData) {
        showNotification(
            `${formData.title} başvuru formu açılıyor. Lütfen bekleyin...`, 
            'success', 
            3000
        );
        
        // Demo için form detaylarını göster
        setTimeout(() => {
            showFormPreview(formData);
        }, 2000);
    } else {
        showNotification('Form bilgileri bulunamadı!', 'error');
    }
}

function getFormData(formType) {
    const formDatabase = {
        'atli-egitim': {
            title: 'Atlı Eğitim Merkezi Başvuru Formu',
            description: 'Atlı eğitim programımıza katılmak için başvuru formunu doldurun.',
            category: 'Spor ve Eğitim',
            duration: '3 Ay',
            ageGroup: '8+ Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon', 
                'E-posta', 'Adres', 'Deneyim Seviyesi', 'Sağlık Durumu'
            ]
        },
        'atli-randevu': {
            title: 'Atlı Eğitim Merkezi Randevu Formu',
            description: 'Atlı eğitim merkezi ziyareti için randevu alın.',
            category: 'Randevu',
            duration: '1 Saat',
            ageGroup: 'Tüm Yaş Grupları',
            fields: [
                'Ad Soyad', 'Telefon', 'E-posta', 'Tercih Edilen Tarih', 
                'Tercih Edilen Saat', 'Ziyaret Nedeni'
            ]
        },
        'cocuk-atolye': {
            title: 'Çocuk Atölyesi Başvuru Formu',
            description: 'Çocuğunuz için yaratıcılık atölyelerine başvuru yapın.',
            category: 'Eğitim ve Sanat',
            duration: '2 Saat/Hafta',
            ageGroup: '4-12 Yaş',
            fields: [
                'Çocuğun Adı Soyadı', 'Yaşı', 'Veli Ad Soyad', 'TC Kimlik No',
                'Telefon', 'E-posta', 'İlgi Alanları', 'Özel Durumlar'
            ]
        },
        'enderun-atolye': {
            title: 'Enderun Çocuk Atölyesi Başvuru Formu',
            description: 'Enderun eğitim metoduyla çocuklar için özel atölye programı.',
            category: 'Eğitim ve Kültür',
            duration: '4 Saat/Hafta',
            ageGroup: '6-14 Yaş',
            fields: [
                'Çocuğun Adı Soyadı', 'Yaşı', 'Veli Ad Soyad', 'TC Kimlik No',
                'Telefon', 'E-posta', 'İlgi Alanları', 'Özel Durumlar'
            ]   
        },
        'fit-yasam': {
            title: 'Fit Yaşam Başvuru Formu',
            description: 'Sağlıklı yaşam ve fitness programlarımıza katılmak için başvuru yapın.',
            category: 'Sağlık ve Spor',
            duration: '6 Ay',
            ageGroup: '16+ Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'Sağlık Durumu', 'Hedefler'
            ]
        },
        'gesmek': {
            title: 'GESMEK Başvuru Formu',
            description: 'Gebze Belediyesi Sanat ve Meslek Eğitimi Kursları (GESMEK) için başvuru yapın.',
            category: 'Eğitim ve Meslek',
            duration: '4 Ay',
            ageGroup: '15+ Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',  
                'E-posta', 'Adres', 'Seçilen Kurs', 'Önceki Deneyim'
            ]
        },
        'guzide-genclik': {
            title: 'Güzide Gençlik Merkezi Başvuru Formu',
            description: 'Gençlik merkezimizdeki etkinlik ve programlara katılmak için başvuru yapın.',
            category: 'Gençlik ve Sosyal',
            duration: 'Sürekli',
            ageGroup: '14-30 Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'İlgi Alanları', 'Katılmak İstediğiniz Programlar'
            ]
        },
        'kis-okullari': {
            title: 'Kış Okulları Başvuru Formu',
            description: 'Kış aylarında düzenlenen eğitim ve etkinliklerimize katılmak için başvuru yapın.',
            category: 'Eğitim ve Etkinlik',
            duration: '2 Ay',
            ageGroup: '6-18 Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'Okul Adı', 'Sınıf'
            ]   
        },
        'spor-okullari': {
            title: 'Spor Okulları Başvuru Formu',
            description: 'Çeşitli spor dallarında eğitim almak için spor okullarımıza başvuru yapın.',
            category: 'Spor ve Eğitim',
            duration: '3 Ay',
            ageGroup: '7-16 Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'Seçilen Spor Dalı', 'Deneyim Seviyesi'
            ]
        },
        'yetiskin-atolye': {
            title: 'Yetişkin Atölyeleri Başvuru Formu',
            description: 'Yetişkinler için düzenlenen çeşitli atölye çalışmalarına katılmak için başvuru yapın.',
            category: 'Eğitim ve Sanat',
            duration: '2 Saat/Hafta',
            ageGroup: '18+ Yaş',
            fields: [   
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'İlgi Alanları', 'Önceki Deneyim'
            ]
        },
        'dogru-tercih': {
            title: 'Doğru Tercih Hazırlık Kursları Başvuru Formu',
            description: 'Lise ve üniversiteye hazırlık için doğru tercih kurslarımıza başvuru yapın.',
            category: 'Eğitim ve Kariyer',
            duration: '6 Ay',
            ageGroup: '15-25 Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'Hedef Okul/Kurum', 'Önceki Eğitim Durumu'
            ]
        },
        'yaz-okullari': {
            title: 'Yaz Okulları Başvuru Formu',
            description: 'Yaz aylarında düzenlenen eğitim ve etkinliklerimize katılmak için başvuru yapın.',
            category: 'Eğitim ve Etkinlik',
            duration: '2 Ay',
            ageGroup: '6-18 Yaş',
            fields: [
                'Ad Soyad', 'TC Kimlik No', 'Doğum Tarihi', 'Telefon',
                'E-posta', 'Adres', 'Okul Adı', 'Sınıf'
            ]   
        }
    };
    
    return formDatabase[formType] || null;
}

// =================== YARDIMCI FONKSİYONLAR ===================
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
    } else {
        button.disabled = false;
        button.innerHTML = '<span>Başvuru Yap</span><i class="fas fa-arrow-right"></i>';
    }
}

function animateCardSelection(card) {
    card.style.transform = 'translateY(-15px) scale(0.98)';
    card.style.border = '2px solid #2563eb';
    setTimeout(() => {
        card.style.transform = '';
    }, 300);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function showNotification(message, type = 'info', duration = 3000) {
    // Bu fonksiyon HTML'de tanımlanmış olmalı
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type, duration);
    } else {
        console.log(`Bildirim [${type.toUpperCase()}]: ${message}`);
    }
}

function showFormPreview(formData) {
    // Bu fonksiyon HTML'de tanımlanmış olmalı
    if (typeof window.showFormPreview === 'function') {
        window.showFormPreview(formData);
    } else {
        console.log('Form Preview:', formData);
    }
}