// WebStandardy.cz - JavaScript
// Jednoduchy skript pro interaktivni prvky webu

// Hamburger menu pro mobilni zarizeni
function setupMobileMenu() {
    var toggle = document.getElementById('menu-toggle');
    var odkazy = document.querySelectorAll('.nav-odkaz');

    if (!toggle) return;

    // Zavre menu po kliknuti na odkaz
    odkazy.forEach(function (odkaz) {
        odkaz.addEventListener('click', function () {
            toggle.checked = false;
        });
    });

    // Zavre menu pri kliknuti mimo navigaci
    document.addEventListener('click', function (e) {
        var nav = document.querySelector('.hlavni-nav');
        if (toggle.checked && nav && !nav.contains(e.target)) {
            toggle.checked = false;
        }
    });
}

// Kviz na strance validace.html
function setupQuiz() {
    var startBtn = document.getElementById('start-quiz');
    var restartBtn = document.getElementById('restart-quiz');

    if (!startBtn) return;

    // Otazky pro kviz
    var otazky = [
        {
            text: 'Co znamená zkratka HTML?',
            odpovedi: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'],
            spravna: 0
        },
        {
            text: 'Která značka je sémantická?',
            odpovedi: ['<div>', '<span>', '<article>'],
            spravna: 2
        },
        {
            text: 'Co dělá CSS vlastnost display: flex?',
            odpovedi: ['Skryje element', 'Vytvoří flexbox kontejner', 'Změní font'],
            spravna: 1
        },
        {
            text: 'Jaký je minimální poměr kontrastu pro normální text podle WCAG?',
            odpovedi: ['3:1', '4.5:1', '7:1'],
            spravna: 1
        },
        {
            text: 'K čemu slouží atribut alt u obrázků?',
            odpovedi: ['Mění velikost obrázku', 'Poskytuje textovou alternativu', 'Přidává rámeček'],
            spravna: 1
        }
    ];

    var aktualniOtazka = 0;
    var skore = 0;

    startBtn.addEventListener('click', zacniKviz);
    if (restartBtn) {
        restartBtn.addEventListener('click', zacniKviz);
    }

    function zacniKviz() {
        aktualniOtazka = 0;
        skore = 0;
        document.querySelector('.quiz-start').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        document.getElementById('quiz-result').style.display = 'none';
        zobrazOtazku();
    }

    function zobrazOtazku() {
        var otazka = otazky[aktualniOtazka];
        document.getElementById('quiz-progress-text').textContent =
            'Otázka ' + (aktualniOtazka + 1) + ' z ' + otazky.length;
        document.getElementById('quiz-question').textContent = otazka.text;

        var kontejner = document.getElementById('quiz-answers');
        kontejner.innerHTML = '';

        otazka.odpovedi.forEach(function (text, index) {
            var tlacitko = document.createElement('button');
            tlacitko.className = 'quiz-odpoved';
            tlacitko.textContent = text;
            tlacitko.addEventListener('click', function () {
                vyhodnotOdpoved(index);
            });
            kontejner.appendChild(tlacitko);
        });
    }

    function vyhodnotOdpoved(vybrana) {
        var otazka = otazky[aktualniOtazka];
        var tlacitka = document.querySelectorAll('.quiz-odpoved');

        // Oznac spravnou a spatnou odpoved
        tlacitka.forEach(function (btn, i) {
            btn.disabled = true;
            if (i === otazka.spravna) {
                btn.classList.add('spravna');
            }
            if (i === vybrana && vybrana !== otazka.spravna) {
                btn.classList.add('spatna');
            }
        });

        if (vybrana === otazka.spravna) {
            skore++;
        }

        // Pockej a prejdi na dalsi otazku
        setTimeout(function () {
            aktualniOtazka++;
            if (aktualniOtazka < otazky.length) {
                zobrazOtazku();
            } else {
                zobrazVysledek();
            }
        }, 1200);
    }

    function zobrazVysledek() {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';

        var procent = Math.round((skore / otazky.length) * 100);
        document.getElementById('result-score').textContent = procent + '%';

        var zprava = '';
        if (procent === 100) {
            zprava = 'Výborně! Všechno správně.';
        } else if (procent >= 80) {
            zprava = 'Docela dobrý výsledek!';
        } else if (procent >= 60) {
            zprava = 'Ujde to, ale je co zlepšovat.';
        } else {
            zprava = 'Zkus si projít materiály ještě jednou.';
        }
        document.getElementById('result-message').textContent = zprava;
    }
}

// Inicializace Lucide ikon
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Spusteni po nacteni stranky
document.addEventListener('DOMContentLoaded', function () {
    initIcons();
    setupMobileMenu();
    setupQuiz();
});
